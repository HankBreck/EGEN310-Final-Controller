const ACTION = "action"
const RATIO = "ratio"
const SPEED = "speed"

const arduinoHost = '172.20.10.9';
let lastCommandSentTime = 0;

const sendTcpCommand = (powerRatio: number, direction: number, speed: number) => {
  // throttle the commands to send at most once every 100ms
  const currentTime = new Date().getTime();
  if (currentTime - lastCommandSentTime < 100) {
    return;
  }
  lastCommandSentTime = currentTime;
  
  let ratioParam = Math.round(powerRatio*100);
  const urlParams = "/?" + ACTION + "=" + direction + "&" + RATIO + "=" + ratioParam + "&" + SPEED + "=" + speed
  fetch("http://" + arduinoHost + urlParams)
    .then(
      (res) => console.log("drive fulfilled"), 
      (res) => console.log("drive rejected"),
    )

}

const sendCutCommand = () => {
  const urlParams = "/cut"
  fetch("http://" + arduinoHost + urlParams)
    .then(
      (res) => console.log("cut fulfilled"), 
      (res) => console.log("cut rejected"),
    )
}

export { sendTcpCommand, sendCutCommand };