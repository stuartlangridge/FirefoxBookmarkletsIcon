#!/bin/bash

zip --recurse-paths --filesync FirefoxBookmarkletsIcon.zip ./* \
    --exclude '*.zip' --exclude '*.sh' --exclude 'screenshot.png'
