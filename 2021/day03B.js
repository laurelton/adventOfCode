/* eslint-disable semi */
/* eslint-disable no-bitwise */
const fs = require('fs')
const filename = process.argv[2] || 'day03_input.txt'
const encoding = 'utf8'

const countSetBits = (col, numbers) => {
    const ones = numbers.reduce((count, num) => {
        if ((num & col) === col) {
            count += 1
        }

        return count
    }, 0)

    return ones
}

const getO2Rating = (numbers, numBits) => {
    let o2Numbers = numbers
    for (let col = 2 ** (numBits - 1); col >= 1; col = col / 2) {
        const numSetBits = countSetBits(col, o2Numbers)
        const mostCommonBit = numSetBits >= (o2Numbers.length / 2) ? 1 : 0
        o2Numbers = o2Numbers.filter(num => (num & col) === col * mostCommonBit)

        if (o2Numbers.length === 1) {
            break
        }
    }
    return o2Numbers[0]
}

const getCO2Rating = (numbers, numBits) => {
    for (let col = 2 ** (numBits - 1); col >= 1; col = col / 2) {
        const numSetBits = countSetBits(col, numbers)
        const unsetBits = numbers.length - numSetBits
        const leastCommonBit = unsetBits <= numSetBits ? 0 : 1
        numbers = numbers.filter(num => (num & col) === col * leastCommonBit)

        if (numbers.length === 1) {
            break
        }
    }

    return numbers[0]
}

const readFile = (err, data) => {
    if (err) throw err

    const lines = data.trim().split('\n')
    const numBits = lines[0].length
    const numbers = lines.map(binary => Number.parseInt(binary, 2))
    const o2Rating = getO2Rating(numbers, numBits)
    console.log(`The O2 rating is ${o2Rating}`)
    const co2Rating = getCO2Rating(numbers, numBits)
    console.log(`The CO2 rating is ${co2Rating}`)
    const lifeSupportRating = o2Rating * co2Rating
    console.log(`The life support rating is ${lifeSupportRating}`)
}

fs.readFile(filename, encoding, readFile)
