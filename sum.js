function sum(n){
    let sum=0
    for(let i=1; i<=n; i++){
        sum +=i
    }
    return sum
}

function sum2(n){
    return (1+n)*n/2
}

// console.log(sum2(1))
// console.log(sum2(3))
// console.log(sum2(4))
// console.log(sum2(5))

console.time('SUM1');
for (let i = 0; i <= 10000; i++) {
  sum(10000);
}
console.timeEnd('SUM1');

console.time('SUM2');
for (let i = 0; i <= 10000; i++) {
  sum2(10000);
}
console.timeEnd('SUM2');