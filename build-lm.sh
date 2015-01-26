#!/bin/sh
text2wfreq < resources/lm/ref_text.txt | wfreq2vocab > resources/lm/ref_text.tmp.vocab
