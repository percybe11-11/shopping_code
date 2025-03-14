import {cart, addToCart} from '../data/add-to-cart.js';
import {products} from '../data/products.js';

let productHTML='';
products.forEach((products)=>{
productHTML+=`<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${products.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${products.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${products.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${products.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(products.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select id="select">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-name="${products.name}" 
          data-product-id="${products.id}"
          data-product-price="${(products.priceCents/100).toFixed(2)}">
            Add to Cart
          </button>
        </div>`})

document.querySelector('.product-grid-JSgenerator').innerHTML=productHTML;


function addedDisplay(message){
  message.style.opacity='1';
  message.style.transition='opacity 0.5s ease-in-out';
  setTimeout(()=>{
    message.style.opacity=0;
    },2000)
  };

  function cartDisplayUpdate(cartDisplay,cartQuantity){
    cartDisplay.innerText=cartQuantity;
    };

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener('click',()=>{
     let productId=button.dataset.productId;
     let productName=button.dataset.productName;
      let productPricing=parseFloat(button.dataset.productPrice);

      let matchingItem=cart.find((item)=>item.productId===productId); 

      let quantSelect=parseInt(button.parentElement.querySelector('select').value);

      let message=button.parentElement.querySelector('.added-to-cart');

      let cartDisplay=document.querySelector('.cart-quantity');

      addToCart(productId,matchingItem,quantSelect);

      addedDisplay(message);

        let cartQuantity=0;
        cart.forEach((item)=>{
        cartQuantity+=item.quantity;
        cartDisplayUpdate(cartDisplay,cartQuantity);
        })
        cartDisplayUpdate(cartDisplay,cartQuantity);
        
    })
  });


  


 

 
  
      


