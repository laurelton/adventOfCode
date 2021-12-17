commands = {
    'forward': 0,
    'up': 0,
    'down': 0,
}

with open('day02_input.txt') as f:
    for line in f:
        cmd, arg = line.strip().split(' ')
        commands[cmd] += int(arg)

vertical = commands['down'] - commands['up']
horizontal = commands['forward']
print(f'Day 02\tPart A:\t{horizontal * vertical}')