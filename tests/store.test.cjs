const {test}=require('node:test');
const assert=require('node:assert/strict');
const S=require('../assets/js/store.js');
const products=[{id:'a',price:1299,shapes:['Almond'],finishes:['Glossy']}];
test('empty bag has no shipping charge',()=>assert.deepEqual(S.totals([]),{subtotal:0,shipping:0,total:0}));
test('shipping threshold and quantities',()=>{
 assert.equal(S.totals([{price:1299,quantity:1}]).total,1448);
 assert.equal(S.totals([{price:1299,quantity:2}]).total,2598);
});
test('stored data cannot supply prices or unknown products',()=>{
 const cart=S.normalizeCart([{id:'a',price:1,quantity:2,shape:'Almond',finish:'Glossy',size:'M'},{id:'bad',quantity:5}],products);
 assert.equal(cart.length,1); assert.equal(cart[0].price,1299);
});
test('invalid storage is safely discarded',()=>{
 assert.deepEqual(S.readArray('{bad'),[]);
 assert.deepEqual(S.readArray('{}'),[]);
 assert.deepEqual(S.normalizeCart([null,{id:'a',quantity:-1}],products),[]);
});
test('variants merge only when selections match',()=>{
 const item={id:'a',price:1299,shape:'Almond',finish:'Glossy',size:'M',quantity:1};
 let cart=S.addItem([],item);cart=S.addItem(cart,item);assert.equal(cart[0].quantity,2);
 cart=S.addItem(cart,{...item,size:'S'});assert.equal(cart.length,2);
});
