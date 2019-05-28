$(document).ready(function(){
  var Thermostat  = require('thermostat');
  var thermostat = new Thermostat();


  $('.slider').val(thermostat.temperature);
  $('.slider').click(function(){
    var sliderTempValue = $('.slider').val();
      upOrDown(sliderTempValue);
      $('.temperature-display').html(thermostat.temperature);
      $('.slider').val(thermostat.temperature);
  });

  $('.temperature-display').html(thermostat.temperature);

  function upOrDown (value) {
    if (value - thermostat.temperature > 0) {
      try {
        thermostat.temperatureUp(value-thermostat.temperature);
      }
      catch (e) {
        $('.error_message').html(e).fadeOut(1000, function () {
          $('.error_message').html('').fadeIn();
        });
      }

    } else {
      try {
        thermostat.temperatureDown(thermostat.temperature-value);
      }
      catch (e) {
        $('.error_message').html(e);
      }
    }
  }

});
