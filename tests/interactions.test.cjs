const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
function setup(reduce=false){
 const handlers={},animations=[];
 const preference={matches:reduce,addEventListener(name,callback){this.change=callback;}};
 const target={animate(){const animation={cancel(){this.cancelled=true;this.oncancel?.();}};animations.push(animation);return animation;}};
 vm.runInNewContext(fs.readFileSync('assets/js/interactions.js','utf8'),{
  window:{matchMedia:()=>preference},
  document:{addEventListener:(name,callback)=>handlers[name]=callback,querySelector:()=>target}
 });
 return {handlers,animations,preference,target};
}
test('save feedback animates when motion is allowed',()=>{
 const s=setup();s.handlers.click({target:{closest:()=>s.target}});assert.equal(s.animations.length,1);
});
test('reduced motion prevents new animations',()=>{
 const s=setup(true);s.handlers.click({target:{closest:()=>s.target}});assert.equal(s.animations.length,0);
});
test('changing reduced motion preference cancels running effects',()=>{
 const s=setup();s.handlers.click({target:{closest:()=>s.target}});s.preference.matches=true;s.preference.change();assert.equal(s.animations[0].cancelled,true);
});
