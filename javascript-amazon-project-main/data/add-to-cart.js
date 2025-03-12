export const cart=[];

export function addToCart(productId,productPricing,productName,matchingItem,quantSelect){
  if(matchingItem){
    matchingItem.quantity+=quantSelect;
   }else{
    cart.push({productName:productName,productPricing:productPricing,quantity:quantSelect,productId:productId});}
};
