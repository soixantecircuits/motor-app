const spacebroClient = require('spacebro-client')

var actionList = [
  {
    name: 'step',
    trigger: function (data) {
      console.log(data)
    }
  }
]

spacebroClient.iKnowMyMaster('127.0.0.1', '8888');
spacebroClient.registerToMaster(actionList, 'step-direction')

setInterval(function () {
  spacebroClient.emit('step', {data: '-1'})
}, 2000)

setInterval(function () {
  spacebroClient.emit('step', {data: '1'})
}, 3000)

