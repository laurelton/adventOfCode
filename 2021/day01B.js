const fs = require('fs')
const filename = 'day01_input.txt'
const encoding = 'utf8'

fs.readFile(filename, encoding, (err, data) => {
    if (err) throw err
    
    const nums = data.split('\n').map(n => Number.parseInt(n, 10))
    const len = nums.length
    const count = nums.reduce((count, curr, i) => {
        if (i + 3 < len) {
            const currSum = curr + nums[i + 1] + nums[i + 2]
            const nextSum = nums[i + 1] + nums[i + 2] + nums[i + 3]

            count = nextSum > currSum ? count + 1 : count
        }

        return count
    }, 0)

    console.log(count)
})
