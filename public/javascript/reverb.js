
const impulse = async LIVE => {

    window.buffer = null;
  
    await fetch('media/reverb.mp3')
      .then(response => response.arrayBuffer())
      .then(data => {
        return audioContext.decodeAudioData(data, b => {
          buffer = b;
        });
      })
      .catch(e => onError('Failed to load reverb impulse'));

      reverb.buffer = buffer;

    }












/*
 //Reverb Node ----------------------------------------------------

//HTTP request to get reverb sample




//Create new reverb node
const reverbNode = audioContext.createConvolver();

//grab distortion ON button
const reverbButton = document.querySelector('#reverbButton');

// this function sets the actual amount of distortion to be applied
function makeReverb() {
 //Reverb params here
}


// turns on and off the distortion 
function distortionOn() {
 // Reverb switched on and off here
}


//add the event listener to run the reverb function
reverbButton.addEventListener('click', distortionOn);





// const reverbButton = document.querySelector('#reverbButton');
// const numSeconds = 7;
// const options = {
//     sampleRate: 44100,
//     length: numSeconds * this.sampleRate,
// }
// const reverbSource = new AudioBuffer(options);



//constructor method
// const reverbNode = new ConvolverNode(audioContext, ()=> {
//    buffer: myAudioBuffer,
//    detune: 0,
//    type: "square",
// })



/*
// factory method
const tremolo = audioContext.createOscillator();
tremolo.X = xxx;
tremolo.Y = xxx;
*/



// tremoloButton.addEventListener('click', function(){
//   tremolo.start();
//  })
