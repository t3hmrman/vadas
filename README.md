# VADAS

VADAS (Voice Activated Distributed Automation System) is meant to be an extensible system for controlling devices accessible to your computer.
Targeting the coming "internet" of things, VADAS applies simplest-first principles to tackling the problems posed by distributed systems and effective home automation.

VADAS stands on the shoulders of the following giants:
- [CMU Sphinx](http://cmusphinx.sourceforge.net)
- [Node Webkit (nwjs)](http://nwjs.io)

## Dependencies/Prerequisites

### CMU Sphinx
Install [CMU Sphinx](http://cmusphinx.sourceforge.net), which requires:
- [sphinx-base](https://github.com/cmusphinx/sphinxbase)
- [pocketsphinx](https://github.com/cmusphinx/pocketsphinx)

### CMUCLMTK (Language Model toolkit)
1. Download [cmuclmtk](http://cmusphinx.sourceforge.net/wiki/download)
2. Build local non-sudo version of cmuclmtk
```bash
cd /path/to/unzipped/cmuclmtk
./configure --prefix=/absolute/path/to/unzipped/cmuclmtk/build
make install
```
3. Edit your shell config, and put the local builds on your `$PATH` (and the .libs folder on your `$LD_LIBRARY_PATH`)
```bash
export CMUCLMTK_BIN="/path/to/cmuclmtk/build/bin"
export CMUCLMTK_LIBS="/path/to/cmuclmtk/src/.libs"
export $PATH=$CMUCLMTK_BIN:$PATH
export $LD_LIBRARY_PATH=$CMUCLMTK_LIBS:$LD_LIBRARY_PATH
```

This is necessary because it will allow you to use the build libraries and programs WITHOUT sudo.
After running these commands, you should have programs like `text2wfreq` available in a new shell (or after sourcing the modified shell config file)

### Node-Webkit
Install [node-webkit](http://nwjs.io) (AKA nwjs) **(preferrably 0.8.6 64bit)**

### nw-gyp
nw-gyp stands in for node-gyp
`npm install -g nw-gyp` ([nw-gyp](https://github.com/nwjs/nw-gyp))

## Getting started

To set up VADAS:
2. `npm install`

To run VADAS:
`nw .`

## Configuration

### Finding/using a non-default USB microphone

1. `aplay -l` or `cat /proc/asound/cards` (to find the hardware device number and subdevice)
2. `pocketsphinx_continuous -inmic yes -adcdev hw:<hardward device number>:<subdevice>` (test with pocketsphinx, in this example we will use `hw:1,0`)
3. Add the following config to your VADAS config.json file:
```json
{ "overrides": {
    "pocketsphinx": {
        "switches": {
            "adcdev": "hw:1,0"
            }
        }
    }
}
```

## Common Issuses

### Unable to find libudev.so.0 while trying to install nwjs
If this error pops up, usually you can check the [Google Chrome](http://chrome.google.com) shared libraries to find a version that you can use. To link to the version you'd like, you can modify your `LD_LIBRARY_PATH` (temporarily or in your shell config file) to include the shared libraries packed with Chrome, often found in `/opt/google/chrome`

For bash, this looks something like:
```bash
# Add google chrome's shared libs to load path
export CHROME_LIBS="/opt/google/chrome"
export LD_LIBRARY_PATH=$CHROME_LIBS:$LD_LIBRARY_PATH
```

### **Module did not self-register** while trying to run VADAS
This was a pain point while getting everything set up. Hopefully some of the following steps will help:
- Ensure that you are using the specified versions of node (10.x), nw (0.8.6 x64 if possible).
- Download the [forked & modified node-pocketsphinx](https://github.com/t3hmrman/node-pocketsphinx/) library in a seperate folder and build it with:
  - `nw-gyp configure --target=0.8.6 && nw-gyp build`

### Wanting to use a third-party/updated acoustic model
To use a different CMUSphinx-compatible acoustic model:

1. Download a suitable acoustic language model (ex. http://sourceforge.net/projects/cmusphinx/files/Acoustic%20and%20Language%20Models/US%20English%20Generic%20Acoustic%20Model/cmusphinx-en-us-ptm-5.2.tar.gz/download) and save it under "resources/acoustic_model" (from the vadas top level directory)

2. Edit the config and point to the folder with the `hmm` argument to `new PocketSphinx()`

### Language model/set does not contain </s>
[On StackOverflow](https://stackoverflow.com/questions/25952376/language-model-set-does-not-contain-s)

tldr; You need spaces after `<s>` and `</s>` in the reference text (`resources/lm/ref.txt`).

### Failed to open audio device /dev/dsp
[On the CMUSphinx FAQ](http://cmusphinx.sourceforge.net/wiki/faq#qfailed_to_open_audio_device_dev_dsp_no_such_file_or_directory)

Note that `sudo apt-get install oss-compat` will fail because the needed ALSA compatability modules will fail [Full explanation on SO](http://askubuntu.com/questions/318396/oss-compat-package-does-not-create-dev-dsp), unless you compiled them into the kernel.

You could download and install osspd, but rather than that, just recompile pocketsphinx with ALSA support (since OSS is deprecated):
- `sudo apt-get install libasound2 libasound2-dev`
- Recompile sphinxbase (it will use ALSA automagically)
- Recompile pocketsphinx (it will use ALSA automagically)
