import {cart,deleteFromCart} from "../data/add-to-cart.js";
import {products} from "../data/products.js";
import {priceCount} from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js" 
import {deliveryOptions} from "../data/deliveryOptions.js"


let cartSummaryHTML='';


cart.forEach((cartItem)=>{
const productID = cartItem.productId;

let matchingItem;

products.forEach((products)=>{
  if (products.id===productID){
    matchingItem=products;
    console.log(matchingItem);
  }
});
cartSummaryHTML+=`<div class="cart-item-container js-cart-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">
 
              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${priceCount(matchingItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id=${matchingItem.id}>
                    Update
                  </span>
                  <input class="quantity-input">
                  <span class="save-quantity-link link-primary js-save-link"data-product-id="${matchingItem.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingItem)}
              </div>
            </div>
          </div>`;   
      
});


function deliveryOptionsHTML(matchingItem){
  let html='';
  deliveryOptions.forEach((option)=>{
   
    const today=dayjs();
    const deliveryDate=today.add(option.days,'days');
    const dateString=deliveryDate.format('dddd, MMMM D');
    const priceString=option.priceCents===0?'free':`$${priceCount(option.priceCents)} - `;

  

  html+=  `<div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    data-delivery-id="${matchingItem.id}"
                    data-datestring-id="${dateString}"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} - Shipping
                    </div>
                  </div>
                </div>`
               
  
  });
  return html;
}


function deliveryOptionSelect(){
  document.querySelectorAll('.delivery-option-input').forEach((input)=>{
    input.addEventListener('click',()=>{
      let deliveryid=input.dataset.deliveryId;
      let datestringid=input.dataset.datestringId;
     const cartSelector=document.querySelector(`.js-cart-${deliveryid}`);
     const cartDateUpdate=cartSelector.querySelector('.delivery-date'); 

     cartDateUpdate.innerHTML=`Delivery date: ${datestringid}`;
    })
  })
  
}

document.querySelector('.js-cart-summary-generator').innerHTML=cartSummaryHTML;
checkoutDisplayHead();
deliveryOptionSelect();

document.querySelectorAll('.js-delete-link').forEach((link)=>{
link.addEventListener('click',()=>{
  const productId=link.dataset.productId;
  deleteFromCart(productId);
  console.log(cart);

  let cartContainer=document.querySelector(`.js-cart-${productId}`);

  cartContainer.remove();
  checkoutDisplayHead();
});
});

document.querySelectorAll('.js-update-link').forEach((link)=>{
  link.addEventListener('click',()=>{
   const productId=link.dataset.productId;
    let cartItemContainer=document.querySelector(`.js-cart-${productId}`);
    cartItemContainer.classList.add('is-editing-quantity');
  })
});

document.querySelectorAll('.js-save-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    let cartItemContainer = document.querySelector(`.js-cart-${productId}`);
    let newQuant = parseInt(link.parentElement.querySelector('.quantity-input').value);

    // Proper find method with return statement
    const updateItem = cart.find((item) => {
      return productId === item.productId;
    });

    if (updateItem && newQuant > 0) {
      updateItem.quantity = newQuant;
      // Update the UI label
      cartItemContainer.querySelector('.quantity-label').innerText = newQuant;
    }

    cartItemContainer.classList.remove('is-editing-quantity');
    checkoutDisplayHead();
  });
});

function checkoutDisplayHead() {
let totalQuantity=0;
cart.forEach((cartItem)=>{
  totalQuantity+=cartItem.quantity;
});
  document.querySelector('.js-checkout-generate').innerText = `${totalQuantity} items`;
}





