


// select our play button

const playButton = document.querySelector('button');

playButton.addEventListener('click', function() {

    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
        audioElement.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audioElement.pause();
        this.dataset.playing = 'false';
    }

}, false);




////////////////// CREATE AUDIO CONTEXT //////////////////////////

const audioContext = new AudioContext();
// get the audio element
const audioElement = document.querySelector('audio');
// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);
        

  

//GAIN NODE - to be made into a boost pedal?

const gainNode = audioContext.createGain();

const volumeControl = document.querySelector('#volume');

volumeControl.addEventListener('input', function() {
    gainNode.gain.value = this.value;
}, false);




/////////////////////////   DISTORTION    ///////////////////////////////


//Create new distortion node
const distortionNode = audioContext.createWaveShaper();

//grab distortion pedal buttons
const distortionButton = document.querySelector('#distortionButton');
const distortionTone = document.querySelector('#distortionTone');

//add the event listeners to run the distortion function
distortionButton.addEventListener('click', distortionOn);



// this function sets the actual amount of distortion to be applied
function makeDistortionCurve(amount) {
    
    let n_samples = 100, curve = new Float32Array(n_samples);
    for (let i = 0 ; i < n_samples; ++i ) {
        let x = i * 2 / n_samples - 1;
        curve[i] = (Math.PI + amount) * x / (Math.PI + amount * Math.abs(x));
    }
    return curve;
} 



// turns on and off the distortion 
function distortionOn() {

if(!distortionNode.curve) {  //this will initially be true
     
    distortionNode.curve = makeDistortionCurve(200);    //use this param for distortion amount - figure out how to access through
    distortionNode.oversample = 'none';                 // the DOM's div class "Tone" 

} else if (distortionNode.curve) {

    distortionNode.curve = null;
    distortionNode.oversample = 'none';
 }
}



/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////   TREMOLO    ///////////////////////////////






/////////////////////////   REVERB   ///////////////////////////////




/////////////////////////   This is the chain that connects it all together   ///////////////////////////////

track.connect(distortionNode).connect(gainNode).connect(audioContext.destination);