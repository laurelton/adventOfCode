const fs = require('fs')
const inputFile = process.argv[2] || 'day01_input.txt'
let count = 0

const fileContents = fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
        throw err
    }

    const lines = data.split('\n')
    lines
        .map(n => Number.parseInt(n, 10))
        .reduce((prev, curr) => {
            if (curr > prev) {
                count += 1
            }

            return curr
        })
    console.log(count)
})
