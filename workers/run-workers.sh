#!/bin/bash

source ".env" || true

if [ -z $1 ]; then
    echo "Specify number of workers like so: ./run-workers.sh 5"
    exit 1
fi
echo $NODE_EXE
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
sudo sed -i "s/NODE/$NODE_EXE/" /etc/systemd/system/resize-worker@.service
sudo sed -i "s/WORKER_DIR/$WORKER_DIR\/.env/" /etc/systemd/system/resize-worker@.service
sudo sed -i "s/WORKER/$WORKER/" /etc/systemd/system/resize-worker@.service

sudo systemctl daemon-reload
sudo systemctl start resize-worker.target
