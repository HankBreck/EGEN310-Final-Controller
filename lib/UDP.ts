import dgram from 'react-native-udp';
import UdpSocket from 'react-native-udp/lib/types/UdpSocket';

let socket: UdpSocket | null = null;
const arduinoHost = '172.20.10.9';
const arduinoPort = 8888; // replace with your Arduino's port number
let lastCommandSentTime = 0;

function sendCommand(powerRatio: number, direction: number, speed: number) {
  // throttle the commands to send at most once every 100ms
  const currentTime = new Date().getTime();
  if (currentTime - lastCommandSentTime < 100) {
    return;
  }
  lastCommandSentTime = currentTime;

  // Ensure socket exists
  if (!socket) {
    initSocket();
  }
  
  // Construct the payload
  const payload = new ArrayBuffer(6);
  const view = new DataView(payload);
  view.setUint16(0, powerRatio * 65535);
  view.setInt8(2, direction);
  view.setUint8(3, speed);

  const buffer = Buffer.from(payload);
  
  socket?.send(buffer, 0, buffer.length, arduinoPort, arduinoHost, (error) => {
    if (error) {
      console.log(`Error sending command: ${error}`);
    }
  });
}

function initSocket() {
  if (socket !== null) {
    socket.close();
  }
  socket = dgram.createSocket({type: 'udp4'});
}

export { sendCommand };