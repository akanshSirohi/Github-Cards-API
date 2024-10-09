import { words } from './constants';

const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
};

const getWordByIndex = (index) => {
    return words.find((word) => word.index === index);
};

export { getRandomWord, getWordByIndex };