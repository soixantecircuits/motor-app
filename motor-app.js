const config = require('./config.json')
const spacebroClient = require('spacebro-client')
const timePerStep = config.timePerStep
const serviceName = config.serviceName
var five = require('johnny-five')
var configs = five.Motor.SHIELD_CONFIGS.SPARKFUN_ARDUMOTO
var board = new five.Board()
var busy = false

board.on('ready', function () {
  var motor = new five.Motor(configs.A)
  var actionList = [
    {
      name: 'motor-step',
      trigger: function (data) {
        if (busy === true) {
          console.log('Motor is currently busy...')
        } else if (data.value === 1 && busy === false) {
          busy = true
          motor.forward(150)
        } else if (data.value === -1 && busy === false) {
          busy = true
          motor.reverse(150)
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

board.on("close", function() {
  console.log("[CONNECTION] - is closed")
  process.exit()
})
