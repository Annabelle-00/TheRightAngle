import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import HomePage from '@/pages/HomePage';
import MeasurementPage from '@/pages/MeasurementPage';
import ArthritisInfoPage from '@/pages/ArthritisInfoPage';
import BaselinePage from '@/pages/BaselinePage';
import ContactPage from '@/pages/ContactPage';
import AboutPage from '@/pages/AboutPage';
import { Layout } from '@/components/Layout';
import { useAppState } from '@/hooks/useAppState';
import { useBluetoothData } from '@/hooks/useBluetoothData';
import { useBluetoothConnection } from '@/hooks/useBluetoothConnection';
import { updateMeasurementResults } from '@/services/measurementService';

const App = () => {
  const { toast } = useToast();
  const appState = useAppState();
  
  const {
    baselineRom,
    baselineForce,
    currentRomValue,
    currentStrengthValue,
    liveRomValue,
    liveStrengthValue,
    recommendations,
    isConnected,
    rawDeviceDataStream,
    bleDevice,
    liveForceDataPoints,
    liveAngleDataPoints,
    measurementHistory,
    measurementTestCompleted,
    lastMeasurementData,
    pjhiData,
    isDarkMode,
    toggleDarkMode,
    setBleDevice,
    setIsConnected,
    setLiveForceDataPoints,
    setLiveAngleDataPoints,
    setRawDeviceDataStream,
    setMeasurementTestCompleted,
    setLiveRomValue,
    setLiveStrengthValue
  } = appState;

  const { handleDataReceived } = useBluetoothData(
    setRawDeviceDataStream,
    setLiveStrengthValue,
    setLiveRomValue,
    setLiveForceDataPoints,
    setLiveAngleDataPoints
  );

  const { handleConnectDevice } = useBluetoothConnection(
    toast,
    setBleDevice,
    setIsConnected,
    setLiveForceDataPoints,
    setLiveAngleDataPoints,
    setRawDeviceDataStream,
    setMeasurementTestCompleted,
    setLiveRomValue,
    setLiveStrengthValue
  );

  const updateResults = (newRom, newStrengthData, finalDataPoints, isBaselineSetting = false) => {
    updateMeasurementResults(
      newRom,
      newStrengthData,
      finalDataPoints,
      isBaselineSetting,
      appState,
      toast
    );
  };

  const connectDevice = () => {
    handleConnectDevice(bleDevice, isConnected, handleDataReceived);
  };

  return (
    <>
      <Toaster />
      <Layout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                handleConnectDevice={connectDevice}
                isConnected={isConnected}
                currentRomValue={currentRomValue}
                currentStrengthValue={currentStrengthValue}
                liveRomValue={liveRomValue}
                liveStrengthValue={liveStrengthValue}
                recommendations={recommendations}
                rawDeviceDataStream={rawDeviceDataStream} 
                bleDeviceName={bleDevice ? bleDevice.name : null}
                measurementHistory={measurementHistory}
                measurementTestCompleted={measurementTestCompleted}
                lastMeasurementData={lastMeasurementData}
                pjhiData={pjhiData}
                baselineRom={baselineRom}
                baselineForce={baselineForce}
              />
            } 
          />
          <Route 
            path="/measure" 
            element={
              <MeasurementPage 
                updateResults={updateResults} 
                liveForceDataPoints={liveForceDataPoints}
                liveAngleDataPoints={liveAngleDataPoints}
                setLiveForceDataPoints={setLiveForceDataPoints}
                setLiveAngleDataPoints={setLiveAngleDataPoints}
                liveRomValue={liveRomValue}
                liveStrengthValue={liveStrengthValue}
                isBaselineSetting={false}
              />
            } 
          />
          <Route 
            path="/set-baseline"
            element={
              <BaselinePage
                updateResults={updateResults}
                liveForceDataPoints={liveForceDataPoints}
                liveAngleDataPoints={liveAngleDataPoints}
                setLiveForceDataPoints={setLiveForceDataPoints}
                setLiveAngleDataPoints={setLiveAngleDataPoints}
                liveRomValue={liveRomValue}
                liveStrengthValue={liveStrengthValue}
                isConnected={isConnected}
              />
            }
          />
          <Route
            path="/learn/arthritis"
            element={<ArthritisInfoPage />}
          />
          <Route
            path="/contact"
            element={<ContactPage />}
          />
          <Route
            path="/about"
            element={<AboutPage />}
          />
        </Routes>
      </Layout>
    </>
  );
};

export default App;