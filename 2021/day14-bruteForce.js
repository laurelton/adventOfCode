const fs = require('fs')

const parseInputFile = (filename) => {
    const parseRules = (rules) => {
        return rules
            .split('\n')
            .reduce((obj, pairString) => {
                const [pair, insert] = pairString.split(' -> ')
                obj = Object.assign(obj, {[pair]: insert})
                
                return obj
            }, {})
    }

    const promise = new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) reject(err)

            const [template, rawRules]  = data.trim().split('\n\n')
            const rules = parseRules(rawRules)
            resolve({ template, rules })
        })
    })

    return promise
}

const performSteps = (template, rules, steps) => {
    for (let i = 0; i < steps; i++) {
        const polymer = template.split('')
        template = polymer.reduce((prev, curr) => {
            const last = prev[prev.length - 1]
            const insert = rules[last + curr]

            return prev + insert + curr
        })
    }

    return template
}

const countLetters = (polymer) => {
    const letters = polymer.split('')
    const counts = letters.reduce((obj, lttr) => {
        obj[lttr] = (obj[lttr] || 0) + 1

        return obj
    }, {})

    return counts
}

const getMaxDifference = (counts) => {
    const values = Object.values(counts)

    return Math.max(...values) - Math.min(...values)
}

const main = async () => {
    const filename = process.argv[2] || 'sample.txt' || 'day14_input.txt'
    const steps = Number.parseInt(process.argv[3], 10) || 10

    const { template, rules } = await parseInputFile(filename)
    
    console.time('Execute Steps')
    const polymer = performSteps(template, rules, steps)
    console.timeEnd('Execute Steps')

    console.time('Count Letters')
    const counts = countLetters(polymer)
    console.timeEnd('Count Letters')

    console.time('Get Diff')
    const difference = getMaxDifference(counts)
    console.timeEnd('Get Diff')

    console.log(counts)
    console.log(`Length: ${Object.values(counts).reduce((a, b) => a + b).toLocaleString()}`)
    console.log(difference.toLocaleString())
}

main()
