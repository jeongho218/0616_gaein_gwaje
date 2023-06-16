const today = new Date();

const tmr = new Date();
tmr.setDate(today.getDate() + 1);

const twoDayAgo = new Date();
twoDayAgo.setDate(today.getDate() - 2);

console.log(today);
console.log(tmr);
console.log(twoDayAgo);

/** */
