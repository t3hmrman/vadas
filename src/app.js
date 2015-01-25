/* Source code for VADAS node-webkit app */

/* global require */

var PocketSphinx = require('pocketsphinx');
var ps = new PocketSphinx();

// Register listener on utterances
ps.on('utterance', function(hyp, utt, score) {
  console.log("Received utterance!");
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
