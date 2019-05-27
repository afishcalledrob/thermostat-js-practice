const DEFAULT_TEMP = 20;
const MIN_TEMP = 10;
const MAX_SAVER_TEMP = 25;
const MAX_NO_SAVER_TEMP = 32;
const DEFAULT_SAVER_STATUS = true;

 var Thermostat = function() {
  this.temperature = DEFAULT_TEMP;
  this.powerSaver = DEFAULT_SAVER_STATUS;
};

Thermostat.prototype.reset = function () {
  this.temperature = DEFAULT_TEMP;
  this.powerSaver = DEFAULT_SAVER_STATUS;
}


Thermostat.prototype.temperatureUp = function (number) {
  if (this.temperature + number > MAX_SAVER_TEMP && this.powerSaver) {
    throw 'Maximum temperature is 25 degrees'
  }else if (this.temperature + number > MAX_NO_SAVER_TEMP) {
    throw 'Maximum temperature is 32 degrees'
  }
  this.temperature += number;
};

Thermostat.prototype.temperatureDown = function (number) {
  if (this.temperature - number < MIN_TEMP) {
    throw 'Minimum temperature is 10 degrees'
  }
  this.temperature -= number;
};

Thermostat.prototype.powerSaverOff = function () {
  this.powerSaver = false;
}

Thermostat.prototype.powerSaverOn = function () {
  this.powerSaver = true;
}





module.exports = Thermostat;
