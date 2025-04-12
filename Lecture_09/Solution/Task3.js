let start = 78;
let n = start;
let isPrime = false;

while (!isPrime) {
    let divisor = 2;
    isPrime = true;
    while (divisor < n) {
        if (n % divisor === 0) {
            isPrime = false;
            break;
        }
        divisor++;
    }

    if (isPrime) {
        console.log(`The first prime number > ${start} is: ${n}`);
    } else {
        n++;
    }
}