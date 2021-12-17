const fs = require('fs')

const bracketPairs = {
    ')':'(',
    ']':'[',
    '}':'{',
    '>':'<',
}

const openBrackets = new Set()
openBrackets.add('(')
openBrackets.add('[')
openBrackets.add('{')
openBrackets.add('<')

const getErrorScore = (line) => {
    let errorScore = 0
    const stack = []
    const scores = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137,
    }

    for (const char of line) {
        if (openBrackets.has(char)) {
            stack.push(char)
            continue
        }

        if (stack.length === 0) {
            errorScore = scores[char]
            break
        }

        const expected = bracketPairs[char]
        const actual = stack.pop()

        if (expected !== actual) {
            errorScore = scores[char]
            break
        }
    }

    return errorScore
}

const getIncompleteScore = (line) => {
    let incompleteScore = 0
    const stack = []
    const scores = {
        '(': 1, 
        '[': 2,
        '{': 3,
        '<': 4,
    }

    const errorScore = getErrorScore(line)
    if (errorScore === 0) {
        for (const char of line) {
            if (openBrackets.has(char)) {
                stack.push(char)
                continue
            }
            
            stack.pop()
        }
    }

    for (const char of stack.reverse()) {
        incompleteScore *= 5 
        incompleteScore += scores[char]
    }

    return incompleteScore
}

const solvePartA = (input) => {
    let errorScore = 0

    input.forEach(line => {
        errorScore += getErrorScore(line)
    })

    return errorScore
}

const solvePartB = (input) => {
    let incompleteScores = []

    input.forEach(line => {
        const score = getIncompleteScore(line)
        incompleteScores.push(score)
    })

    incompleteScores = incompleteScores
        .filter(score => score !== 0)
        .sort((lo, hi) => lo - hi)
    const middleIndex = Math.floor(incompleteScores.length / 2)

    return incompleteScores[middleIndex]
}

const getInput = (filename) => {
    const options = { encoding: 'utf8' }
    const promise = new Promise((resolve, reject) => {
        fs.readFile(filename, options, (err, data) => {
            if (err) reject(err)

            const lines = data.trim().split('\n')
            resolve(lines)
        })
    })

    return promise
}

const main = async () => {
    const filename = process.argv[2] || 'day10_input.txt'
    const title = 'Advent of Code 2021 - Day 10'

    console.log(title)
    console.log('='.repeat(title.length))

    const input = await getInput(filename)
    const partASolution = solvePartA(input)
    console.log(`Part A:\t${partASolution}`)
    console.log('-'.repeat(title.length))
    
    const partBSolution = solvePartB(input)
    console.log(`Part B:\t${partBSolution}`)
    console.log('-'.repeat(title.length))
}

if (require.main === module) {
    main()
}
