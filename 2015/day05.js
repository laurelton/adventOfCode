const fs = require('fs')

const rule1 = (str) => {    // Contains 3 vowels
    const vowels = new Set(['a', 'e', 'i', 'o', 'u'])
    let vowelCount = 0

    str.split('').forEach(lttr => {
        vowelCount += vowels.has(lttr) ? 1 : 0
    })

    return vowelCount >= 3
}

const rule2 = (str) => {    // Consecutive letters
    let isNice = false
    str.split('').reduce((prev, curr) => {
        isNice = isNice || (prev === curr)

        return curr
    })

    return isNice
}

const rule3 = (str) => {    // Prohibited strings
    const prohibited = new Set(['ab', 'cd', 'pq', 'xy'])
    for (const excluded of prohibited) {
        if (str.includes(excluded)) {
            return false
        }
    }

    return true
}

const pairAppearsTwice = (text) => {   // Two pairs of duplicates
    const letters = text.split('')

    return letters.some((lttr, i, arr) => {
        return text.includes(lttr + arr[i + 1], i + 2)
    })
}

const letterBetweenDuplicates = (text) => {   // duplicate letters one letter apart
    const letters = text.split('')

    return letters.some((lttr, i, arr) => {
        return arr[i + 2] && lttr === arr[i + 2]
    })
}

const solveA = (strings) => {
    let niceCount = 0
    strings.forEach(str => {
        const isNice = rule1(str) && rule2(str) && rule3(str)
        niceCount += isNice ? 1 : 0
    })

    return niceCount
}

const solveB = (strings) => {
    let niceCount = 0
    strings.forEach(str => {
        const isNice = pairAppearsTwice(str) && letterBetweenDuplicates(str)
        niceCount += isNice ? 1 : 0
    })

    return niceCount
}

const main = () => {
    const filename = process.argv[2] || 'input05.txt'
    const input = fs.readFileSync(filename, 'utf8')
        .toString()
        .trim()
        .split('\n')

    const begin_color = '\033[0;33m'
    const end_color = '\033[0m'

    const solutionA = solveA(input)
    console.log(`Solution to part 1:\t${begin_color}${solutionA}${end_color}`)

    const solutionB = solveB(input)
    console.log(`Solution to part 2:\t${begin_color}${solutionB}${end_color}`)
}

main()
