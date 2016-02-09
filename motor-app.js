const spacebroClient = require('spacebro-client')
var five = require('johnny-five')
var configs = five.Motor.SHIELD_CONFIGS.ARDUINO_MOTOR_SHIELD_R3_1
var board = new five.Board()

board.on('ready', function () {
  var motor = new five.Motor(configs.A)
  var actionList = [
    {
      name: 'step',
      trigger: function (data) {
        if (data.step == 1) {
          motor.forward(255)
        } else if (data.step == -1) {
          motor.reverse(255)
        }
      }
    }
  ]
  spacebroClient.iKnowMyMaster('127.0.0.1', '8888')
  spacebroClient.registerToMaster(actionList, 'motor-app')

  motor.on('forward', function (err, timestamp) {
    if (err) {
      console.log(err)
      return (err)
    }
    console.log('Motor moving forward...')
    board.wait(2000, function () {
      motor.stop()
    })
  })

  motor.on('stop', function (err, timestamp) {
    if (err) {
      console.log(err)
      return (err)
    }
    console.log('stop...')
  })

  motor.on('reverse', function (err, timestamp) {
    if (err) {
      console.log(err)
      return (err)
    }
    console.log('Motor moving backwards...')
    board.wait(2000, function () {
      motor.stop()
    })
  })
})

