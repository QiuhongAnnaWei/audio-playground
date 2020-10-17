/*
The MIT License (MIT)

Copyright (c) 2014 Chris Wilson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var fileaddress = null;
var audioContext = null;
var meter = null;
var canvasContext = null;
var WIDTH=500;
var HEIGHT=50;
var rafID = null;
var mediaStreamSource = null;
$(document).ready(function(){
    $("#form-to-be-submitted").click(function(){
        //$(".whatever-styling-you-want").html($("#textBox").val());
        fileaddress = $("#fileaddress").val();
        console.log(fileaddress)
        audioContext = new AudioContext();

        //window.AudioContext = window.AudioContext || window.webkitAudioContext;

        var audio = new Audio(fileaddress);
        audio.controls = true;
        audio.autoplay = false;
        audio.crossOrigin = 'anonymous';
        document.body.appendChild(audio);
        
        mediaStreamSource = audioContext.createMediaElementSource(audio);

        meter = createAudioMeter(audioContext);
        mediaStreamSource.connect(meter);

        canvasContext = document.getElementById( "meter" ).getContext("2d");
        drawLoop();


    });
});




// https://stackoverflow.com/questions/26263132/programatically-record-audio-output-from-web-page-using-js-or-html5

//https://stackoverflow.com/questions/14074833/using-local-file-for-web-audio-api-in-javascript

// https://stackoverflow.com/questions/52263471/how-to-create-a-mediastream-from-a-uploaded-audio-file-or-a-audio-file-url-using

// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSRequestNotHttp
// https://dev.to/dengel29/loading-local-files-in-firefox-and-chrome-m9f (about:config)

window.onload = function() {

    // grab our canvas
	//canvasContext = document.getElementById( "meter" ).getContext("2d");
	
    // monkeypatch Web Audio
    //window.AudioContext = window.AudioContext || window.webkitAudioContext;
	
    // grab an audio context
    //audioContext = new AudioContext();

    // Attempt to get audio input
    try {
        // monkeypatch getUserMedia
        // navigator.getUserMedia = 
        // 	navigator.getUserMedia ||
        // 	navigator.webkitGetUserMedia ||
        // 	navigator.mozGetUserMedia;

        // // ask for an audio input
        // navigator.getUserMedia(
        // {
        //     "audio": {
        //         "mandatory": {
        //             "googEchoCancellation": "false",
        //             "googAutoGainControl": "false",
        //             "googNoiseSuppression": "false",
        //             "googHighpassFilter": "false"
        //         },
        //         "optional": []
        //     },
        // }, gotStream, didntGetStream);

        //gotStream(audio)

    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }

}
function didntGetStream() {
    alert('Stream generation failed.');
}

//var mediaStreamSource = null;
// function gotStream(stream) {
//     // Create an AudioNode from the stream.
//     //mediaStreamSource = audioContext.createMediaStreamSource(stream);
//     mediaStreamSource = audioContext.createMediaElementSource(audio);

//     // Create a new volume meter and connect it.
//     meter = createAudioMeter(audioContext);
//     mediaStreamSource.connect(meter);

//     // kick off the visual updating
//     drawLoop();
// }

function drawLoop( time ) {
    // clear the background
    canvasContext.clearRect(0,0,WIDTH,HEIGHT);

    // check if we're currently clipping
    if (meter.checkClipping())
        canvasContext.fillStyle = "red";
    else
        canvasContext.fillStyle = "green";

    // draw a bar based on the current volume
    canvasContext.fillRect(0, 0, meter.volume*WIDTH*1.4, HEIGHT);

    // set up the next visual callback
    rafID = window.requestAnimationFrame( drawLoop );
}
