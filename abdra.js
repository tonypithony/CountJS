
function gauss(A, b) {
    for (var i = 0; i < A.length; i++) {
        var a = A[i][i];
        for (var j = 0; j < A.length; j++) {
            A[i][j] /= a;
        }
        b[i] /= a;
        for (var k = i+1; k < A.length; k++) {
            var a = A[k][i]
            for (var j = 0; j < A.length; j++) {
                A[k][j] -= a * A[i][j];
            }
            b[k] -= a * b[i];
        }
    }

    for (var i = A.length - 1; i >= 0; i--) {
        for (var k = i-1; k >= 0; k--) {
            b[k] -= A[k][i] * b[i];
            A[k][i] = 0;
        }
    }
    return b;
}

function polyfit(x, y, degree) {
    A = d3.range(degree+1).map(i =>
            d3.range(degree+1).map(j =>
                x.map(a => a**(i+j)).reduce((i, j) => i+j)));
    b = d3.range(degree+1).map(i => x.map((xj, j) => y[j] * xj ** i).reduce((i, j) => i+j));
    return gauss(A, b);
}

function polyval(poly, xs) {
    return xs.map(x => poly.map((a, i) => a * x**i).reduce((i,j)=>i+j));
}


console.log(gauss([[1,2],[3,4]],[1,1]))