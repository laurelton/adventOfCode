const fs = require('fs')
const filename = process.argv[2] || 'day02_input.txt'
const encoding = 'utf8'

fs.readFile(filename, encoding, (err, data) => {
    if (err) throw err

    const commandArr = data
        .trim()
        .split('\n')
        .map(line => line.split(' '))
        .map(lineArr => [lineArr[0], Number.parseInt(lineArr[1], 10)])

    let position = 0
    let depth = 0
    let aim = 0

    commandArr.forEach(arr => {
        const [direction, amount] = arr
        if (direction === 'forward') {
            position += amount
            depth += aim * amount
        }

        if (direction === 'up' || direction === 'down') {
            aim += direction === 'down' ? amount : amount * -1
        }
    })

    console.log(position * depth)
})