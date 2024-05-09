(define (cddr s) (cdr (cdr s)))

(define (cadr s) (car (cdr s)))

(define (caddr s) (cadr (cdr s)))

(define (ascending? asc-lst) (if (eqv? (cdr asc-lst) '()) #t (if (<= (car asc-lst) (cadr asc-lst)) (ascending? (cdr asc-lst)) #f)))

(define (square n) (* n n))

(define (pow base exp)  (if (= exp 1) base (* (if (even? exp) 1 base)  (pow (square base) (quotient exp 2)))))

; (square base) 
