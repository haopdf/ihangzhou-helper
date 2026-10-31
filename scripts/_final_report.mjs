import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';

const COLUMNS = [
  '/banshi.html', '/traffic.html', '/food.html', '/celebrity.html',
  '/history.html', '/internet.html', '/zhaopin.html', '/street.html',
  '/weekend.html', '/museum.html', '/coffee.html',
];
const SUB_COLUMNS = [
  '/laozihao.html?id=louwailou', '/museum.html?id=zhemo', '/coffee.html?id=xiezilou',
  '/coffee.html?id=qinzhaizi', '/chaguan.html?id=chayaun', '/dessert.html?id=dingshenggao',
  '/dessert.html?id=tiaotougao', '/guzhen.html?id=tangqi', '/guzhen.html?id=wuzhen',
  '/guzhen.html?id=nanxun', '/breakfast.html?id=banmian', '/breakfast.html?id=shengjian',
  '/breakfast.html?id=xiaolongbao', '/breakfast.html?id=youdonger', '/breakfast.html?id=congbao',
  '/tushuguan.html?id=hangzhoushilib', '/xiangxiang.html?id=bai)', '/story.html?id=baishezhuan',
  '/intangible.html?id=xilingyinsh', '/hangbang.html?id=hol',
];

async function measure(ctx,url){
  const pg=await ctx.newPage();
  await pg.goto(BASE+url,{waitUntil:'networkidle',timeout:15000});
  await pg.waitForTimeout(1800);
  const r=await pg.evaluate(()=>{
    // hero
    const hero=document.querySelector('.ch-hero,.p-hero,.cat-hero,.travel-hero,.place-hero,.td-hero,.zb-hero,.art-hero,.page-hero');
    let hx=null;
    if(hero){const t=hero.querySelector('h1,.p-hero-title,.ch-badge,.ch-hero h2');if(t){hx=Math.round(t.getBoundingClientRect().left);}}
    // content - 多回路选择
    let cx=null;
    const dc=document.getElementById('detailContent');
    for(const sel of ['#serviceGrid a','#serviceGrid .sitem','.p-cards a','.p-cards .p-card','#detailContent .p-section','#detailContent .p-hist','#detailContent .p-name-h','#detailContent .p-name-h2','#detailContent h1','#detailContent h2','#detailContent .mu-cr','#detailContent .card','#bfModules a','.cat-block a','#zmContainer a','#zmContainer .p-card','#coffeeContent .p-section','#coffeeContent .p-name','#scenicContent .p-section','#scenicContent img']){
      const el=document.querySelector(sel);
      if(el){cx=Math.round(el.getBoundingClientRect().left);break;}}
    if(!cx&&dc){const h=dc.querySelector('h1,h2,.p-hist,.p-name-h,.mu-cr');if(h){cx=Math.round(h.getBoundingClientRect().left);}}
    return {hx,cx,url:location.href};
  });
  await pg.close();
  return r;
}

const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:1440,height:900}});

console.log('\n=== 栏目页 (columns) ===');
let cp=0,cf=0;
for(const u of COLUMNS){
  const r=await measure(ctx,u);
  const diff=(r.hx&&r.cx)?Math.abs(r.hx-r.cx):null;
  const st=diff===null?'(无层级)':diff<=3?'✅':'❌ D'+diff;
  if(diff!==null&&diff<=3)cp++;else if(diff!==null)cf++;
  console.log('  '+u.padEnd(24),'hx='+(r.hx??'-'),'cx='+(r.cx??'-'),st);
}

console.log('\n=== 子栏目详情页 (sub-columns) ===');
let sp=0,sf=0,sna=0;
const sfail=[];
for(const u of SUB_COLUMNS){
  const r=await measure(ctx,u);
  const diff=(r.hx&&r.cx)?Math.abs(r.hx-r.cx):null;
  let st;
  if(diff===null){sna++;(r.cx||r.hx)?st='(静态详情渲染)':st='(空)';}
  else if(diff<=3){sp++;st='✅';}
  else{sf++;st='❌ D'+diff;sfail.push(u);}
  console.log('  '+u.padEnd(40),'hx='+(r.hx??'-'),'cx='+(r.cx??'-'),st);
}

await b.close();
console.log('\n========================================');
console.log('栏目页: '+cp+' ✅ / '+cf+' ❌ / '+COLUMNS.length+' 总');
console.log('子栏目: '+sp+' ✅ / '+sf+' ❌ / '+sna+' 空 / '+SUB_COLUMNS.length+' 总');
if(sfail.length)console.log('  异常:',sfail);
console.log('========================================');
