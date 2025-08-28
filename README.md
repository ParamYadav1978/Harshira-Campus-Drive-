Method Used
This solution uses Gaussian elimination to solve for the coefficients of the polynomial.

What is Gaussian elimination?
Gaussian elimination is a mathematical algorithm used to solve systems of linear equations. In this assignment, each (x, y) pair from the JSON file gives you an equation of the form:
y = a0 + a1*x + a2*x^2 + ... + am*x^m
where a0, a1, ..., am are the coefficients of the polynomial (with a0 being the secret).

How does the code use it?
Matrix Setup:
The code builds a matrix where each row represents one (x, y) point, with columns for each power of x (from x^0 up to x^(k-1)), and a vector of the corresponding y values.

Gaussian Elimination:
The code then applies Gaussian elimination to this matrix system to solve for the coefficients. This involves:

Making the matrix upper triangular (eliminating variables from lower rows).
Back-substituting to find the values of each coefficient.
Result:
The first coefficient (a0) is the constant term, which is the “secret” you are asked to find.

This method  works for any set of k points that define a unique polynomial of degree k-1.

