from hashlib import md5
from sys import argv, stdout
from itertools import cycle

def solve(secret, prefix):
    foundFiveZeroes = False
    num = 0
    spinner = cycle(['-', '/', '|', '\\'])

    while not foundFiveZeroes:
        num += 1
        test_str = f'{secret}{num}'
        hash_str = md5(test_str.encode()).hexdigest()
        foundFiveZeroes = hash_str.startswith(prefix)
        stdout.write(next(spinner))
        stdout.flush()
        stdout.write('\b')
    
    begin_color = '\033[0;33m'
    end_color = '\033[0m'
    print(f'{begin_color}{num}{end_color}')


def main():
    secret_key = argv[1]
    try:
        #   part A
        print('Solving part A... ', end = '')
        solve(secret_key, '0' * 5)

        #   part B
        print('Solving part B... ', end = '')
        solve(secret_key, '0' * 6)
    except KeyboardInterrupt:
        exit(1)


if __name__ == '__main__':
    main()
