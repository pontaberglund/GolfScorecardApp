const visbygk = {
  par: ['4', '4', '3', '4', '5', '4', '3', '4', '5'],
  index: [5, 14, 2, 11, 9, 18, 4, 13, 3, 12, 8, 17, 7, 16, 1, 10, 6, 15],
}

let shcp = 48
const extra = new Array(18).fill(0)
let i = 0;
while(shcp>0) {
  extra[visbygk.index[i]-1]++
  shcp--
  i==17 ? i=0 : i++
}

console.log(extra.slice(0, 8))