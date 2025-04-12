function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function countdown(n) {
  if (n === 0) {
    console.log(0);
    console.log("Countdown finished!");
    return;
  }
  
  console.log(n);
  await sleep(1000); 
  await countdown(n - 1);
}

countdown(5);
