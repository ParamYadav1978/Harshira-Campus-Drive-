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

OUTPUT :
node solver.js
Using input file: sample.json
Polynomial coefficients (from constant term up):
a0 = 3
a1 = 0
a2 = 1

Secret (constant term) is: 3
------------------------------------------
Using input file: testcase2.json
Polynomial coefficients (from constant term up):
a0 = 79836263974648.25
a1 = 92534348875520
a2 = 234176747259428
a3 = 147160079823729.6
a4 = 105860038257394.4
a5 = 129715447662281.33
a6 = 205802168748489.34

Secret (constant term) is: 79836263974648.25
