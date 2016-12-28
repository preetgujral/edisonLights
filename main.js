var Cylon = require('cylon');
var mraa = require('mraa');

Cylon.robot(
  {connections: {
    edison: {adaptor: 'intel-iot'}
    },

    devices: {
      //digital
      led: {
        driver: 'led',
        pin: 13,
        connection: 'edison'
      },
      ledRed: {
        driver: 'led',
        pin: 2,
        connection: 'edison'
      },
      ledGreen: {
        driver: 'led',
        pin: 3,
        connection: 'edison'
      },
      ledBlue: {
        driver: 'led',
        pin: 4,
        connection: 'edison'
      },
      button: {
        driver: 'button',
        pin: 6,
        connection: 'edison'
      },
      //analog
      soundSensor: {
// Plug the sound sensor into the Analog port A0 on the provided Seeed Sensor Kit Arduino Shield. MUST be in the analog pin slots!
        driver: 'analogSensor',
        pin: 0,
        connection: 'edison'
      },
    },

    work: function(my) {
      // this is where the main app logic is going to live. helpful guide here on how to structure https://cylonjs.com/documentation/guides/working-with-robots/

        //turn off green and blue leds.
        //turn on red led
        var ledSeries = [my.ledRed, my.ledGreen, my.ledBlue];
        var red = ledSeries[0];
        var green = ledSeries[1];
        var blue = ledSeries[2];

        red.turnOn();
        green.turnOff();
        blue.turnOff();

        //function that cycles through LEDs
        //starts at beginning at end of loop
        var currentLight = 0;
        function changeLight() {
          //turn current light off
          ledSeries[currentLight].turnOff()
          //increase light counter
          if (currentLight < ledSeries.length - 1) {
            currentLight ++;
          } else {
            currentLight = 0;
          }
          //turn on next light
          ledSeries[currentLight].turnOn()
        }

      //on event trigger (on button push)
        my.button.on('push', function() {
          console.log("Button pushed!");
          changeLight();
          changeStop();
        });
    }
  }
).start();
