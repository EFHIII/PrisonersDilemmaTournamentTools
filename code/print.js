const fs = require("fs");

let view = ['.alwaysCooperate'];


for(let i=2;i<process.argv.length;i++){
  if(i==2){
    view = [];
  }
  view.push(process.argv[i]);
}

console.log(process.argv);

const data = require("./cache.json");

print(data);

function print(data){
  let ans = [];

  for(let n1 in data){
    let newest = data[n1][Object.keys(data[n1]).reduce((a, b) => a > b ? a : b)];
    for(let n2 in newest){
      let round = newest[n2][Object.keys(newest[n2]).reduce((a, b) => a > b ? a : b)];

      round = round.map(a=>typeof a == 'number'?Math.round(a*100)/100:a)

      let has = -1;
      view.map(a=>{
        if(n1.indexOf(a)>=0){has=1}
        if(n2.indexOf(a)>=0){has=0}
      })

      if(has >= 0){
        let txt=[has ?
          `${n1} (${round[0]} +/- ${round[2]}) VS ${n2} (${round[1]} +/- ${round[3]})\n` :
          `${n2} (${round[1]} +/- ${round[3]}) VS ${n1} (${round[0]} +/- ${round[2]})\n`
        ];
        let t = round[4];
        for(let k=0;k<2;k++){
          let tt='';
          for(let j=0;j<t[k].length;j+=2){
            switch(''+t[k][j]+t[k][j+1]){
              case '11':tt+='█';break;
              case '10':tt+='▌';break;
              case '01':tt+='▐';break;
              case '00':tt+=' ';break;
            }
          }
          txt.push('\x1b[41m\x1b[32m'+tt+'\x1b[0m\n');
        }
        ans.push([
          round[has ? 0 : 1],
          txt[0] + (has ? txt[1]+txt[2]:txt[2]+txt[1])
        ]);
      }
    }
  }

  console.log(ans.sort((a,b)=>b[0]-a[0]).map(a=>a[1]).join(''));
  console.log("Winners");
}
