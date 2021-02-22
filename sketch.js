var dog, dogImg, hdogImg
var database;
var foodS,foodStock;
var feed, addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
  dogImg = loadImage("dogImg.png");
  hdogImg = loadImage("dogImg1.png");
  
}

function setup() {
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
 
	createCanvas(800, 700);
  dog = createSprite(400,550);
  dog.addImage(dogImg);

  foodObj = new Food();
 
  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  fedTime=database.ref('fedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
}


function draw() {

  background(0,120,70);
  dog.scale=0.4;

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

fill(255);
textSize(15);
if(lastFed>=12){
  text("Last Fed : "+ lastFed%12 + "PM", 350,30);
}else if(lastFed==0){
  text("Last Fed : 12 AM",350,30);
}else{
  text("Last Fed : "+ lastFed + "AM", 350,30);
}
foodObj.display();
  drawSprites();
 
//text("Milk Left : "+foodS,250,50);

}






function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(hdogImg);

  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
    
    
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


