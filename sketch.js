var database ,dog,dog1,dog2
var position
//var form
var feed,add
var foodobject
var Feedtime
var Lastfeed, foodStockImg, fs;
var player;
//Create variables here

function preload()

{
  dogimg1 = loadImage("images/dog1.png")
  dogimg2 = loadImage("images/HappyDog.png");
  foodStockImg = loadImage("images/FoodStock.png");
  bg = loadImage("images/bg.jpg");
  plate=loadImage("images/milk1.png");
  bot=loadImage("images/bottle.png");

  //load images here
  
}

function setup() {
	createCanvas(700, 700);
  database = firebase.database();
  //console.log(mouseX);
 
  foodobject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2

  fs = createSprite(170, 50, 20, 20);
  fs.addImage(foodStockImg);
  fs.scale = 0.1

  

  bottle = createSprite(450,270);
  bottle.addImage(bot);
  bottle.scale=0.12
  bottle.visible=false;

  bowl = createSprite(502,300);
  bowl.addImage(plate);
  bowl.scale=0.030
  bowl.visible=false;
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
  feed = createButton("Feed Bella milk")
  feed.position(600,100)
  feed.mousePressed(FeedDog)
  add = createButton("Add Food")
  add.position(400,100)
  add.mousePressed(AddFood)


} 

function draw(){
 background(bg);

 foodobject.display()
 
 drawSprites();
  
 fill("blue");
 textSize(20);
 
 

 fedtime=database.ref('FeedTime')
 fedtime.on("value",function(data){ Lastfeed=data.val(); });
 if(Lastfeed>=12)
 {
   text("Last Fed : " + Lastfeed%12 + " PM", 400,65);
 }else if(Lastfeed ===0 )
 {
   text("Last Fed : 12 AM" , 400,65)
 }else
 {
   text("Last Fed : " + Lastfeed + " AM", 400,65);
 }
 

drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dog.addImage(dogimg2)

foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
   
   
 })
 bowl.visible=true;
 bottle.visible=true;
}