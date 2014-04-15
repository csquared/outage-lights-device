var wpi = require('wiring-pi');
var https = require('https');
var logfmt = require('logfmt');

wpi.setup();
var lightsPin = 0;
var workPin   = 7;
wpi.pinMode(lightsPin, wpi.modes.OUTPUT);
wpi.pinMode(workPin, wpi.modes.OUTPUT);

process.on('exit', function(){
  wpi.digitalWrite(workPin, 0);
})

var pollStatus = function(){
  wpi.digitalWrite(workPin, 1);
  https.get('https://status.heroku.com/status.json', function(res) {
    var responseBody = '';

    res.on('data', function(data) { responseBody += data });
    res.on('end', function(){
      var jsonBody = JSON.parse(responseBody);
      var data = {
        operations: jsonBody['App Operations'],
        tools: jsonBody['Tools']
      }
      logfmt.log(data);
      if(data.operations == 'red' || data.tools == 'red'){
        wpi.digitalWrite(lightsPin, 1);
      }else{
        wpi.digitalWrite(lightsPin, 0);
      }
      wpi.digitalWrite(workPin, 0);
    })
  })
}

setInterval(pollStatus, 5000);
