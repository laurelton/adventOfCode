const fs = require('fs')

const solvePartA = (input) => {
    return input
        .split('')
        .reduce((count, curr) => count + (curr === '(' ? 1 : -1) ,0)
}

const solvePartB = (input) => {
    let floor = 0
    let indx = 0
    const chars = input.split('')

    while (floor >= 0) {
        floor += chars[indx] === '(' ? 1 : -1
        indx++
    }

    return indx
}

const main = () => {
    const input = fs.readFileSync('input01.txt').toString()
    
    const solutionA = solvePartA(input)
    console.log(`Part A Solution ${solutionA}`)

    const solutionB = solvePartB(input)
    console.log(`Part B Solution ${solutionB}`)
}

main()
