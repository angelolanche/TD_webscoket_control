const ws = new WebSocket('ws://172.16.11.23:5001');

const powerOn = document.getElementById('powerOn');
const powerOff = document.getElementById('powerOff');
const resetButton = document.getElementById('reset');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const volume = document.getElementById('volume');
const clientName = document.getElementById('clientName');
const presentationType = document.getElementById('option')

powerOn.addEventListener('click', (event) => {
  ws.send(JSON.stringify({"Power": 2}))
});

powerOff.addEventListener('click', (event) => {
  ws.send(JSON.stringify({"Power": 1}))
});

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

clientName.addEventListener('input', (event) => {
  ws.send(JSON.stringify({"Name": event.target.value}))
});

presentationType.addEventListener('change', (event) => {
  console.log('event: ', event.target.value)
  ws.send(JSON.stringify({"Option": event.target.value}))
});

ws.addEventListener('message', (message) => {
  if(message.data == 'ping') {
    return
  }

  let data = JSON.parse(message.data)
})