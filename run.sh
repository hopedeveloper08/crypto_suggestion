#!/bin/bash

if [ -d ".venv" ]; then
    source .venv/bin/activate
else
    echo "OK"
    python3 -m virtualenv ".venv"
    source .venv/bin/activate
    python3 -m pip install -r requirements.txt
fi


python3 app.py
