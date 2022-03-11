<<<<<<< HEAD



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
// get the audio element (sample song)
const audioElement = document.querySelector('audio');
// pass sample song into the audio context so we have access through "track"
const track = audioContext.createMediaElementSource(audioElement);
        

  

//GAIN NODE - to be made into a boost pedal?

const gainNode = audioContext.createGain();
const volumeControl = document.querySelector('#volume');

// grab volume range on DOM and target and change value
volumeControl.addEventListener('input', function(event) {
 const target = event.target   //target is on volumeControl
gainNode.gain.value = target.value; 
});




/////////////////////////   DISTORTION    ///////////////////////////////




//Create new distortion node
const distortionNode = audioContext.createWaveShaper();

//grab distortion pedal buttons
const ledLightOff = document.querySelector('#ledLightOff');
const distortionOnSwitch = document.querySelector('#distortionOnSwitch');
const distortionTone = document.querySelector('#distortionTone');

//add the event listeners to run the distortion functions
distortionOnSwitch.addEventListener('click', handleDistortionOnOff); //can put in variables if needed?


let distortionActive = false;  
// turns on and off the distortion 
function handleDistortionOnOff() {



    if (distortionActive == false) {
    //accesses the value of the DISTORTION TONE slider
    //switches pedal ON at whatever tone slider is set at
    const distortionValue = distortionTone.value;
    distortionNode.curve = makeDistortionCurve(distortionValue); 
    //console.log(distortionValue);
    distortionActive = true; 
    //console.log("active turned to true");
    //grabs the DISTORTION TONE slider
    distortionTone.addEventListener('input', handleDistortionAmount);

    //targets the value of the DISTORTION TONE slider and changes it
    function handleDistortionAmount(event) {

        const target = event.target; //grabs the value of the event on the distortionTone event listener
        const value = target.value;  //puts value of target into variable to use

        distortionNode.curve = makeDistortionCurve(parseInt(value));
   } // end handleDistAmount func
} //end if statement 
else if (distortionActive == true) {

    //turn pedal off
   distortionActive = false;
   console.log("active turned to false");
   distortionNode.curve = makeDistortionCurve(0);
    //const distortionOutput ='.connect(distortionNode)';

   // distortionOutput ='';

}



    //turns the LED light on/off
    if (ledLightOff.id == 'ledLightOff') {
        ledLightOff.id = 'ledLightOn';
    } else {
        ledLightOff.id = 'ledLightOff';
    }


} // end handleDistortionOn func






// this function sets the actual amount of distortion to be applied
function makeDistortionCurve(amount) {
    
    let n_samples = 100, curve = new Float32Array(n_samples);
    for (let i = 0 ; i < n_samples; ++i ) {
        let x = i * 2 / n_samples - 1;
        curve[i] = (Math.PI + amount) * x / (Math.PI + amount * Math.abs(x));
    }
    return curve;
} 

/////////////////////////////////////////////////////////////////////////////////////////////////








/////////////////////////   REVERB   ///////////////////////////////




/////////////////////////   This is the chain that connects it all together   ///////////////////////////////

track.connect(distortionNode);
distortionNode.connect(gainNode);
gainNode.connect(audioContext.destination);


track.connect(distortionNode).connect(gainNode).connect(audioContext.destination);

//${distortionOutput}
=======



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
>>>>>>> 4408848e9adb988838a0c9131dff0d90ca7af3c6
