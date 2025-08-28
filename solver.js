
// Catalog Placements Assignment Solution
// step 1 : first call the json file from the vscode to the javsscipt 
//step 2 : decode the sample testcase from base value to normal roots 
//Steps 3 : use method matrix setup and gaussian elimination 
//step 4 : print the value of c with the roots


// 1. Import the 'fs' module to work with files
const fs = require('fs');

// 2. This function does all the work for one JSON file
function processFile(filename) {
	// Print which file we're using
	console.log('Using input file:', filename);

	// Read the file and parse the JSON into a JavaScript object
	const data = JSON.parse(fs.readFileSync(filename, 'utf8'));

	// Get the number of points (n) and the minimum required points (k)
	const n = data.keys.n;
	const k = data.keys.k;

	// We'll store all the (x, y) points here
	let points = [];

	// Go through each key in the JSON (except 'keys')
	for (let key in data) {
		if (key === 'keys') continue; // skip the 'keys' property
		// The key is the x value (as a string, so convert to number)
		const x = parseInt(key);
		// The y value is encoded in a certain base, so decode it
		const base = parseInt(data[key].base);
		const y = parseInt(data[key].value, base);
		// Add the (x, y) pair to our list
		points.push([x, y]);
	}

	// Sort the points by x value (just in case they're not in order)
	points.sort((a, b) => a[0] - b[0]);

	// We only need the first k points to solve for the polynomial
	const selectedPoints = points.slice(0, k);

	// Now, let's build the matrix (A) and vector (Y) for our equations
	// Each row in A is: [1, x, x^2, ..., x^{k-1}]
	let A = [];
	let Y = [];
	for (let i = 0; i < k; i++) {
		let row = [];
		let x = selectedPoints[i][0];
		for (let j = 0; j < k; j++) {
			row.push(Math.pow(x, j)); // x^j
		}
		A.push(row); // Add this row to our matrix
		Y.push(selectedPoints[i][1]); // Add the y value to our vector
	}

	// This function solves the system of equations using Gaussian elimination
	function gaussianElimination(a, b) {
		let n = a.length;
		// Make a copy of the matrix and add the b vector as the last column
		for (let i = 0; i < n; i++) {
			a[i] = a[i].slice();
			a[i].push(b[i]);
		}
		// Forward elimination: make the matrix upper triangular
		for (let i = 0; i < n; i++) {
			// Find the row with the largest value in this column (for stability)
			let maxRow = i;
			for (let j = i + 1; j < n; j++) {
				if (Math.abs(a[j][i]) > Math.abs(a[maxRow][i])) {
					maxRow = j;
				}
			}
			// Swap the current row with the max row
			let temp = a[i];
			a[i] = a[maxRow];
			a[maxRow] = temp;
			// Eliminate all rows below
			for (let j = i + 1; j < n; j++) {
				let factor = a[j][i] / a[i][i];
				for (let k = i; k <= n; k++) {
					a[j][k] -= factor * a[i][k];
				}
			}
		}
		// Back substitution: solve for the variables from bottom up
		let x = new Array(n);
		for (let i = n - 1; i >= 0; i--) {
			x[i] = a[i][n] / a[i][i];
			for (let j = i - 1; j >= 0; j--) {
				a[j][n] -= a[j][i] * x[i];
			}
		}
		return x;
	}

	// Solve for the coefficients of the polynomial
	const coeffs = gaussianElimination(A, Y);

	// Print out the coefficients in a friendly way
	console.log('Polynomial coefficients (from constant term up):');
	for (let i = 0; i < coeffs.length; i++) {
		console.log(`a${i} = ${coeffs[i]}`);
	}
	// The secret is the constant term (a0)
	console.log('\nSecret (constant term) is:', coeffs[0]);
	console.log('------------------------------------------');
}

// Main logic:
// If you provide a filename (e.g. node solver.js sample.json), it will only run that file.
// If you run without arguments (node solver.js), it will run both sample.json and testcase2.json.
if (process.argv[2]) {
	processFile(process.argv[2]);
} else {
	processFile('sample.json');
	processFile('testcase2.json');
}

// (No code should follow here that uses 'data')






