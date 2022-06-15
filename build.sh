#!/bin/bash

zip --recurse-paths --filesync BookmarkletsIcon.zip ./* \
    --exclude '*.zip' --exclude '*.sh' --exclude 'screenshot.png'
