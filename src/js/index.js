import { CARD_TYPES, DECK_DISTRIBUTION, POINTS_RANGE } from './constant.js';
import { Card } from './card.js';

// Global variables
let deck = [];
let drawnCards = 0;
const totalCards = 60;
let hasLost = false;

// Function to initialize the game interface
function initializeGameUI() {
    // Create the main container
    const mainContainer = document.createElement('div');
    mainContainer.id = 'game-container'; // Class for the main container

    // Create the card display area
    const cardDisplay = document.createElement('div');
    cardDisplay.id = 'card-display';
    cardDisplay.className = 'card'; // Class for the card display area
    cardDisplay.innerText = 'Press "Draw Card" to start.';
    mainContainer.appendChild(cardDisplay);

    // Create the message area
    const messageDisplay = document.createElement('div');
    messageDisplay.id = 'message';
    messageDisplay.className = 'message'; // Class for the message area
    mainContainer.appendChild(messageDisplay);

    // Create the draw card button
    const drawCardButton = document.createElement('button');
    drawCardButton.id = 'draw-card';
    drawCardButton.className = 'btn'; // Class for the button
    drawCardButton.innerText = 'Draw Card';
    drawCardButton.addEventListener('click', drawCard);
    mainContainer.appendChild(drawCardButton);

    // Create the restart game button
    const restartGameButton = document.createElement('button');
    restartGameButton.id = 'restart-game';
    restartGameButton.className = 'btn'; // Class for the restart button
    restartGameButton.innerText = 'Restart Game';
    restartGameButton.style.display = 'none';
    restartGameButton.addEventListener('click', restartGame);
    mainContainer.appendChild(restartGameButton);

    // Add the main container to the document body
    document.body.appendChild(mainContainer);
}

// Call the function to initialize the interface when loading the game
initializeGameUI();

// Function to generate the deck
function generateDeck() {
    deck = [];
    hasLost = false;
    document.getElementById('message').innerText = '';  // Clear the loss message

    // Add Bomb, Defuse, Skip, Nope cards
    addCards(CARD_TYPES.BOMB, DECK_DISTRIBUTION.BOMB);
    addCards(CARD_TYPES.DEFUSE, DECK_DISTRIBUTION.DEFUSE);
    addCards(CARD_TYPES.SKIP_TURN, DECK_DISTRIBUTION.SKIP_TURN);
    addCards(CARD_TYPES.NOPE, DECK_DISTRIBUTION.NOPE);

    // Add point cards with random values
    for (let i = 0; i < DECK_DISTRIBUTION.POINTS; i++) {
        let value = Math.floor(Math.random() * (POINTS_RANGE.max - POINTS_RANGE.min + 1)) + POINTS_RANGE.min;
        deck.push(new Card(CARD_TYPES.POINTS, value));
    }

    // Print the deck before shuffling
    console.log("Deck before shuffle:", deck.map(card => card.display()));

    // Shuffle the deck using Fisher-Yates
    fisherYatesShuffle(deck);

    // Print the deck after shuffling
    console.log("Deck after shuffle:", deck.map(card => card.display()));
}

// Function to add cards to the deck
function addCards(type, count) {
    for (let i = 0; i < count; i++) {
        deck.push(new Card(type));
    }
}

// Fisher-Yates Shuffle Algorithm
function fisherYatesShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to draw a card
function drawCard() {
    if (hasLost || drawnCards >= totalCards) return;

    let card = deck[drawnCards];
    let cardDisplay = document.getElementById('card-display');
    let messageDisplay = document.getElementById('message');

    // Update the card display content
    cardDisplay.innerText = card.display();
    drawnCards++;

    if (card.type === CARD_TYPES.BOMB) {
        // The player loses if they draw a BOMB card
        messageDisplay.innerText = 'You drew a BOMB! You lose!';
        hasLost = true;
        document.getElementById('draw-card').style.display = 'none';
        document.getElementById('restart-game').style.display = 'block';
        return;
    }

    // If the player has drawn all the cards
    if (drawnCards === totalCards) {
        document.getElementById('draw-card').style.display = 'none';
        document.getElementById('restart-game').style.display = 'block';
    }
}

// Function to restart the game
function restartGame() {
    drawnCards = 0;
    hasLost = false;  // Reset the game state
    generateDeck();  // Regenerate and shuffle the deck
    document.getElementById('card-display').innerText = 'Press "Draw Card" to start.';  // Clear the card display area
    document.getElementById('message').innerText = '';  // Clear the loss message
    document.getElementById('draw-card').style.display = 'block';  // Show the draw card button
    document.getElementById('restart-game').style.display = 'none';  // Hide the restart button
}

// Initialize the game
document.getElementById('draw-card').addEventListener('click', drawCard);
document.getElementById('restart-game').addEventListener('click', restartGame);

// Generate the deck when the page loads
generateDeck();





