const fs = require('fs')
const filename = process.argv[2] || 'day03_input.txt'
const encoding = 'utf8'

fs.readFile(filename, encoding, (err, data) => {
    if (err) throw err

    const lines = data
        .trim()
        .split('\n')
        .map(l => l.split(''))
        .map(arr => arr.map(n => Number.parseInt(n, 10)))
    console.log(lines.length, lines[0])
    const counts = new Array(lines[0].length).fill(0)
    
    for (const arr of lines) {
        for (let i = 0; i < arr.length; i++) {
            counts[i] += arr[i]
        }
    }

    console.log(counts)
    const gamma = counts
        .map(n => n > (lines.length / 2) ? 1 : 0)
        .reverse()
        .reduce((prev, curr, indx) => prev +(curr * 2**indx ), 0)
    console.log(gamma, gamma.toString(2))
    const epsilon = gamma ^ 2**lines[0].length - 1
    console.log(epsilon, epsilon.toString(2))
    console.log(gamma * epsilon)
})
