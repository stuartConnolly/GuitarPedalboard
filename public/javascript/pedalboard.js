
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
        

// /////////////////////////   MASTER VOLUME    ///////////////////////////////

const gainNode = audioContext.createGain();
const volumeControl = document.querySelector('#volume');

// grab volume range on DOM and target and change value
volumeControl.addEventListener('input', function(event) {
 const target = event.target   //target is on volumeControl
gainNode.gain.value = target.value; 
});



///////////////////////////   Boost    ///////////////////////////////

const boostNode = audioContext.createGain();

//grab boost pedal buttons
const boostOnSwitch = document.querySelector('#boostOnSwitch');
const boostLedLight = document.querySelector('#boostLedLight');
const boostVolume = document.querySelector('#boostVolume');
//const boostTone = document.querySelector('#boostTone');

//add the event listeners to run the distortion functions
boostOnSwitch.addEventListener('click', handleBoostOnOff); 

let boostActive = false;
function handleBoostOnOff() {

    //if false == when turning pedal on
if (boostActive == false) {

    const boostValue = boostVolume.value;
    boostNode.gain.value = boostValue;
    boostActive = true;

    //grabs the BOOST VOLUME slider
    boostVolume.addEventListener('input', handleBoostAmount);

    //targets the value of the DISTORTION TONE slider and changes it
    function handleBoostAmount(event) {
        if (boostActive == true) {
            const target = event.target; //grabs the value of the event on the distortionTone event listener
            const value = target.value;  //puts value of target into variable to use
            boostNode.gain.value = value;
        } else if (boostActive == false) {
            boostNode.gain.value = 2;

        } //end if statement
    } // end handleBoostAmount func
} //end if statement 

//if true == when turning pedal off
else if (boostActive == true) {

    boostActive = false;
    boostNode.gain.value = 2; //the default min setting.
} // end else statement
 

    //turns the LED light on/off
    if (boostLedLight.className == 'ledLightOff') {
        boostLedLight.className = 'ledLightOn';
    } else {
        boostLedLight.className = 'ledLightOff';
    }
} // end func



/////////////////////////   DISTORTION    ///////////////////////////////


//Create new distortion node
const distortionNode = audioContext.createWaveShaper();

//grab distortion pedal buttons
const distortionLedLight = document.querySelector('#distortionLedLight');
const distortionOnSwitch = document.querySelector('#distortionOnSwitch');
const distortionTone = document.querySelector('#distortionTone');

//add the event listeners to run the distortion functions
distortionOnSwitch.addEventListener('click', handleDistortionOnOff); 


let distortionActive = false;  
// turns on and off the distortion 
function handleDistortionOnOff() {
    //checks if pedal is turned on
    if (distortionActive == false) {

    //accesses the value of the DISTORTION TONE slider
    const distortionValue = distortionTone.value;
    distortionNode.curve = makeDistortionCurve(distortionValue); 

    ///switches pedal ON at whatever value tone slider is set at
    distortionActive = true; 

    //grabs the DISTORTION TONE slider
    distortionTone.addEventListener('input', handleDistortionAmount);

    //targets the value of the DISTORTION TONE slider and changes it
    function handleDistortionAmount(event) {
        if (distortionActive == true) {
            const target = event.target; //grabs the value of the event on the distortionTone event listener
            const value = target.value;  //puts value of target into variable to use
            distortionNode.curve = makeDistortionCurve(parseInt(value));
        } else if (distortionActive == false) {
            distortionNode.curve = makeDistortionCurve(0); 
        } //end if statement
    } // end handleDistAmount func
} //end if statement 
else if (distortionActive == true) {

    //turn pedal off
   distortionActive = false;
   distortionNode.curve = makeDistortionCurve(0);
}
    //turns the LED light on/off
    if (distortionLedLight.className == 'ledLightOff') {
        distortionLedLight.className = 'ledLightOn';
    } else {
        distortionLedLight.className = 'ledLightOff';
    }


} // end handleDistortionOn func


// this function sets the actual amount of distortion to be applied
function makeDistortionCurve(amount) {
    var k = typeof amount === 'number' ? amount : 50,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x;
    for (; i < n_samples; ++i) {
      x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

/////////////////////////////////////////////////////////////////////////////////////////////////





/////////////////////////   REVERB   ///////////////////////////////


//grab reverb pedal buttons
const reverbOnSwitch = document.querySelector('#reverbOnSwitch');
const reverbLedLight = document.querySelector('#reverbLedLight');
const reverbTone = document.querySelector('#reverbTone');

//add the event listeners to run the reverb functions
reverbOnSwitch.addEventListener('click', handleReverbOnOff); 

const reverbNode = new ConvolverNode(audioContext);
let reverbActive = false;

function handleReverbOnOff() {

if (reverbActive == false) {

    fetch('/javascript/reverb.mp3')
    .then(response => response.arrayBuffer())
    .then(buffer => {
      audioContext.decodeAudioData(buffer, decoded => {
          reverbNode.buffer = decoded;

    })
    .catch((err) => console.error(err));
  });
  
  track.connect(reverbNode).connect(audioContext.destination);
  reverbActive = true;

} else if (reverbActive == true) {

    track.disconnect(reverbNode);
    reverbActive = false;
} 

    //turns the LED light on/off
    if (reverbLedLight.className == 'ledLightOff') {
        reverbLedLight.className = 'ledLightOn';
    } else {
        reverbLedLight.className = 'ledLightOff';
    }

} // end handle reverb func



/////////////////////////   TREMOLO   ///////////////////////////////


// //grab tremolo pedal buttons
// const tremoloOnSwitch = document.querySelector('#tremoloOnSwitch');
// const tremoloLedLight = document.querySelector('#tremoloLedLight');
// const tremoloTone = document.querySelector('#tremoloTone');

// //add the event listeners to run the reverb functions
// tremoloOnSwitch.addEventListener('click', handleTremoloOnOff); 


// let tremoloActive = false;
// const tremoloNode = new tuna.Tremolo({
//     rate: 1.5,
//     feedback: 0.2,
//     delay: 0.0045,
//     bypass: 0
// })



// function handleTremoloOnOff() {

// //INSERT CODE HERE

//     //turns the LED light on/off
//     if (tremoloLedLight.className == 'ledLightOff') {
//         tremoloLedLight.className = 'ledLightOn';
//     } else {
//         tremoloLedLight.className = 'ledLightOff';
//     }


// } // end handle tremolo func







/////////////////////////   This is the chain that connects it all together   ///////////////////////////////

// track.connect(distortionNode);
// distortionNode.connect(gainNode);
// gainNode.connect(audioContext.destination);


track.connect(gainNode).connect(boostNode).connect(distortionNode).connect(audioContext.destination);

//track.connect(tremoloNode).connect(audioContext.destination);

// track.connect(gainNode).connect(audioContext.destination);
// track.connect(boostNode).connect(audioContext.destination);
// track.connect(distortionNode).connect(audioContext.destination);


//${distortionOutput}
