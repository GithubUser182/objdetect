img=""
status=""
objects= []

function preload(){
    img=loadImage("bed.jpg")
}

function setup(){
    canvas=createCanvas(918,589)
    canvas.center()
    objectDetector=ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML="Status: Detecting Objects."
}

function modelLoaded(){
    console.log("Model Loaded!")
    status=true
    objectDetector.detect(img,gotResults)
}

function gotResults(error, results){
    if(error){
        console.error(error)
    }else{
        console.log(results)
        objects=results
    }
}

function draw(){
    image(img,0,0,918,589)
    if(status != ""){
        for ( i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status: Detected Objects!"
            document.getElementById("num_objects").innerHTML="Nuber of objects =" + objects.length
    
            fill("blue")
            percent=floor(objects[i].confidence*100)
            text(objects[i].label+" "+percent+"% ",objects[i].x+15,objects[i].y+15)
            noFill()
            stroke("red")
            rect(objects[i].x ,objects[i].y ,objects[i].width ,objects[i].height)
        }
    }

    /*fill("red")
    text("Dog",45,75)
    noFill()
    stroke("red")
    rect(30,60,450,350)*/
}

function goHome(){
    window.location="index.html"
}