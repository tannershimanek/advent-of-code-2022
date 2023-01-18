import * as fs from 'fs';

fs.readFile('./data.txt', 'utf-8', (err, data) => {
    if (err) throw new Error(err);
    handleData(data);
});

const gameMap = {
    "AY": 6,
    "BZ": 6,
    "CX": 6,
    "AX": 3,
    "BY": 3,
    "CZ": 3,
    "AZ": 0,
    "BX": 0,
    "CY": 0,
}

const moveMap = {
    'A': 0, // rock
    'B': 1, // paper
    'C': 2, // scissors
    'X': 1, // rock
    'Y': 2, // paper
    'Z': 3, // scissors
}

const hash = {
    'Y': 3, // draw
    'X': 0, // lose
    'Z': 6, // win
} 


function getGameScore(match) {
    let [o, p] = match;
    return gameMap[(o + p)] + moveMap[p];
}


function partOne(data) {
    return data.map((moves) => getGameScore(moves))
        .reduce((a, b) => a + b);
}


function encryptMove(match) {
    let [o, p] = match;
    return Object.keys(gameMap)
        .filter((key) => key.includes(o))
        .find((key) => gameMap[key] === hash[p])
        .split('');
}


function partTwo(data) {
    return data
        .map((move) => {
            const encryptedMove = encryptMove(move);
            return getGameScore(encryptedMove);
        })
        .reduce((a, b) => a + b);
}


function handleData(data) {
    const match = data.split('\n')
        .map((moves) => moves.split(' '));
    console.log('Part One:', partOne(match));
    console.log('Part Two:', partTwo(match));
}