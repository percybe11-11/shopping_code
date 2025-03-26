
import { products } from "./products.js";



class Cart {

  constructor(storageKey='cartState1'){
    this.storageKey=storageKey;
    this.cart=JSON.parse(localStorage.getItem(this.storageKey)) || [];

    this._patchCart();
  }
  _patchCart(){
      this.cart.forEach(item => {
        if (!item.productPrice) {
          const product = products.find(p => p.id === item.productId);
          if (product) {
            item.productPrice = product.priceCents;
          }
        }
      });
      this._saveCartState()
    };

  _saveCartState(){
    localStorage.setItem(this.storageKey,JSON.stringify(this.cart));
  }

addToCart(productId,matchingItem,quantSelect,productPricing){
    if(matchingItem){
      matchingItem.quantity+=quantSelect;
     }else{
      this.cart.push({quantity:quantSelect,productId:productId,deliveryOptionId:'1',productPrice:productPricing});}
      console.log(this.cart);
      this._saveCartState();
  };

  deleteFromCart(productId){
    const index=this.cart.findIndex((item)=>{
      return item.productId===productId;
    });
    if(index>-1){
      this.cart.splice(index,1)
    };
    this._saveCartState();
  }
  cartDisplayUpdate(cartQuantity,cartDisplay){
    this.cart.forEach((cartItem)=>{
    cartQuantity+=cartItem.quantity;
    cartDisplay.innerText=cartQuantity;
    })
  };

  }




















/*[{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity:2,
},{
  productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity:1,
}];*/