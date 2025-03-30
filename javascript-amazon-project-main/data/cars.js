export class Car{
  brand;
  model;
  speed=0;
  trunkOpen;
 constructor(carDetails){
  this.brand=carDetails.brand;
  this.model=carDetails.model;
  this.speed=0;
  this.trunkOpen=carDetails.trunkOpen;
 } 

 displayInfo(){
  return `Brand:${this.brand} Car:${this.model}`
 }

 carSpeed(){
if (this.speed>200){
  return this.speed=200;
}};

go(){
  if(this.trunkOpen){
    return;
  }
    else{
  return this.speed+=5;
}};

applyBreak(){
  return this.speed-=5;
}

openTrunk(){
  if (this.speed>0){
    return console.log(`${!this.trunkOpen}`);
  } else {
    return this.trunkOpen;
  }
}
};

class RaceCar extends Car{
  acceleration;

 constructor(carDetails){
  super(carDetails);
  this.acceleration=carDetails.acceleration;
 } 

go(){
  if(this.acceleration){
    return this.speed+=this.acceleration;
  }
}
openTrunk(){
  return;
}

}


const carData= [{brand:'Toyota',
  model:'Corolla',trunkOpen:true,},{brand:'Tesla',
    model:'Model T', trunkOpen:false},{brand:'Mclaren',model:'f1',acceleration:20}];

const cars=carData.map((carDetails)=>
 carDetails.acceleration ? new RaceCar(carDetails) : new Car(carDetails)
);








