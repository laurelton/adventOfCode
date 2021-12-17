with open('day01_input.txt') as f:
    nums = [int(x.strip()) for x in f]
    

count = 0

for i in range(len(nums) - 3):
    curr = sum(nums[i:i+3])
    nxt = sum(nums[i+1:i+4])
    count += 1 if nxt > curr else 0

print(f'Part B:\t{count}')