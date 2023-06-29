// 1. Deposit some money
// 2. Determine no. of lines to bet on
// 3. Collect a bet amount
// 4. Spin slot machine
// 5. Check if user won the
// 6. Give user winnings OR Take their bet
// 7. Play again OR no money left

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const COUNT_SYMBOLS = {
  A: 3,
  B: 6,
  C: 9,
  D: 12,
};

const VALUES_SYMBOLS = {
  A: 6,
  B: 5,
  C: 4,
  D: 3,
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter an amount to deposit:");
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

    if (
      isNaN(numberOfLinesInt) ||
      numberOfLinesInt <= 0 ||
      numberOfLinesInt > 3
    ) {
      console.log("Please enter a valid number of lines to bet on.");
    } else {
      return numberOfLinesInt;
    }
  }
};

const getBet = (balance, lines) => {
  while (true) {
    const betAmount = prompt("Enter bet per line: ");
    const betAmountFloat = parseFloat(betAmount); // converts string to float no. for the bet amount

    if (
      isNaN(betAmountFloat) ||
      betAmountFloat <= 0 ||
      betAmountFloat > balance / lines
    ) {
      console.log("Invalid bet, try again.");
    } else {
      return betAmountFloat;
    }
  }
};

const spin = () => {
  const symbols = []; // contains all available symbols

  for (const [symbol, count] of Object.entries(COUNT_SYMBOLS)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol); // inserting elements into symbol[] array
    }
  }

  const reels = [];
  for (let j = 0; j < COLS; j++) {
    // loop through reels, represented by columns
    reels.push([]); // for every column, add elements into reels[] array
    const reelSymbols = [...symbols]; // unique array to pick from for this specific reel
    for (let k = 0; k < ROWS; k++) {
      // Math.random creates random float no. between 0 and 1
      // then we multiply this no. by length of symbols is
      // Math.floor rounds the overall no. down to nearest whole no.
      // We round down so we do not get an index which is outside bounds of array :)
      const randomIndex = Math.floor(Math.random() * reelSymbols.length); // randomly generate one of the available symbols
      const selectedSymbol = reelSymbols[randomIndex]; // insert that into our reel
      reels[j].push(selectedSymbol); // add random element into current reel
      reelSymbols.splice(randomIndex, 1); // rermove this 1 element from available symbols so we don't select that one again
    }
  }
  return reels;
};

const transposeMatrix = (reels) => {
  const rows = [];

  for (let l = 0; l < ROWS; l++) {
    rows.push([]);
    for (let m = 0; m < COLS; m++) {
      rows[l].push(reels[m][l]); //
    }
  }

  return rows;
};

const printSlotMachine = (rows) => {
  for (const row of rows) {
    // iterating by item inside rows array
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol; // concat string
      if (i < row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
    console.log("\n");
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * VALUES_SYMBOLS[symbols[0]];
    }
  }

  return winnings;
};

const game = () => {
  let balance = deposit();

  while (balance > 0) {
    console.log("Balance: $" + balance.toString());
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transposeMatrix(reels);
    printSlotMachine(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("You won $" + winnings.toString());

    if (balance <= 0) {
        console.log("You lose $" + bet.toString());
        break;
    }

    const playAgain = prompt("Play again? (y for yes/any key for no):");
    if (playAgain != "y") {
        break;
    }
  }
};

game();
