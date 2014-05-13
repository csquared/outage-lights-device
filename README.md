# Raspberry PI Outage Lights

Wifi-enabled outage lights for the new Heroku office.

This simple node.js script pings the status site
every 5 seconds and turns on a power strip of red lights
if the status site is reporting an outage (red status).

## Installation

### Prereqs:

- Node.js
- [WiringPi](http://wiringpi.com/download-and-install/)

### Install:

Clone/download and unzip the repository

    > make install
    > sudo start outage-lights

## Wiring

A powertail II is set up on `lightsPin` and an led is on
`workPin` so you can verify requests are being made.

They share a common ground.
