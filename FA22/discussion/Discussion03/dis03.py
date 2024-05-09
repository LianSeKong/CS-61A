from math import sqrt

# Q1: Warm Up: Recursive Multiplication

def multiply(m, n):
    """ Takes two positive integers and returns their product using recursion.
    >>> multiply(5, 3)
    15
    """
    "*** YOUR CODE HERE ***"
    if n == 0:
        return 0
    return m + multiply(m, n - 1)


# Q2: Recursion Environment Diagram

def rec(x, y):
    if y > 0:
        return x * rec(x, y - 1)
    return 1

rec(3, 2)

# Q3: Find the Bug

def skip_mul(n):
    """Return the product of n * (n - 2) * (n - 4) * ...

    >>> skip_mul(5) # 5 * 3 * 1
    15
    >>> skip_mul(8) # 8 * 6 * 4 * 2
    384
    """
    if n <= 2:
        return n
    else:
        return n * skip_mul(n - 2)

# Q4: Is Prime
def is_prime(n):
    """ Returns  True if n is a prime number and False otherwise

    >>> is_prime(2)
    True
    >>> is_prime(16)
    False
    >>> is_prime(521)
    True

    """
    if n <= 1:
        return False
    def helper(i):
        if i == n:
            return True
        elif n % i == 0:
            return False
        return helper(i + 1)
    return helper(2)


# Q5: Recursive Hailstone
def hailstone(n):
    """Print out the hailstone sequence starting at n, and return the number of elements in the sequence.
    >>> a = hailstone(10)
    10
    5
    16
    8
    4
    2
    1
    >>> a
    7
    """
    "*** YOUR CODE HERE ***"
    print(n)
    return n == 1 and n or hailstone(n % 2 and (n * 3 + 1) or n // 2) + 1

# Q6: Merge Numbers

def merge(n1,n2):
    """ Merges two numbers by digit in decreasing order
    >>> merge(31,42)
    4321
    >>> merge(21,0)
    21
    >>> merge(21,31)
    3211
    >>> merge(521,74)
    75421
    """
    if n1 == 0 or n2 == 0:
        return n1 or n2
    elif n1 % 10 < n2 % 10: 
        return  n1 % 10 + 10* merge(n1 // 10, n2)
    else:
        return  n2 % 10 + 10* merge(n1, n2 // 10)
