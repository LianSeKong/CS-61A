# Q1: Count Stair Ways

def count_stair_ways(n):
    """Returns the number of ways to climb up a flight of
    n stairs, moving either 1 step or 2 steps at a time.
    >>> count_stair_ways(4)
    5
    """
    if n == 0:
        return 1
    if n < 0:
        return 0
    return count_stair_ways(n - 1) + count_stair_ways(n - 2)

# Q2: Count K

def count_k(n, k):
    """ Counts the number of paths up a flight of n stairs
    when taking up to and including k steps at a time.
    >>> count_k(3, 3) # 3, 2 + 1, 1 + 2, 1 + 1 + 1
    4
    >>> count_k(4, 4)
    8
    >>> count_k(10, 3)
    274
    >>> count_k(300, 1) # Only one step at a time
    1
    """
    if n == 0:
        return 1
    if n < 0 :
        return 0
    i = 1
    sum = 0
    while i <= k:
      sum += count_k(n - i, k)
      i = i + 1
    return sum

# Q4: Even weighted

def even_weighted(s):
    """
    >>> x = [1, 2, 3, 4, 5, 6]
    >>> even_weighted(x)
    [0, 6, 20]
    """
    return [s[i]*i for i in range(len(s))  if i % 2 == 0]


# Q5: Max Product

def max_product(s):
    """Return the maximum product that can be formed using
    non-consecutive elements of s.
    >>> max_product([10,3,1,9,2]) # 10 * 9
    90
    >>> max_product([5,10,5,10,5]) # 5 * 5 * 5
    125
    >>> max_product([])
    1
    """
    if len(s) == 0:
        return 1
    if len(s) <= 2:
        return max(s)
    return max(s[0] * max_product(s[2:]), s[1] * max_product(s[3:]))




