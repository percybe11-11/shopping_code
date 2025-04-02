import { priceCount } from "../Scripts/utils/money.js";

class Product{
  id;
  image;
  name;
  rating;
  priceCents;

 constructor(productDetails){
  this.id=productDetails.id;
  this.image=productDetails.image;
  this.name=productDetails.name;
  this.rating=productDetails.rating;
  this.priceCents=productDetails.priceCents;
 } 
 getStars(){
  return`images/ratings/rating-${this.rating.stars*10}.png`;
 }
 getPricing(){
  return `$${priceCount(this.priceCents)}`;
 }
 extraInfoHTML(){
  return ``; 
}
applianceHTML(){
  return'';
}
}

class Clothing extends Product {
sizeChartLink;

constructor(productDetails){
  super(productDetails);
  this.sizeChartLink=productDetails.sizeChartLink;
}
extraInfoHTML(){
  return `<a href="${this.sizeChartLink}">size chart</a>`; 
}

}

class Appliance extends Product{
  instructionsLink;
  warrantyLink;
  constructor(productDetails){
    super(productDetails);
    this.instructionsLink=productDetails.instructionsLink;
    this.warrantyLink=productDetails.warrantyLink;
  }

  applianceHTML(){
    return `<a href="${this.warrantyLink}" target="blank">warranty details</a>
           <a href="${this.instructionsLink}"target="blank">instructions</a>`;
  }
}

export let products=[];

export async function loadProducts(...callbacks){
  try {
    const response = await fetch('https://supersimplebackend.dev/products');
    if (!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const productDetails=await response.json();
  
  products = productDetails.map((productDetails) => {
    if (productDetails.type === 'clothing') {
      return new Clothing(productDetails);
    } else if (productDetails.type === 'appliance') {
      return new Appliance(productDetails);
    } else {
      return new Product(productDetails);
    }
  });

  callbacks.forEach((callback) => {
    if (typeof callback === "function") {
      callback();
    }
  });
  
  }
  catch (error) {
  console.error("Error loading products:", error);
}
}
// Call the function
loadProducts();

