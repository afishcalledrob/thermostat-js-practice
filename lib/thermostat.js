const DEFAULT_TEMP = 20;
const MIN_TEMP = 10;
const MAX_SAVER_TEMP = 25;
const MAX_NO_SAVER_TEMP = 32;
const DEFAULT_SAVER_STATUS = true;
const LOW_USAGE_UPPER_THRESHOLD = 18;
const MEDIUM_USAGE_UPPER_THRESHOLD = 25;

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

Thermostat.prototype.resetTemperature = function () {
  this.temperature = DEFAULT_TEMP;
};

Thermostat.prototype.energyUse = function () {
  if (this.temperature < LOW_USAGE_UPPER_THRESHOLD){
    return 'low-usage';
  } else if (this.temperature >= LOW_USAGE_UPPER_THRESHOLD &&
    this.temperature < MEDIUM_USAGE_UPPER_THRESHOLD) {
    return 'medium-usage';
  }else {
    return 'high-usage';
  }
}





module.exports = Thermostat;
