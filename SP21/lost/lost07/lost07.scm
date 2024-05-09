;  阶乘
(define (factorial x)
        (if (= x 1) 1
            (* x (factorial (- x 1)))
        )
)

(define (reduce fn s lst)
        (if (null? lst) s (reduce fn (fn s (car lst)) (cdr lst)))
)


(define (deep-map fn lst)
    (cond ((null? lst) nil )
          ((list? (car lst)) (cons (deep-map fn (car lst)) (deep-map fn (cdr lst))))
          (else (cons (fn (car lst)) (deep-map fn (cdr lst))))
    )
)

(define (mulxy x y)
    (cond ((< y 0) (- (mulxy x (- y))))
          ((= y 0) 0)
          (else (+ x (mulxy x (- y 1))))
    )
)



