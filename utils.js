const fs = require('fs');
const path = require('path');

const getAvailableCards = async () => {
    const cardsDir = path.join(__dirname, './src/cards');
    const cardFiles = fs.readdirSync(cardsDir);

    const available_cards = {};

    cardFiles.forEach((file) => {
    if (path.extname(file) !== '.js') return; // Ignore files that are not JavaScript if necessary

    const baseName = path.basename(file, '.js'); // Get the base name of the file without extension

    const route = `/${baseName.replace(/_/g, '-')}`; // Convert the file name to the route format

    const modulePath = path.join(cardsDir, file); // Require the module
    available_cards[route] = require(modulePath);
    });
    
    return available_cards;
}


module.exports.getAvailableCards = getAvailableCards;