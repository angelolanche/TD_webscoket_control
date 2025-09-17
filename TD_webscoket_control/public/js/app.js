const ws = new WebSocket('ws://192.168.0.198:5001');

const powerOn = document.getElementById('powerOn');
const powerOff = document.getElementById('powerOff');
const resetButton = document.getElementById('reset');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const volume = document.getElementById('volume');
const clientName = document.getElementById('clientName');

// powerOn.addEventListener('click', (event) => {
//   ws.send(JSON.stringify({"Power": 1}))
// });

// powerOff.addEventListener('click', (event) => {
//   ws.send(JSON.stringify({"Power": 0}))
// });

resetButton.addEventListener('click', (event) => {
  console.log('play -1')
  ws.send(JSON.stringify({"Player": -1}))
});

playButton.addEventListener('click', (event) => {
  ws.send(JSON.stringify({"Player": 1}))
});

pauseButton.addEventListener('click', (event) => {
  ws.send(JSON.stringify({"Player": 0}))
});

volume.addEventListener('input', (event) => {
  const value = event.target.value
  ws.send(JSON.stringify({"Volume": value}))
});

// clientName.addEventListener('input', (event) => {
//   ws.send(JSON.stringify({"Name": event.target.value}))
// });

ws.addEventListener('message', (message) => {
  if(message.data == 'ping') {
    return
  }

  let data = JSON.parse(message.data)
})