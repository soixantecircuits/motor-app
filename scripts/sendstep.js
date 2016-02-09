const spacebroClient = require('spacebro-client')

var actionList = [
  {
    name: 'step',
    trigger: function (data) {
      console.log(data)
    }
  }
]

spacebroClient.iKnowMyMaster('127.0.0.1', '8888')
spacebroClient.registerToMaster(actionList, 'sendSteps')

setInterval(function () {
  spacebroClient.emit('step', {step: '1'})
}, 6000)

setInterval(function () {
  spacebroClient.emit('step', {step: '-1'})
}, 9000)
