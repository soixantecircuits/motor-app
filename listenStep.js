const spacebroClient = require('spacebro-client')
var five = require("johnny-five")
var configs = five.Motor.SHIELD_CONFIGS.ARDUINO_MOTOR_SHIELD_R3_1
board = new five.Board()

board.on("ready", function() {
    var motor = new five.Motor(configs.A)
    var actionList = [
      {
        name: 'step',
        trigger: function (data) {
          if (data.data == 1) {
            motor.forward(255)
            console.log('Motor moving forward...')
          }
          else if (data.data == -1){
            motor.reverse(255)
            console.log('Motor moving backwards...')
          }
        }
      }
    ]
    spacebroClient.iKnowMyMaster('127.0.0.1', '8888')
    spacebroClient.registerToMaster(actionList, 'step-direction')

    motor.on("forward", function(err, timestamp) {
      // demonstrate braking after 5 seconds
      board.wait(5000, function() {
        motor.brake()
        console.log('braking...')
      })
    })

    motor.on("brake", function(err, timestamp) {
      // Release the brake after .1 seconds
      board.wait(100, function() {
        motor.stop()
        })
    })

    motor.on("reverse", function(err, timestamp) {
      // demonstrate braking after 5 seconds
      board.wait(5000, function() {
        motor.brake()
      })
    })
})

