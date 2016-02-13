const config = require('./config.json')
const spacebroClient = require('spacebro-client')
const timePerStep = config.timePerStep
const serviceName = config.serviceName
var five = require('johnny-five')
var configs = five.Motor.SHIELD_CONFIGS.ARDUINO_MOTOR_SHIELD_R3_1
var board = new five.Board()
var busy = false

board.on('ready', function () {
  var motor = new five.Motor(configs.A)
  var actionList = [
    {
      name: 'hStep',
      trigger: function (data) {
        if (busy === true) {
          console.log('Motor is currently busy...')
        } else if (data.hStep === 1 && busy === false) {
          busy = true
          motor.forward(255)
        } else if (data.hStep === -1 && busy === false) {
          busy = true
          motor.reverse(255)
        }
      }
    }
  ]
  spacebroClient.registerToMaster(actionList, 'motor-app', serviceName)

  motor.on('forward', function (err, timestamp) {
    if (err) {
      console.log(err)
      return (err)
    }
    console.log('Motor moving forward...')
    board.wait(timePerStep, function () {
      motor.stop()
      busy = false
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
    board.wait(timePerStep, function () {
      motor.stop()
      busy = false
    })
  })
})

