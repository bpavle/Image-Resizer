#!/bin/bash
sudo cp resize-worker.target /etc/systemd/system/
sudo cp resize-worker@.service /etc/systemd/system/
NUMBER_OF_WORKERS="${1}"
SERVICES="Requires="
for ((i = 1; i <= "$NUMBER_OF_WORKERS"; i++)); do
    SERVICES+="resize-worker@$i.service "
done
echo Services: "$SERVICES"
echo NUMBER_OF_WORKERS: "$NUMBER_OF_WORKERS"
sudo sed -i "s/.*Requires=.*/$SERVICES/" /etc/systemd/system/resize-worker.target

sudo systemctl daemon-reload
sudo systemctl start resize-worker.target
