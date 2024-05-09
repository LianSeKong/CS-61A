; Q1: Virahanka-Fibonacci

(define (vir-fib n) (
            cond ((= n 0) 0)
                ((= n 1) 1)
                (else (+  (vir-fib (- n 1)) 
                          (vir-fib (- n 2))
                      )
                )
        )
)



; Q2: list Making

(define with-list
    (list
        (list 'a 'b)
        'c
        'd
        (list (list 'e))
    )
)
(draw with-list)


(define with-list
    (list
        (list 'a 'b)
        'c
        'd
        (list (list 'e))
    )
)
(draw with-list)


; Q3: List Concatenation

(define (list-concat a b)
    (cond  ((and (null? a) (null? b)) nil)
           ((null? a) (cons (car b) (list-concat a (cdr b))))
           (else (cons (car a) (list-concat (cdr a) b)))
    )
)




; Q4: Map

(define (map-fn fn lst)
   (if (null? lst) nil
        (cons 
            (fn (car lst))
            (map-fn fn (cdr lst)) 
        )
    )
)

; Q5: Remove

(define (remove item lst)
    (if (null? lst) 
            nil  
            (if (eqv? (car lst) item)
                    (remove item (cdr lst))
                    (cons (car lst) (remove item (cdr lst)))
            )
    )
)