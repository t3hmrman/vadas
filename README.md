# VADAS

VADAS (Voice Activated Distributed Automation System) is meant to be an extensible system for controlling devices accessible to your computer.
Targeting the coming "internet" of things, VADAS applies simplest-first principles to tackling the problems posed by distributed systems and effective home automation.

VADAS stands on the shoulders of the following giants:
- [CMU Sphinx](http://cmusphinx.sourceforge.net)
- [Node Webkit (nwjs)](http://nwjs.io)

## Getting started

To set up VADAS:
1. Install CMU Sphinx, which requires:
 - [sphinx-base](https://github.com/cmusphinx/sphinxbase)
 - [pocketsphinx](https://github.com/cmusphinx/pocketsphinx)
2. Install node-webkit (nwjs) **(preferrably 0.8.6 64bit)**
3. `npm install -g nw-gyp` ([nw-gyp](https://github.com/nwjs/nw-gyp))
4. `npm install`

To run VADAS:
`nw .`

### Common Issuses

**Unable to find libudev.so.0** while trying to install nwjs
If this error pops up, usually you can check the [Google Chrome](http://chrome.google.com) shared libraries to find a version that you can use. To link to the version you'd like, you can modify your `LD_LIBRARY_PATH` (temporarily or in your shell config file) to include the shared libraries packed with Chrome, often found in `/opt/google/chrome`

For bash, this looks something like:
```bash
# Add google chrome's shared libs to load path
export CHROME_LIBS="/opt/google/chrome"
export LD_LIBRARY_PATH=$CHROME_LIBS:$LD_LIBRARY_PATH
```

**Module did not self-register** while trying to run VADAS
This was a pain point while getting everything set up. Hopefully some of the following steps will help:
- Ensure that you are using the specified versions of node (10.x), nw (0.8.6 x64 if possible).
- Download the [forked & modified node-pocketsphinx](https://github.com/t3hmrman/node-pocketsphinx/) library in a seperate folder and build it with:
  - `nw-gyp configure --target=0.8.6 && nw-gyp build`
