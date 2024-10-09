const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true })); // Middleware to parse form data

let targetWord = ""; // Variable to hold the target word
let guessCount = 0; // Variable to track the number of guesses
let guesses = []; // Array to track all guesses

// Expanded list of tech-related 5-letter words
const techWords = [
    "array", "bytes", "class", "cloud", "crash", "debug", "drone", "email",
    "error", "frame", "graph", "haste", "index", "input", "query", "robot",
    "scale", "stack", "state", "token", "train", "write", "share", "access",
    "logic", "model", "track", "alert", "batch", "local", "video", "cache",
    "check", "click", "codec", "deploy", "hosts", "merge", "pluto", "react",
    "sprint", "search", "style", "table", "scripts", "admin", "agent", "drive", "trace"
];

// Function to get a random tech word
const getRandomTechWord = () => {
    const randomIndex = Math.floor(Math.random() * techWords.length);
    return techWords[randomIndex]; // Return a random 5-letter tech word
};

// Function to render the Wordle game
const wordleCard = (req, res) => {
    const userGuess = req.body.guess?.toLowerCase() || ''; // Retrieve the guess from the form input

    // Initialize targetWord if not already set
    if (!targetWord) {
        targetWord = getRandomTechWord();
        guessCount = 0; // Reset guess count when a new word is chosen
        guesses = []; // Reset guesses
    }

    let feedback = '';
    let resultMessage = '';
    const nyTimesUrl = "https://www.nytimes.com/games/wordle/index.html"; // URL to New York Times Wordle

    // Function to check the guess
    const checkGuess = (guess) => {
        if (guess.length !== 5) return ''; // Ensure guess is exactly 5 letters

        let feedback = [];
        let tempTarget = targetWord.split(''); // Create a temporary copy of the target word

        // First pass: check for correct letters in the correct position
        for (let i = 0; i < targetWord.length; i++) {
            if (guess[i] === tempTarget[i]) {
                feedback[i] = `<span style="color: green;">${guess[i].toUpperCase()}</span>`; // Correct letter, correct position
                tempTarget[i] = null; // Remove this letter from the temp array
            } else {
                feedback[i] = null; // Initialize feedback for letters not guessed correctly
            }
        }

        // Second pass: check for correct letters in the wrong position
        for (let i = 0; i < targetWord.length; i++) {
            if (feedback[i] === null && tempTarget.includes(guess[i])) {
                feedback[i] = `<span style="color: orange;">${guess[i].toUpperCase()}</span>`; // Correct letter, wrong position
                tempTarget[tempTarget.indexOf(guess[i])] = null; // Remove this letter from the temp array
            } else if (feedback[i] === null) {
                feedback[i] = `<span style="color: red;">${guess[i].toUpperCase()}</span>`; // Incorrect letter
            }
        }

        return feedback.join(' '); // Return the feedback
    };

    if (userGuess.length === 5) {
        feedback = checkGuess(userGuess);
        guesses.push(userGuess); // Store the guess
        guessCount++; // Increment guess count

        if (userGuess === targetWord) {
            resultMessage = `<div style="color: green; margin-top: 10px;">Congratulations! You've guessed the word!</div>`;
            resultMessage += `<div>Play more at <a href="${nyTimesUrl}" target="_blank">${nyTimesUrl}</a></div>`;
            // Reset game state
            targetWord = ""; 
            guessCount = 0; 
            guesses = []; 
        } else if (guessCount >= 5) {
            resultMessage = `<div style="color: red; margin-top: 10px;">Better luck next time! The word was: <strong>${targetWord.toUpperCase()}</strong></div>`;
            resultMessage += `<div>Try more at <a href="${nyTimesUrl}" target="_blank">${nyTimesUrl}</a></div>`;
            // Reset game state
            targetWord = ""; 
            guessCount = 0; 
            guesses = []; 
        }
    }

    const guessListHTML = guesses.map((guess, index) => `<div>${index + 1}: ${checkGuess(guess)}</div>`).join('');

    const rulesHTML = `
        <div style="margin-top: 20px; font-size: 14px; text-align: left; color: #333;">
            <h4>Game Rules:</h4>
            <p style="color: green;">🟢  Green: Letter is in the correct position.</p>
            <p style="color: orange;">🟡 Yellow: Letter is in the word but not in that position.</p>
            <p style="color: red;">🔴 Red: Letter is not in the word.</p>
            <p style="color: darkblue;">🔵 Only 5 guesses allowed.</p> 
        </div>
    `;

    const cardHTML = `
        <div style="font-family: Arial, sans-serif; background-color: #e7f3fe; border-radius: 10px; padding: 20px; width: 400px; text-align: center; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            <h2 style="color: #333; text-shadow: 1px 1px 2px #ffffff;">Guess the Wordle!</h2>
            <p style="color: #0056b3;">Take a Break => Try to guess the 5-letter Tech-word!</p>
            <form method="POST">
                <input type="text" name="guess" maxlength="5" style="text-transform: uppercase; font-size: 18px; text-align: center; padding: 10px; margin-bottom: 10px; border-radius: 5px; border: 1px solid #0056b3;" placeholder="Enter your guess" required />
                <button type="submit" style="padding: 10px 20px; font-size: 16px; background-color: #0056b3; color: #fff; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;">Submit</button>
            </form>
            <div style="margin-top: 20px; font-size: 24px;">
                ${feedback}
            </div>
            <div style="margin-top: 20px; font-size: 18px;">
                ${guessListHTML}
            </div>
            <div style="margin-top: 10px; font-size: 15px;">
                ${resultMessage}
            </div>
            ${rulesHTML} <!-- Inserting the rules section -->
        </div>
    `;

    res.send(cardHTML);
};

// Route to reset the game with a new word
app.get('/wordle-card', (req, res) => {
    resetGame(); // Ensure we reset the game state
    res.send(wordleCard(req, res)); // Send the response
});

// Add the wordleCard route
app.post('/wordle-card', wordleCard);

// Export the wordleCard for usage in index.js
module.exports = wordleCard;
