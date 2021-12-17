const fs = require('fs')

const parseInputFile = (filename) => {
    const fileContents = fs.readFileSync(filename).toString()
    const [ template, rulesList ] = fileContents.split('\n\n')
    const insertRules = rulesList
        .trim()
        .split('\n')
        .map(rule => rule.split(' -> '))
        .reduce((obj, rule) => Object.assign(obj, {[rule[0]]: rule[1]}), {})

    return { template, insertRules }
}

const getFinalPairCounts = (template, rules, steps) => {
    let pairCounts = {}
    template
        .split('')
        .reduce((prev, curr) => {
            const pair = prev + curr
            pairCounts[pair] = (pairCounts[pair] || 0) + 1

            return curr
        })

    for (let i = 0; i < steps; i++) {
        const stepCounts = {}
        const pairs = Object.keys(pairCounts)

        pairs.forEach(pair => {
            const insert = rules[pair]
            const pair1 = pair[0] + insert
            const pair2 = insert + pair[1]

            stepCounts[pair1] = (stepCounts[pair1] || 0) + pairCounts[pair]
            stepCounts[pair2] = (stepCounts[pair2] || 0) + pairCounts[pair]
        })
        pairCounts = stepCounts
    }

    return pairCounts
}

const getLetterCounts = (pairCounts, template) => {
    const lastLetter = template[template.length - 1]
    const letterCounts = {}

    for (const [pair, count] of Object.entries(pairCounts)) {
        const lttr = pair[0]
        letterCounts[lttr] = (letterCounts[lttr] || 0) + count
    }

    letterCounts[lastLetter]++
    return letterCounts
}

const getMaxDifference = (letterCounts) => {
    const counts = Object.values(letterCounts)

    return Math.max(...counts) - Math.min(...counts)
}


const main = () => {
    const filename = 'day14_input.txt'
    const { template, insertRules } = parseInputFile(filename)
    console.log(`Initial template ${template}`)

    const steps = Number.parseInt(process.argv[2], 10) || 10
    const finalPairCounts = getFinalPairCounts(template, insertRules, steps)

    const letterCounts = getLetterCounts(finalPairCounts, template)

    const difference = getMaxDifference(letterCounts)
    console.log(`Difference = ${difference.toLocaleString()}`)
}

main()
