#!/bin/bash

sudo systemctl stop resize-worker.target

sudo rm -f /etc/systemd/system/resize-worker*
