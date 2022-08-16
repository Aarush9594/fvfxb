function setup() {
  canvas = createCanvas(500,300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet",modelloaded)
}

function modelloaded() {
  console.log("MobileNet model is loaded")
}

previouse_result = "";

function draw() {
   image(video,0,0,500,300)
   classifier.classify(video,gotresult)
   
}

function gotresult(error,result) {
  if (error) {
    console.error(error)
  } 
  else{
    if ((result[0].confidence>=0.5 ) && (previouse_result!=result[0].label)) {
       console.log(result)
       previouse_result = result[0].label
       document.getElementById("result_object_name").innerHTML =result[0].label;
       document.getElementById("result_object_accuracy").innerHTML =Math.round(result[0].confidence*100)+'%';
    }
  }
}


