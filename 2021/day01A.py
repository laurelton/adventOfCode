prev = None
count = 0

with open('day01_input.txt') as f:
    for line in f:
        curr = int(line.strip())
        if prev != None:
            count += 1 if curr > prev else 0

        prev = curr

print(f'Part A:\t{count}')
