describe('Thermostat', function () {
  var Thermostat  = require('../lib/thermostat');
  var thermostat = new Thermostat();

  afterEach(function () {
    thermostat.reset();
    });



  describe('Temperature Property of Thermostat', function () {
    afterEach(function () {
      thermostat.reset();
      });

    it('should have a default temperature of 20 degrees', function () {
      expect(thermostat.temperature).toEqual(20);
    });
  });

  describe('Changing temperature', function () {
    afterEach(function () {
      thermostat.reset();
      });

    it('should increase temperature by a specified amount', function () {
      thermostat.temperatureUp(5);
      expect(thermostat.temperature).toEqual(25);
    });
    it('should decrease temperature by a specified amount', function () {
      thermostat.temperatureDown(5);
      expect(thermostat.temperature).toEqual(15);
    });
    it('should prevent temperature from decreasing below 10', function () {
      expect(function () {
        thermostat.temperatureDown(11)
      }).toThrow('Minimum temperature is 10 degrees');
    });
  });

  it('should prevent temperature from rising above 25 when power saver on', function () {
    expect(function () {
      thermostat.temperatureUp(6)
    }).toThrow('Maximum temperature is 25 degrees');
  })

  it('should prevent temperature from rising above 32 when power saver off', function () {
    thermostat.powerSaverOff();
    expect(function () {
      thermostat.temperatureUp(13);
    }).toThrow('Maximum temperature is 32 degrees');
  })

  describe('Power saving mode', function(){
    afterEach(function () {
      thermostat.reset();
      });


    it('be set to on by default', function(){
      expect(thermostat.powerSaver).toBeTruthy();
    });

    it('should switch off', function(){
      thermostat.powerSaverOff();
      expect(thermostat.powerSaver).toBeFalsy();
    });

    it('should switch on', function(){
      thermostat.powerSaverOff();
      thermostat.powerSaverOn();
      expect(thermostat.powerSaver).toBeTruthy();
    });
  });

  it('should reset the temperature to 20', function () {
      thermostat.temperatureUp(2);
      thermostat.resetTemperature();
      expect(thermostat.temperature).toEqual(20);
    });

    describe('Energy usage', function () {
    afterEach(function () {
      thermostat.reset();
    });
    it('should return "low-usage" if the temperature is below 18 degrees', function () {
      thermostat.temperatureDown(3);
      expect(thermostat.energyUse()).toEqual('low-usage');
    });
    it('should return "medium-usage" if the temperature is between 18 and 25 degrees', function () {
      expect(thermostat.energyUse()).toEqual('medium-usage');
    });
    it('should return "high-usage" if the temperature is over 25 degrees', function () {
      thermostat.powerSaverOff();
      thermostat.temperatureUp(10);
      expect(thermostat.energyUse()).toEqual('high-usage');
    });
  });
});
