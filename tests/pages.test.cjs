const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const S=require('../assets/js/store.js');
const catalog=JSON.parse(fs.readFileSync('assets/products.json','utf8')).map((p,art)=>({...p,art}));
function boot(page,storage={},query=''){
 const els=new Map(),events={},windowEvents={};
 const element=()=>({innerHTML:'',textContent:'',hidden:false,disabled:false,value:'',dataset:{},handlers:{},classList:{add(){},remove(){}},setAttribute(){},addEventListener(n,f){this.handlers[n]=f;},focus(){}});
 for(const sel of ['#toast',...({'cart':['#cart-content'],'wishlist':['#wishlist-grid'],'checkout':['#checkout-summary','#download-bag'],'shop':['#shop-grid','#search','#sort','#result-count'],'product':['#product-detail']}[page]||[])])els.set(sel,element());
 if(els.has('#sort'))els.get('#sort').value='featured';
 const doc={querySelector:s=>els.get(s)||null,querySelectorAll:()=>[],addEventListener:(n,f)=>events[n]=f};
 const context={window:{NAIL_PRODUCTS:catalog,NailStore:S,addEventListener:(n,f)=>windowEvents[n]=f},document:doc,localStorage:{getItem:k=>storage[k]||null,setItem:(k,v)=>storage[k]=v},URLSearchParams,URL,location:{search:query},setTimeout:()=>1,clearTimeout(){},console};
 vm.runInNewContext(fs.readFileSync('assets/js/app.js','utf8'),context);
 return {els,events,windowEvents,storage};
}
const line={id:catalog[0].id,shape:'Almond',finish:'Glossy',size:'M',quantity:1};
test('cart renders empty state for corrupt storage',()=>{
 const {els}=boot('cart',{nailaura_cart:'{broken'});assert.match(els.get('#cart-content').innerHTML,/Your bag is empty/);
});
test('cart normalizes price and allows quantity updates',()=>{
 const state=boot('cart',{nailaura_cart:JSON.stringify([{...line,price:1}])});
 assert.match(state.els.get('#cart-content').innerHTML,/₹1,448/);
 const btn={dataset:{qty:'0',delta:'1'}};
 state.events.click({target:{closest:s=>s==='[data-qty]'?btn:null}});
 assert.match(state.els.get('#cart-content').innerHTML,/₹2,598/);
 assert.equal(JSON.parse(state.storage.nailaura_cart)[0].quantity,2);
});
test('wishlist ignores unknown product ids',()=>{
 const {els}=boot('wishlist',{nailaura_wishlist:'["unknown"]'});assert.match(els.get('#wishlist-grid').innerHTML,/Your love list is waiting/);
});
test('checkout never claims order placement and disables empty download',()=>{
 const empty=boot('checkout');assert.equal(empty.els.get('#download-bag').disabled,true);
 const full=boot('checkout',{nailaura_cart:JSON.stringify([line])});assert.equal(full.els.get('#download-bag').disabled,false);assert.match(full.els.get('#checkout-summary').innerHTML,/Total estimate/);
});
test('shop search updates results and has a recovery link',()=>{
 const {els}=boot('shop');assert.match(els.get('#result-count').textContent,/8 designs/);
 const search=els.get('#search');search.value='lavender';search.handlers.input();assert.match(els.get('#result-count').textContent,/1 design/);assert.match(els.get('#shop-grid').innerHTML,/Lavender Bloom/);
 search.value='no matching product';search.handlers.input();assert.match(els.get('#shop-grid').innerHTML,/Reset filters/);
});
test('unknown product gives recovery instead of wrong product',()=>{
 const {els}=boot('product',{},'?id=unknown');assert.match(els.get('#product-detail').innerHTML,/This design has slipped away/);
});
