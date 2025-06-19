import { useCallback } from 'react';
import { bleService } from '@/services/bleService';

export const useBluetoothConnection = (
  toast,
  setBleDevice,
  setIsConnected,
  setLiveForceDataPoints,
  setLiveAngleDataPoints,
  setRawDeviceDataStream,
  setMeasurementTestCompleted,
  setLiveRomValue,
  setLiveStrengthValue
) => {
  const handleConnectionChange = useCallback((connected, deviceName) => {
    setIsConnected(connected);
    if (connected) {
      toast({
        title: "Device Connected",
        description: `Successfully connected to ${deviceName || 'your BLE device'}.`,
        variant: "success",
      });
      setLiveForceDataPoints([]); 
      setLiveAngleDataPoints([]);
      setRawDeviceDataStream(""); 
      setMeasurementTestCompleted(false);
      setLiveRomValue(null);
      setLiveStrengthValue(null);
    } else {
      setBleDevice(null);
      setLiveRomValue(null);
      setLiveStrengthValue(null);
      toast({
        title: "Device Disconnected",
        description: "Lost connection to the BLE device.",
        variant: "destructive",
      });
    }
  }, [toast, setBleDevice, setIsConnected, setLiveForceDataPoints, setLiveAngleDataPoints, setRawDeviceDataStream, setMeasurementTestCompleted, setLiveRomValue, setLiveStrengthValue]);

  const handleConnectDevice = async (bleDevice, isConnected, handleDataReceived) => {
    if (bleDevice && isConnected) {
      bleService.disconnectDevice();
    } else {
      try {
        const device = await bleService.connectDevice(handleDataReceived, handleConnectionChange);
        setBleDevice(device);
      } catch (error) {
        toast({
          title: "Connection Failed",
          description: error.message,
          variant: "destructive",
        });
        setIsConnected(false);
        setBleDevice(null);
      }
    }
  };

  return { handleConnectionChange, handleConnectDevice };
};