import { useCallback } from 'react';

const MAX_DATA_POINTS_LIVE = 90;

export const useBluetoothData = (
  setRawDeviceDataStream,
  setLiveStrengthValue,
  setLiveRomValue,
  setLiveForceDataPoints,
  setLiveAngleDataPoints
) => {
  const handleDataReceived = useCallback((data) => {
    setRawDeviceDataStream(prevData => {
      const updatedStream = (prevData + data).split('\n').slice(-100).join('\n');
      return updatedStream;
    });

    const lines = data.trim().split('\n');
    const newForcePoints = [];
    const newAnglePoints = [];

    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine) {
        // Parse Arduino format: "Force Measurement: #, Degree Measurement: #"
        if (trimmedLine.includes('Force Measurement:') && trimmedLine.includes('Degree Measurement:')) {
          try {
            const parts = trimmedLine.split(',');
            let forceValue = null;
            let angleValue = null;

            parts.forEach(part => {
              const trimmedPart = part.trim();
              if (trimmedPart.startsWith('Force Measurement:')) {
                const forceStr = trimmedPart.substring('Force Measurement:'.length).trim();
                forceValue = parseFloat(forceStr);
              } else if (trimmedPart.startsWith('Degree Measurement:')) {
                const angleStr = trimmedPart.substring('Degree Measurement:'.length).trim();
                angleValue = parseFloat(angleStr);
              }
            });

            const timestamp = Date.now();

            if (!isNaN(forceValue) && forceValue !== null) {
              setLiveStrengthValue(forceValue);
              newForcePoints.push({
                value: forceValue,
                timestamp: timestamp,
                isRelevant: false 
              });
            }

            if (!isNaN(angleValue) && angleValue !== null) {
              setLiveRomValue(angleValue);
              newAnglePoints.push({
                value: angleValue,
                timestamp: timestamp,
                isRelevant: false
              });
            }
          } catch (parseError) {
            console.warn("Error parsing Arduino data format:", trimmedLine, parseError);
          }
        } else if (trimmedLine.includes('Force Measurement:')) {
          // Handle force-only data
          try {
            const forceStr = trimmedLine.substring('Force Measurement:'.length).trim();
            const forceValue = parseFloat(forceStr);
            if (!isNaN(forceValue)) {
              setLiveStrengthValue(forceValue);
              newForcePoints.push({
                value: forceValue,
                timestamp: Date.now(),
                isRelevant: false 
              });
            }
          } catch (parseError) {
            console.warn("Error parsing force-only data:", trimmedLine, parseError);
          }
        } else if (trimmedLine.includes('Degree Measurement:')) {
          // Handle angle-only data
          try {
            const angleStr = trimmedLine.substring('Degree Measurement:'.length).trim();
            const angleValue = parseFloat(angleStr);
            if (!isNaN(angleValue)) {
              setLiveRomValue(angleValue);
              newAnglePoints.push({
                value: angleValue,
                timestamp: Date.now(),
                isRelevant: false
              });
            }
          } catch (parseError) {
            console.warn("Error parsing angle-only data:", trimmedLine, parseError);
          }
        } else {
          // Fallback: try to parse as plain numeric value (force only)
          const numericValue = parseFloat(trimmedLine);
          if (!isNaN(numericValue)) {
            setLiveStrengthValue(numericValue);
            newForcePoints.push({
              value: numericValue,
              timestamp: Date.now(),
              isRelevant: false 
            });
          } else {
            console.warn("Received unrecognized data format:", trimmedLine);
          }
        }
      }
    });
    
    if (newForcePoints.length > 0) {
      setLiveForceDataPoints(prevPoints => {
        const updatedPoints = [...prevPoints, ...newForcePoints];
        return updatedPoints.slice(-MAX_DATA_POINTS_LIVE); 
      });
    }

    if (newAnglePoints.length > 0) {
      setLiveAngleDataPoints(prevPoints => {
        const updatedPoints = [...prevPoints, ...newAnglePoints];
        return updatedPoints.slice(-MAX_DATA_POINTS_LIVE);
      });
    }
  }, [setRawDeviceDataStream, setLiveStrengthValue, setLiveRomValue, setLiveForceDataPoints, setLiveAngleDataPoints]);

  return { handleDataReceived };
};