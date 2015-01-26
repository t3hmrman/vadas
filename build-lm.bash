#!/usr/bin/env bash

# Convert sphinx reference text into language model
DIR="resources/lm"
TXT_PATH="$DIR/ref.txt"
VOCAB_PATH="$DIR/ref.tmp.vocab"
IDNGRAM_PATH="$DIR/ref.idngram"
ARPA_PATH="$DIR/ref.arpa"
SPHINX_LM_PATH="resources/dist/ref.lm.DMP"

# Generate ARPA representation
echo -e "Converting reference text into word frequency listing and generating vocabulary..."
text2wfreq < $TXT_PATH | wfreq2vocab > $VOCAB_PATH

# Convert vocab to ngrams
if [ $? -eq 0 ]; then
    echo -e "\n***Converting vocabulary to ngrams..."
    text2idngram -vocab $VOCAB_PATH -idngram $IDNGRAM_PATH < $VOCAB_PATH
fi

# Convert ngrams to ARPA lm
if [ $? -eq 0 ]; then
    echo -e "\n***Converting ngrams to LM..."
    idngram2lm -vocab_type 0 -idngram $IDNGRAM_PATH -vocab $VOCAB_PATH -arpa $ARPA_PATH
fi

# Generate sphinx Language Model
if [ $? -eq 0 ]; then
    echo -e "\n***Converting memory efficient .DMP LM..."
    sphinx_lm_convert -i $ARPA_PATH -o $SPHINX_LM_PATH
fi
