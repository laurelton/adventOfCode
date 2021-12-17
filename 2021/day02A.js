const fs = require('fs')
const filename = process.argv[2] || 'day02_input.txt'

fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw err

    const lines = data.trim().split('\n')

    const commands = {forward: 0, up: 0, down: 0,}
    lines
        .map(line => line.split(' '))
        .reduce((cmds, curr) => {
            const [dir, amount] = curr
            cmds[dir] += Number.parseInt(amount, 10)

            return cmds
        }, commands)

    console.log((commands.down - commands.up) * commands.forward)
})
