song1 = "";
song2 = "";
song1Status = "";
song2Status = "";

leftWristScore = 0;
rightWristScore = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
    song1 = loadSound("music1.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO)
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded); //Start
    poseNet.on('pose', gotPoses); // Put into effect
}

function modelLoaded() {
    console.log("PoseNet is Initiallized");
}

function gotPoses(results) {
    if (results.lenght > 0) {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY );
        console.log("Right Wrist X = " + rightWristX + "Right Wrist Y = " + rightWristY );

        leftWristScore = results[0].score.keypoints[9];
        rightWristScore = results[0].score.keypoints[10];

    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    song1Status = song1.isPlaying();
    song2Status = song2.isPlaying();
    fill("red");
    stroke("yellow");

    if(rightWristScore > 0.2){
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if (song2Status == false) {
            song2.play();
            document.getElementById("music2-tag").innerHTML = "Inspiring Tunes: Playing";
        }
        
    }
    if (leftWristScore > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if (song1Status == false) {
            song1.play();
            document.getElementById("music1-tag").innerHTML = "Orchestra Music: Playing";
        }  
    }
}

function play() {
    //song1.play();
    //song2.play();
    song.play();

    //song1.setVolume(1);
    //song1.rate(1);
    //song2.setVolume(1);
    //song2.rate(1);
    song.setVolume(1);
    song.rate(1);
}

