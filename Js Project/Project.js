// 1. Deposit some money
// 2. Determine no. of lines to bet on
// 3. Collect a bet amount
// 4. Spin slot machine
// 5. Check if user won the
// 6. Give user winnings OR Take their bet
// 7. Play again OR no money left

const prompt = require("prompt-sync")();

const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter an amount to deposit: ");
        const depositedAmount = parseFloat(depositAmount); // converts string to float no. for the deposited amount

        if (isNaN(depositedAmount) || depositedAmount <= 0) {
            console.log("Please enter a valid amount to deposit.");
        } else {
            return depositedAmount;
        }
    }
};

const getNumberOfLines = () => {
    while (true) {
        const numberOfLines = prompt("Enter number of lines to bet on (1-3): ");
        const numberOfLinesInt = parseInt(numberOfLines); // converts from string to int for the line amount betted on

        if (isNaN(numberOfLinesInt) || numberOfLinesInt <= 0 || numberOfLinesInt > 3) {
            console.log("Please enter a valid number of lines to bet on.");
        } else {
            return numberOfLinesInt;
        }
    }
}

const getBet = (balance, lines) => {
    while (true) {
        const betAmount = prompt("Enter bet per line: ");
        const betAmountFloat = parseFloat(betAmount); // converts string to float no. for the bet amount

        if (isNaN(betAmountFloat) || betAmountFloat <= 0 || betAmountFloat > balance / lines) {
            console.log("Invalid bet, try again.");
        } else {
            return betAmountFloat;
        }
    }
}

let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);

