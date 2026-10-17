(function(root){
 'use strict';
 const sizes=['XS','S','M','L','Custom'];
 const readArray=value=>{try{const a=JSON.parse(value);return Array.isArray(a)?a:[];}catch{return [];}};
 function normalizeCart(items,products){
  return items.flatMap(item=>{
   if(!item||!Number.isInteger(item.quantity)||item.quantity<1)return [];
   const p=products.find(p=>p.id===item.id);if(!p)return [];
   return [{id:p.id,price:p.price,name:p.name,quantity:Math.min(item.quantity,20),shape:p.shapes.includes(item.shape)?item.shape:p.shapes[0],finish:p.finishes.includes(item.finish)?item.finish:p.finishes[0],size:sizes.includes(item.size)?item.size:'M',measurements:typeof item.measurements==='string'?item.measurements.slice(0,100):''}];
  });
 }
 function totals(cart){const subtotal=cart.reduce((n,p)=>n+p.price*p.quantity,0);const shipping=subtotal&&subtotal<1999?149:0;return {subtotal,shipping,total:subtotal+shipping};}
 function addItem(cart,item){const next=cart.map(x=>({...x}));const match=next.find(x=>['id','shape','finish','size','measurements'].every(k=>(x[k]||'')===(item[k]||'')));if(match)match.quantity=Math.min(20,match.quantity+item.quantity);else next.push({...item});return next;}
 const api={readArray,normalizeCart,totals,addItem};if(typeof module!=='undefined')module.exports=api;else root.NailStore=api;
})(globalThis);
