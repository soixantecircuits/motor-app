# motor-app

#Diagram of APP#
```
+---------------------+               +----------------------+             +--------------------------+
|                     |               |                      |             |                          |
|                     | <-----------+ |                      |             |                          |
|                     |               |                      | +---------> |                          |
|     sendSteps       |               |      Spacebro        |             |       listenSteps        |
|                     | +-----------> |                      |             |                          |
|                     |               |                      |             |                          |
|                     |               |                      |             |                          |
+---------------------+               +----------------------+             +--------------------------+
```

# Start APP

First clone spacebro in motor-app folder and install it:

  1. `git clone git@github.com:soixantecircuits/spacebro.git`
  2. `cd spacebro && npm install && cd ../`

Then execute each of the following commands their *own* terminal:

  * `npm run spacebro` *Terminal 1*
  * `npm run send-steps` *Terminal 2*
  * `npm start` *Terminal 3*
