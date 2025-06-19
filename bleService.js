
const NORDIC_UART_SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const TX_CHARACTERISTIC_UUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';
const RX_CHARACTERISTIC_UUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';

let device = null;
let server = null;
let txCharacteristic = null;
let rxCharacteristic = null; 
let onDataReceivedCallback = null;
let onConnectionChangeCallback = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

const connectDevice = async (onDataReceived, onConnectionChange) => {
  onDataReceivedCallback = onDataReceived;
  onConnectionChangeCallback = onConnectionChange;

  if (!navigator.bluetooth) {
    console.error('Web Bluetooth API is not available in this browser.');
    throw new Error('Web Bluetooth is not available. Please use a compatible browser like Chrome or Edge.');
  }

  try {
    console.log('Requesting Bluetooth device...');
    device = await navigator.bluetooth.requestDevice({
      filters: [{ name: 'ForceAngleUART' }, { services: [NORDIC_UART_SERVICE_UUID] }],
    });

    if (!device) {
      throw new Error('No device selected.');
    }

    console.log('Device selected:', device.name);
    device.addEventListener('gattserverdisconnected', onDisconnected);

    console.log('Connecting to GATT Server...');
    server = await device.gatt.connect();
    console.log('Connected to GATT Server');

    console.log('Getting Nordic UART Service...');
    const service = await server.getPrimaryService(NORDIC_UART_SERVICE_UUID);
    console.log('Service found');

    console.log('Getting TX Characteristic...');
    txCharacteristic = await service.getCharacteristic(TX_CHARACTERISTIC_UUID);
    console.log('TX Characteristic found');

    console.log('Starting notifications on TX Characteristic...');
    await txCharacteristic.startNotifications();
    txCharacteristic.addEventListener('characteristicvaluechanged', handleNotifications);
    console.log('Notifications started');

    console.log('Getting RX Characteristic...');
    rxCharacteristic = await service.getCharacteristic(RX_CHARACTERISTIC_UUID);
    console.log('RX Characteristic found');

    reconnectAttempts = 0; 
    if (onConnectionChangeCallback) onConnectionChangeCallback(true, device.name);
    return device;

  } catch (error) {
    console.error('Bluetooth connection error:', error);
    if (onConnectionChangeCallback) onConnectionChangeCallback(false);
    throw error; 
  }
};

const disconnectDevice = () => {
  if (!device) {
    console.log('No device connected.');
    return;
  }
  if (device.gatt.connected) {
    console.log('Disconnecting from device...');
    device.gatt.disconnect();
  } else {
    console.log('Device already disconnected.');
  }
};

const onDisconnected = async () => {
  console.log('Device disconnected.');
  if (onConnectionChangeCallback) onConnectionChangeCallback(false, device ? device.name : null);
  
  if (txCharacteristic) {
    try {
      await txCharacteristic.stopNotifications();
      console.log('Notifications stopped.');
    } catch(error) {
      console.error('Error stopping notifications:', error);
    }
    txCharacteristic.removeEventListener('characteristicvaluechanged', handleNotifications);
  }

  txCharacteristic = null;
  rxCharacteristic = null;
  server = null;

  if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
    reconnectAttempts++;
    console.log(`Attempting to reconnect... (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000 * reconnectAttempts)); // Exponential backoff
      if (device) {
        console.log('Reconnecting to GATT Server...');
        server = await device.gatt.connect();
        console.log('Reconnected to GATT Server');
        
        const service = await server.getPrimaryService(NORDIC_UART_SERVICE_UUID);
        txCharacteristic = await service.getCharacteristic(TX_CHARACTERISTIC_UUID);
        await txCharacteristic.startNotifications();
        txCharacteristic.addEventListener('characteristicvaluechanged', handleNotifications);
        
        rxCharacteristic = await service.getCharacteristic(RX_CHARACTERISTIC_UUID);

        console.log('Reconnection successful.');
        reconnectAttempts = 0;
        if (onConnectionChangeCallback) onConnectionChangeCallback(true, device.name);
      }
    } catch (error) {
      console.error('Reconnect failed:', error);
      if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        console.error('Max reconnection attempts reached. Giving up.');
        device = null; 
      }
    }
  } else {
    console.log('Max reconnection attempts reached. Device will not auto-reconnect.');
    device = null;
  }
};

const handleNotifications = (event) => {
  const value = event.target.value;
  const decoder = new TextDecoder('utf-8');
  const text = decoder.decode(value);
  console.log('Received data:', text);
  if (onDataReceivedCallback) {
    onDataReceivedCallback(text);
  }
};

const sendData = async (data) => {
  if (!rxCharacteristic || !device || !device.gatt.connected) {
    console.error('Device not connected or RX characteristic not available.');
    throw new Error('Device not ready to send data.');
  }
  try {
    const encoder = new TextEncoder();
    await rxCharacteristic.writeValue(encoder.encode(data));
    console.log('Sent data:', data);
  } catch (error) {
    console.error('Error sending data:', error);
    throw error;
  }
};

export const bleService = {
  connectDevice,
  disconnectDevice,
  sendData,
};
