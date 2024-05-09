def piggy_points(score):
    """Return the points scored from rolling 0 dice.

    score:  The opponent's current score.
    """
    # BEGIN PROBLEM 2
    "*** YOUR CODE HERE ***"
    score = score**2
    mini_number = score % 10
    score = score // 10
    while score!=0:
        if mini_number > score % 10 :
            mini_number = score % 10
        score //= 10
    return mini_number+3


print(piggy_points(100))