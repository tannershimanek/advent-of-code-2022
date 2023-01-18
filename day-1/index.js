import * as fs from 'fs';

fs.readFile('./data.txt', 'utf-8', (err, data) => {
    if (err) throw new Error(err);
    handleData(data);
});


function handleData(data) {
    const lines = data.split('\n\n')
        .map(line => line.split('\n'))
        .map(item => item.map(item => parseInt(item, 10)))
        .map(item => item.reduce((a, b) => a + b))
        .sort((a, b) => b - a)  // sorting numbers can produce incorrect results see line 32

    partOne(JSON.parse(JSON.stringify(lines)));
    partTwo(JSON.parse(JSON.stringify(lines)));
}


function partOne(data) {
    console.log("Part 1:", data.shift());
}


function partTwo(data) {
    const p2 = data.slice(0, 3) // slice(start index, [not inclusive] end index)
        .reduce((a, b) => a + b);
    console.log('Part 2:', p2);
}


// sort() -> sorting numbers can produce incorrect results. 
// "25" is bigger than "100", because "2" is bigger than "1".
// You can fix this by providing a "compare function".
//
// ** compare function **
//
// (a, b) => a - b
// .sort((a, b) => a - b)
// 
// The sort function will sort 40 as a value lower than 100.
// When comparing 40 and 100, sort() calls the function(40,100).
// The function calculates 40-100, and returns -60 (a negative value).
//
// ** remember ** 
// (a, b) => a - b  sorts lowest to highest while (a, b) => b - a sorts highest to lowest
