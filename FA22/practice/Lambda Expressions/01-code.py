from tkinter import SW


def forbid_digit(f, forbidden):
    """
    >>> g = forbid_digit(lambda y: 200 // (y % 10), 0)
    >>> g(11)
    200
    >>> g(10)
    200
    >>> g = forbid_digit(lambda x: f'{x}a', 6)
    >>> g(61)
    '61a'
    >>> g(66)
    '6a'
    >>> g = forbid_digit(g, 3)
    >>> g(43)
    '4a'
    >>> g(63)
    '0a'
    >>> g(44)
    '44a'
    """
    def forbid_wrapper(n):
        if n % 10 == forbidden:
                return f(n // 10)
        else:
            return f(n)
    return forbid_wrapper

def forbid_digit(f, forbidden):
    return lambda n:  n % 10 == forbidden and f(n // 10) or f(n)


def lava_hopper(start_number, goal_number, next_hop, is_lava):
    """
    >>> # hops from 1->2, 2->4, 4->8
    >>> lava_hopper(1, 8, lambda x: x * 2, lambda x: False)
    3
    >>> # hops from 1->2, 2->4, steps to 3, hops 3->6, hops 6->12
    >>> lava_hopper(1, 8, lambda x: x * 2, lambda x: x == 4)
    4
    >>> # hops from 1->2, 2->4, 4->8, steps to 7, then 6, then 5, hops to 10
    >>> lava_hopper(1, 10, lambda x: x * 2, lambda x: 6 <= x <= 8)
    4
    >>> # hops from 3->6, 6->12, steps to 11, hops 11->22
    >>> lava_hopper(3, 20, lambda x: x * 2, lambda x: x % 10 == 2)
    3
    >>> lava_hopper(1, 8, lambda x: x * 2, lambda x: x == 1)
    'No lava allowed there!'
    >>> lava_hopper(1, 8, lambda x: x * 2, lambda x: x == 8)
    'No lava allowed there!'
    """
    if is_lava(goal_number) or is_lava(goal_number):
        return 'No lava allowed there!'
    num_hops = 0
    while start_number < goal_number:
        while is_lava(start_number):
            start_number -= 1
        start_number = next_hop(start_number)
        num_hops += 1
    return num_hops

def curry_up_now(item_price):
    def order_quantity(item_quantity):
        def by(ordered_at):
            result = order_meal(item_price,item_quantity,ordered_at)
            print(result)
            if result!='Wait':
                return lambda item_quantity: lambda ordered_at: print(order_meal(item_price * 0.5,item_quantity,ordered_at))
        return by

    return order_quantity


olympics = 2022
held = 2021


# 2014
two_thousand = lambda two: lambda k: k(two)(two)
t = two_thousand(7)(lambda four: lambda teen: 2000 + four + teen)
print(t)


def if_fn(condition):
    if condition:
        return lambda a, b: a
    else:
        return lambda a, b: b


def factorial(n):
    """ Compute N! for non - negative N. N! = 1 * 2 * 3 * ... * N.
    >>> factorial (3)
    6
    >>> factorial (5)
    120
    >>> factorial (0)
    1
    """
    def base():
        return 1
    def recursive():
        return n * factorial(n-1)

    # return if_fn(n)(recursive(),base())
    return if_fn(n)(recursive,base)()

print(factorial(3))

# 2015
lamb = lambda lamb : lambda : lamb + lamb
t = lamb(1000)() + ( lambda b , c : b() * b() - c )( lamb(2) , 1)

print(t)


def scurry(f,n):

    def h(k,arg_so_far):
        if k == 0:
            return f(arg_so_far)
        return   lambda x: h(k-1,arg_so_far + [x])

    return h(n,[])

delete = lambda k: lambda n: k // 10 ** n


def counter(base):

    """Return a function which accepts digits in a given base and returns the value in base
    10 after encountering 'done'. Numbers that are not digits in the given base are ignored.
    >>> binary = counter(2)
    >>> binary('done')
    0
    >>> binary(1)(0)(1)(1)('done') # see example from previous page
    11
    >>> binary(1)(2)(3)(0)(1)('done') # 2 and 3 are not digits in base 2
    5
    >>> quaternary = counter(4)
    >>> quaternary(1)(2)(3)(0)(1)('done') # 1*(4**4) + 2*(4**3) + 3*(4**2) + 0*(4**1) + 1*1
    433
    """

    def parse(n,total = 0):
        if n == 'done':
            return total
        elif base <= n:
            return lambda x : parse(x,total)
        else: 
            return lambda x:parse(x,total * base + n)
    
    return parse


def f(n,g):
    if n > 0:
        return f(n - 1, lambda: g() + 1)
    else:
        return g

x = lambda : 3
def helper(f,g):
    while f == 1:
        x = g
        g = lambda y: x()
        return g

y = helper(1,lambda: 6)

print(y(5))