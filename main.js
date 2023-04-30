var song1 = "";
var song2 = "";

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

leftWristScore = 0;
rightWristScore = 0;

var song1_status = "";
var song2_status = "";

function preload() {
    var song1 = loadSound("music.mp3");
    var song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("Model is Initialized");
}

function gotPoses(error, results) {
    if(results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreLeftWrist + "scoreLeftWrist" + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristX" + rightWristX);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "LeftWristX" + leftWristX);
    }
}

function draw() {
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
if(rightWristScore > 0.2) {
    circle(rightWristX,rightWristY,20);
    song1.stop();
    if(song2_status == false) {
        song2.play();
        document.getElementById("song").innerHTML = "playing - PeterPan song";
    }
}
if(leftWristScore > 0.2) {
    circle(leftWristX,leftWristY,20);
    song2.stop();
    if(song1_status == false) {
        song1.play();
        document.getElementById("song").innerHTML = "playing - HarryPotter theme song";
    }
}
}