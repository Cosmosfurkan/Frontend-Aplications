// 1. Despot some money ok
// 2. determine number of lines to bet on ok
// 3. collect a bet amount ok
// 4. Spint the slot machine
//5. check if user won
// 6. pay user if they won
// 7. play again

// 1. Despot some money

const prompt = require('prompt-sync')();

const  ROWS = 3;
const  COLS = 3; 

const SYMBOLS_COUNT = {
    "A":2,
    "B":4,
    "C":6,
    "D":8
}

const SYMBOL_VALUES = {
    "A":5,
    "B":4,
    "C":3,
    "D":2
}


const depositMoney = () => {
    while (true) {
        const depositeAmount = prompt('Enter a deposit amount: ');
        const numberDepositAmount = parseFloat(depositeAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Please enter a valid amount");
        } else {
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () => {
    while (true) {
        const lines = prompt('Enter a number of lines to bet on (1-3): ');
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("invalid number of lines,try again");
        } else {
            return numberOfLines;
        }
    }
};

const getBetAmount = (balance,lines) => {
    while (true) {
        const bet = prompt('Enter a bet per line: ');
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > (balance/ lines)) {
            console.log("invalid number of bet,try again");
        } else {
            return numberBet;
        }
    }
};

const spin = () => {
    const symbols = [];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    const reels = [[], [], []];
    for (let i = 0; i < COLS; i++) {
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};
const reels = spin();
console.log(reels);
let balance = depositMoney();
const numberOfLines = getNumberOfLines();
const betAmount = getBetAmount(balance);