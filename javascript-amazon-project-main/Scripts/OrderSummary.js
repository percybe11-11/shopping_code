import {cart} from "../data/add-to-cart.js";
import { deliveryOptions } from "../data/deliveryOptions.js";


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
  document.querySelector('.payment').innerText=`$${(totalPrice / 100).toFixed(2)}`;
  osTotal();
}

export function shippingHandling(total){
  console.log(`here:`,total);
  const innerTextSummary = document.querySelector('.js-shipping-total');
  innerTextSummary.innerText = `$${total.toFixed(2)}`;
  console.log('come here'+total);
  osTotal();
}
  
function osTotal(){
  let tax=10;
  let final=0;
  let finalT=0;
  let totalT=0;
  const itemTotal = parseFloat(document.querySelector('.payment').innerText.replace('$', '')) || 0;
  const shipping = parseFloat(document.querySelector('.js-shipping-total').innerText.replace('$', '')) || 0;

  if (itemTotal+shipping>20){
   totalT=(itemTotal+shipping)*tax/100;
   final=itemTotal+shipping;
   finalT=itemTotal+shipping+totalT;


  } else {
    final=itemTotal+shipping;
    finalT=final;
    totalT=0;

  }
  document.querySelector('.js-money-beforeT').innerText = `$${final.toFixed(2)}`;
  document.querySelector('.js-tax').innerText = `$${totalT.toFixed(2)}`;
  document.querySelector('.js-f-t').innerText=`$${(finalT).toFixed(2)}`;
}



