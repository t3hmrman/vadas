/* Source code for VADAS node-webkit app */
/* global require */
/* global process */

var PocketSphinx = require('pocketsphinx');

// Global constants
var SAMPLING_RATE = 16000;
var NFFT = 512;
var CONFIG = {
  custom: { hmm: 'resources/acoustic_model',
            lm: 'resources/dist/ref.lm.DMP',
            dict: 'resources/dict/cmudict_SPHINX_40'},
  generated: { hmm: 'resources/acoustic_model',
               lm: 'resources/pre_packaged/1172/1172.lm',
               dict: 'resources/pre_packaged/1172/1172.dic'}
};
            

// PocketSphinx setup
var ps = new PocketSphinx({
  hmm: CONFIG.generated.hmm,
  lm: CONFIG.generated.lm,
  dict: CONFIG.generated.dict,
  samprate: SAMPLING_RATE,
  nfft: NFFT
}, function(err, hypothesis, score, utterance_id) {
  if (err) { console.log("Error occurred:", err); return;}
  console.log("Got reading!");
  console.log("hypothesis:", hypothesis);
  console.log("score:", score);
  console.log("utterance_id:", utterance_id);
});

// Set up media user stream
if (navigator.getUserMedia) {
  navigator.getUserMedia(
    {video: false, audio: true},
    function(localMediaStream) {
      console.log("Got media stream:", localMediaStream);
    },
    function(err) {
     console.log("getUserMedia failed!", err);
    }
  );
} else {
  console.log("No getUserMedia!");
}
