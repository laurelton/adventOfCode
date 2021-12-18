const fs = require('fs')

const solvePartA = (dimensions) => {
    return dimensions.reduce((total, curr) => {
        const [l, w, h] = curr
        const areas = [
            l * w,
            l * h,
            w * h]
        const surfaceArea = areas.reduce((total, curr) => total + (2 * curr), 0)
        console.log(l, w, h)
        console.log(areas)
        console.log(surfaceArea)

        return Math.min(...areas) + surfaceArea + total
    }, 0)
}

const solvePartB = (dimensions) => {
    return dimensions.reduce((total, curr) => {
        curr.sort((lo, hi) => lo - hi)
        const [l, w, h] = curr

        return total + (2 * l) + (2 * w) + (l * w * h)
    }, 0)
}

const main = () => {
    const input = fs.readFileSync('input02.txt').toString()
    const dimensions = input
        .trim()
        .split('\n')
        .map(str => str.split('x'))

    const solA = solvePartA(dimensions)
    console.log(`Solution A:\t${solA}`)

    const solB = solvePartB(dimensions)
    console.log(`Solution B:\t${solB}`)
}

main()
