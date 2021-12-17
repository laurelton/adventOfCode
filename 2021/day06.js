const fs = require('fs')

const getSchool = (fileContents) => {
    const days = new Array(9).fill(0)
    fileContents
        .trim()
        .split(',')
        .map(num => Number.parseInt(num, 10))
        .forEach(index => days[index]++)

    return days
}

const calculateFish = (school, numDays) => {
    for (let i = 0; i < numDays; i++) {
        const zeroes = school.shift()
        school.push(zeroes)
        school[6] += zeroes
    }

    return school
}

const calculateSchool = (numDays) => {
    return new Promise((resolve, reject) => {
        fs.readFile('sample06.txt', 'utf8', (err, data) => {
            if (err) reject(err)

            const initialSchool = getSchool(data)
            const populationByDay = calculateFish(initialSchool, numDays)
            const totalFish = populationByDay.reduce((acc, curr) => acc + curr)

            resolve(totalFish)
        })
    })
}

const main = async () => {
    const school80Days = await calculateSchool(80)
    console.log(`After 80 days:\t${school80Days}`)

    const school256Days = await calculateSchool(256)
    console.log(`After 256 days:\t${school256Days}`)
}

if (require.main === module) {
    main()
}
