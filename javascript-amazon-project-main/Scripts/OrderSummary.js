import {cart} from "../data/add-to-cart.js";

export function summaryItemsDisplay(){
  let summaryDisplay=0;
  cart.forEach((cartItem)=>{
    summaryDisplay+=cartItem.quantity;
  })
document.querySelector('.js-total-item-display').innerText=`Items (${summaryDisplay})`;
};

export function orderSummaryTotal(){
  let totalPrice=0;
  cart.forEach((cartItem)=>{
    totalPrice+=cartItem.quantity*cartItem.productPrice;
  })
  document.querySelector('.payment-summary-money').innerText=`$${(totalPrice / 100).toFixed(2)}`;
}

console.log(cart);