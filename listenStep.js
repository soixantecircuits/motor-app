const spacebroClient = require('spacebro-client')
var five = require("johnny-five")
var configs = five.Motor.SHIELD_CONFIGS.ARDUINO_MOTOR_SHIELD_R3_1
var lastDirection = null
var board = new five.Board()

board.on("ready", function() {
    var motor = new five.Motor(configs.A)
    var actionList = [
      {
        name: 'step',
        trigger: function (data) {
          if (data.data == 1) {
            if (activated ('forward')) {
              stop
            }
              motor.forward(255)
              console.log('Motor moving forward...')
          }
          else if (data.data == -1){
            if (activated ('reverse')) {
              motor.reverse(255)
              console.log('Motor moving backwards...')
            }
          }
        }
      }
    ]
    spacebroClient.iKnowMyMaster('127.0.0.1', '8888')
    spacebroClient.registerToMaster(actionList, 'step-direction')

    motor.on("forward", function(err, timestamp) {
      // demonstrate braking after 5 seconds
      lastDirection = 'forward'
      board.wait(2000, function() {
        motor.stop()
      })
    })

    motor.on("stop", function(err, timestamp) {
      // Release the brake after .1 seconds
      console.log('stop...')
    })

    motor.on("reverse", function(err, timestamp) {
      // demonstrate braking after 5 seconds
      if (activated ('reverse')) {
        motor.stop
        setTimeout(function () { motor.reverse }, 1000)
      } else {
        lastDirection = 'backwards'
        board.wait(2000, function() {
          motor.stop()
        })
      }
    })
})

