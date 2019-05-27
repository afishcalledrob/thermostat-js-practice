describe('Thermostat', function () {
  var Thermostat  = require('../lib/thermostat');
  var thermostat = new Thermostat();



  describe('Temperature Property of Thermostat', function () {
    it('should have a default temperature of 20 degrees', function () {
      expect(thermostat.temperature).toEqual(20);
    });
  });

  describe('Changing temperature', function () {
    it('should increase temperature by a specified amount', function () {
      thermostat.temperatureUp(5);
      expect(thermostat.temperature).toEqual(25);
      thermostat.reset();
    });
    it('should decrease temperature by a specified amount', function () {
      thermostat.temperatureDown(5);
      expect(thermostat.temperature).toEqual(15);
      thermostat.reset();
    });
    it('should prevent temperature from decreasing below 10', function () {
      expect(function () {
        thermostat.temperatureDown(11)
      }).toThrow('Minimum temperature is 10 degrees');
      thermostat.reset();
    });
  });

  it('should prevent temperature from rising above 25 when power saver on', function () {
    expect(function () {
      thermostat.temperatureUp(6)
    }).toThrow('Maximum temperature is 25 degrees');
    thermostat.reset();
  })

  it('should prevent temperature from rising above 32 when power saver off', function () {
    thermostat.powerSaverOff();
    expect(function () {
      thermostat.temperatureUp(13);
    }).toThrow('Maximum temperature is 32 degrees');
    thermostat.reset();
  })

  describe('Power saving mode', function(){
    it('be set to on by default', function(){
      expect(thermostat.powerSaver).toBeTruthy();
    });

    it('should switch off', function(){
      thermostat.powerSaverOff();
      expect(thermostat.powerSaver).toBeFalsy();
      thermostat.reset();
    });

    it('should switch on', function(){
      thermostat.powerSaverOff();
      thermostat.powerSaverOn();
      expect(thermostat.powerSaver).toBeTruthy();
      thermostat.reset();
    });
  });
});
