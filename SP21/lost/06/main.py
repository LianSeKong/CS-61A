from os import link


class Foo():
    x = 'bam'

    def __init__(self,x):
        self.x = x
    
    def baz(self):
        return self.x
    

class Bar(Foo):
    x = 'boom'

    def __init__(self,x):
        Foo.__init__(self,'er' + x)
    
    def baz(self):
        return Bar.x + Foo.baz(self)

# foo = Foo('boo')   #    Nothing
# Foo.x              #    'bam'
# foo.x              #    'boo'
# foo.baz()          #    'boo'
# Foo.baz()          #    'Error'
# Foo.baz(foo)       #    'boo'
# bar = Bar('ang')   #     Nothing
# Bar.x              #     'boom'
# bar.x              #     'erang'
# bar.baz()          #     'boomerang'


class Student:
    def __init__(self, subjects):
        self.current_units = 16
        self.subjects_to_take = subjects
        self.subjects_learned = {}
        self.partner = None


    def learn(self, subject, units):
        print('I just learned about ' + subject)
        self.subjects_learned[subject] = units
        self.current_units -= units

    def make_friends(self):
        if len(self.subjects_to_take) > 3:
            print('Whoa! I need more help!')
            self.partner = Student(self.subjects_to_take[1:])
        else:
            print("I'm on my own now!")
            self.partner = None

    def take_course(self):
        course = self.subjects_to_take.pop()
        self.learn(course, 4)
        if self.partner:
            print('I need to switch this up!')
            self.partner = self.partner.partner
            if not self.partner:
                print('I have failed to make a friend :(')


# tim = Student(['Chem1A', 'Bio1B', 'CS61A', 'CS70', 'CogSci1'])


# tim.make_friends()    # 'Whoa! I need more help!'  self.partner = Student(['Bio1B', 'CS61A', 'CS70', 'CogSci1'])


# print(tim.subjects_to_take)      # ['Chem1A', 'Bio1B', 'CS61A', 'CS70', 'CogSci1']
# tim.partner.make_friends()       # 'Whoa! I need more help!'   self.partner = Student(['CS61A', 'CS70', 'CogSci1'])
# tim.take_course()                # ['Chem1A', 'Bio1B', 'CS61A', 'CS70']  'I just learned about CogSci1'   {'CogSci1':4}  12
# tim.partner.take_course()        # I'm on my own now!
# tim.take_course()                # ['Chem1A', 'Bio1B', 'CS61A']  'I just learned about CS70'   {'CogSci1':4 ,'CS70':4}  8
# tim.make_friends()               # "I'm on my own now!"




class Cat():
    noise = 'meow'

    def __init__(self, name):
        self.name = name
        self.hungry = True

    def meow(self):
        if self.hungry:
            print(self.noise + ', ' + self.name + ' is hungry')
        else:
            print(self.noise + ', my name is ' + self.name)

    def eat(self):
        print(self.noise)
        self.hungry = False


class Kitten(Cat):
    noise = 'i\'m baby'

    def __init__(self, name, mom):
        super().__init__(name)
        self.mom = mom
    
    def meow(self):
        super().meow()
        print('I want mama ' + self.mom.name)

# Link 

class Link:
    empty = ()
    def __init__(self, first, rest=empty):
        assert rest is Link.empty or isinstance(rest, Link)
        self.first = first
        self.rest = rest

    def __repr__(self):
        if self.rest:
            rest_str = ', ' + repr(self.rest)
        else:
            rest_str = ''
        return 'Link({0}{1})'.format(repr(self.first), rest_str)

    def __str__(self):
        string = '<'
        while self.rest is not Link.empty:
            string += str(self.first) + ' '
            self = self.rest
        return string + str(self.first) + '>'


def has_cycle(link):
    """
    >>> s = Link(1, Link(2, Link(3)))
    >>> s.rest.rest.rest = s
    >>> has_cycle(s)
    True
    """

    # Iteration
    
    current = link.rest

    while current is not Link.empty:
        if current is link:
            return True
        current = current.rest
    return False 


    # prev = link
    # current = link.rest
    
    # while current is not Link.empty:
    #     if prev is current:
    #         return True
    #     prev = prev.rest
    #     current = current.rest
    #     if current is Link.empty:
    #         return False
    #     current = current.rest
    # return False





def seq_in_link(link, sub_link):
    """
    >>> lnk1 = Link(1, Link(2, Link(3, Link(4))))
    >>> lnk2 = Link(1, Link(3))
    >>> lnk3 = Link(4, Link(3, Link(2, Link(1))))
    >>> seq_in_link(lnk1, lnk2)
    True
    >>> seq_in_link(lnk1, lnk3)
    False
    """
    if sub_link is Link.empty:
        return True

    while link is not Link.empty:
        if link.first == sub_link.first:
            sub_link = sub_link.rest
            if sub_link is Link.empty:
                return True
        link = link.rest
    return False



def remove_duplicates(lnk):
    """
    >>> lnk = Link(1, Link(1, Link(1, Link(1, Link(5)))))
    >>> remove_duplicates(lnk)
    >>> lnk
    Link(1, Link(5))
    """

    current = lnk.rest
    while current is not Link.empty:
        if lnk.first == current.first:
            current = current.rest
        else:
            lnk.rest = current
            lnk = lnk.rest
            current = current.rest
    lnk.rest = current
            

def reverse(lnk):
    """
    >>> a = Link(1, Link(2, Link(3)))
    >>> r = reverse(a)
    >>> r.first
    3
    >>> r.rest.first
    2
    """    
    prev = lnk
    end = lnk.rest

    while end is not Link.empty:
        temp = end.rest 
        end.rest = prev
        prev = end
        end = temp 
    
    lnk.rest = Link.empty
    return prev


    

