import { products } from "./products.js";

export let cart=JSON.parse(localStorage.getItem('cartState1'));


if(!cart){
  cart=[];
} else {
  // 🔥 PATCH: Fix legacy items missing productPrice
  cart.forEach(item => {
    if (!item.productPrice) {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        item.productPrice = product.priceCents;
      }
    }
  });
};

/*[{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity:2,
},{
  productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity:1,
}];*/

export function saveCartState(cart){
localStorage.setItem('cartState1',JSON.stringify(cart));}

export function addToCart(productId,matchingItem,quantSelect,productPricing){
  if(matchingItem){
    matchingItem.quantity+=quantSelect;
   }else{
    cart.push({quantity:quantSelect,productId:productId,deliveryOptionId:'1',productPrice:productPricing});}
    console.log(cart);
    saveCartState(cart);
};


export function deleteFromCart(productId){
  const index=cart.findIndex((item)=>{
    return item.productId===productId;
  });
  if(index>-1){
    cart.splice(index,1)
  };
  saveCartState(cart);
}

export function cartDisplayUpdate(cartQuantity,cartDisplay){
  cart.forEach((cartItem)=>{
  cartQuantity+=cartItem.quantity;
  cartDisplay.innerText=cartQuantity;
  })
};
