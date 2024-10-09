const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

let targetWord = ""; 
let guessCount = 0; 
let guesses = []; 


const techWords = [
    "array", "bytes", "class", "cloud", "crash", "debug", "drone", "email",
    "error", "frame", "graph", "haste", "index", "input", "query", "robot",
    "scale", "stack", "state", "token", "train", "write", "share", "access",
    "logic", "model", "track", "alert", "batch", "local", "video", "cache",
    "check", "click", "codec", "deploy", "hosts", "merge", "pluto", "react",
    "sprint", "search", "style", "table", "scripts", "admin", "agent", "drive", "trace"
];


const getRandomTechWord = () => {
    const randomIndex = Math.floor(Math.random() * techWords.length);
    return techWords[randomIndex]; 
};


const wordleCard = (req, res) => {
    const userGuess = req.body.guess?.toLowerCase() || ''; 

    
    if (!targetWord) {
        targetWord = getRandomTechWord();
        guessCount = 0; 
        guesses = []; 
    }

    let feedback = '';
    let resultMessage = '';
    const nyTimesUrl = "https://www.nytimes.com/games/wordle/index.html"; // URL to New York Times Wordle

    
    const checkGuess = (guess) => {
        if (guess.length !== 5) return ''; 

        let feedback = [];
        let tempTarget = targetWord.split(''); 

        
        for (let i = 0; i < targetWord.length; i++) {
            if (guess[i] === tempTarget[i]) {
                feedback[i] = `<span style="color: green;">${guess[i].toUpperCase()}</span>`; 
                tempTarget[i] = null; 
            } else {
                feedback[i] = null; 
            }
        }

        
        for (let i = 0; i < targetWord.length; i++) {
            if (feedback[i] === null && tempTarget.includes(guess[i])) {
                feedback[i] = `<span style="color: orange;">${guess[i].toUpperCase()}</span>`; 
                tempTarget[tempTarget.indexOf(guess[i])] = null; 
            } else if (feedback[i] === null) {
                feedback[i] = `<span style="color: red;">${guess[i].toUpperCase()}</span>`; 
            }
        }

        return feedback.join(' '); 
    };

    if (userGuess.length === 5) {
        feedback = checkGuess(userGuess);
        guesses.push(userGuess); 
        guessCount++; 
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
            ${rulesHTML}
        </div>
    `;

    res.send(cardHTML);
};


app.get('/wordle-card', (req, res) => {
    resetGame(); 
    res.send(wordleCard(req, res)); 
});


app.post('/wordle-card', wordleCard);


module.exports = wordleCard;
