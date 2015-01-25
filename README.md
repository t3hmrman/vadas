# VADAS

VADAS (Voice Activated Distributed Automation System) is meant to be an extensible system for controlling devices accessible to your computer.
Targeting the coming "internet" of things, VADAS applies simplest-first principles to tackling the problems posed by distributed systems and effective home automation.

VADAS stands on the shoulders of the following giants:
- [CMU Sphinx](http://cmusphinx.sourceforge.net)
- [Node Webkit (nwjs)](http://nwjs.io)

## Setting up VADAS

To set up VADAS:
1. Install CMU Sphinx, which requires:
 - [sphinx-base](https://github.com/cmusphinx/sphinxbase)
 - [pocketsphinx](https://github.com/cmusphinx/pocketsphinx)
2. Install node-webkit (nwjs)

### Common Issuses

*Unable to find libudev.so.0* while trying to install nwjs
If this error pops up, usually you can check the [Google Chrome](http://chrome.google.com) shared libraries to find a version that you can use. To link to the version you'd like, you can modify your `LD_LIBRARY_PATH` (temporarily or in your shell config file) to include the shared libraries packed with Chrome, often found in `/opt/google/chrome`

For bash, this looks something like:
    # Add google chrome's shared libs to load path
    export CHROME_LIBS="/opt/google/chrome"
    export LD_LIBRARY_PATH=$CHROME_LIBS:$LD_LIBRARY_PATH

