import { useState, useEffect } from 'react';

const MAX_HISTORY_ITEMS = 10;

export const useAppState = () => {
  const [baselineRom, setBaselineRom] = useState(
    () => JSON.parse(localStorage.getItem('baselineRom')) || null
  );
  const [baselineForce, setBaselineForce] = useState(
    () => JSON.parse(localStorage.getItem('baselineForce')) || null 
  );

  const [currentRomValue, setCurrentRomValue] = useState(null);
  const [currentStrengthValue, setCurrentStrengthValue] = useState(
    () => JSON.parse(localStorage.getItem('currentStrengthValue')) || { max: 0, avg: 0 }
  );

  const [liveRomValue, setLiveRomValue] = useState(null);
  const [liveStrengthValue, setLiveStrengthValue] = useState(null);

  const [recommendations, setRecommendations] = useState(
    () => JSON.parse(localStorage.getItem('recommendations')) || []
  );
  const [isConnected, setIsConnected] = useState(false);
  const [rawDeviceDataStream, setRawDeviceDataStream] = useState(""); 
  const [bleDevice, setBleDevice] = useState(null);
  const [liveForceDataPoints, setLiveForceDataPoints] = useState([]);
  const [liveAngleDataPoints, setLiveAngleDataPoints] = useState([]);
  const [measurementHistory, setMeasurementHistory] = useState(
    () => JSON.parse(localStorage.getItem('measurementHistory')) || []
  );
  const [measurementTestCompleted, setMeasurementTestCompleted] = useState(
     () => JSON.parse(localStorage.getItem('measurementTestCompleted')) || false
  );
  const [lastMeasurementData, setLastMeasurementData] = useState(
    () => JSON.parse(localStorage.getItem('lastMeasurementData')) || { 
      rom: null, 
      strength: {max: 0, avg: 0}, 
      dataPoints: [], 
      pjhiData: { pjhi: null, status: "N/A"} 
    }
  );
  const [pjhiData, setPjhiData] = useState(
    () => JSON.parse(localStorage.getItem('pjhiData')) || { pjhi: null, status: "N/A" }
  );

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);
  
  useEffect(() => {
    localStorage.setItem('baselineRom', JSON.stringify(baselineRom));
  }, [baselineRom]);

  useEffect(() => {
    localStorage.setItem('baselineForce', JSON.stringify(baselineForce));
  }, [baselineForce]);

  useEffect(() => {
    localStorage.setItem('currentStrengthValue', JSON.stringify(currentStrengthValue));
  }, [currentStrengthValue]);

  useEffect(() => {
    localStorage.setItem('recommendations', JSON.stringify(recommendations));
  }, [recommendations]);

  useEffect(() => {
    localStorage.setItem('measurementHistory', JSON.stringify(measurementHistory));
  }, [measurementHistory]);

  useEffect(() => {
    localStorage.setItem('measurementTestCompleted', JSON.stringify(measurementTestCompleted));
  }, [measurementTestCompleted]);
  
  useEffect(() => {
    localStorage.setItem('lastMeasurementData', JSON.stringify(lastMeasurementData));
  }, [lastMeasurementData]);

  useEffect(() => {
    localStorage.setItem('pjhiData', JSON.stringify(pjhiData));
  }, [pjhiData]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return {
    baselineRom,
    setBaselineRom,
    baselineForce,
    setBaselineForce,
    currentRomValue,
    setCurrentRomValue,
    currentStrengthValue,
    setCurrentStrengthValue,
    liveRomValue,
    setLiveRomValue,
    liveStrengthValue,
    setLiveStrengthValue,
    recommendations,
    setRecommendations,
    isConnected,
    setIsConnected,
    rawDeviceDataStream,
    setRawDeviceDataStream,
    bleDevice,
    setBleDevice,
    liveForceDataPoints,
    setLiveForceDataPoints,
    liveAngleDataPoints,
    setLiveAngleDataPoints,
    measurementHistory,
    setMeasurementHistory,
    measurementTestCompleted,
    setMeasurementTestCompleted,
    lastMeasurementData,
    setLastMeasurementData,
    pjhiData,
    setPjhiData,
    isDarkMode,
    toggleDarkMode,
    MAX_HISTORY_ITEMS
  };
};
