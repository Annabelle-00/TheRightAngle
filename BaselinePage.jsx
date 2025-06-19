
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import MeasurementPage from '@/pages/MeasurementPage'; 
import { Target, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const BaselinePage = ({ 
  updateResults, 
  liveForceDataPoints, 
  liveAngleDataPoints,
  setLiveForceDataPoints, 
  setLiveAngleDataPoints,
  liveRomValue,
  liveStrengthValue,
  isConnected 
}) => {
  const navigate = useNavigate();

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 to-orange-200 dark:from-red-900 dark:to-orange-900 text-slate-800 dark:text-slate-200 flex flex-col items-center justify-center p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center"
        >
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg shadow-xl">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <AlertTriangle className="w-16 h-16 text-red-500 dark:text-red-400" />
              </div>
              <CardTitle className="text-2xl">Device Not Connected</CardTitle>
              <CardDescription className="text-base">
                Please connect to your Right Angle device on the homepage before attempting to set a baseline.
              </CardDescription>
            </CardHeader>
            <CardFooter className="justify-center">
              <Button onClick={() => navigate('/')} className="bg-blue-500 hover:bg-blue-600 text-white">
                Go to Homepage
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-teal-200 dark:from-green-900 dark:to-teal-900 text-slate-800 dark:text-slate-200 flex flex-col items-center justify-center p-2 sm:p-4">
       <motion.div 
        className="w-full max-w-3xl mb-4 sm:mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-2">
            <Target className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-700 dark:text-slate-200">Set Your Healthy Baseline</h1>
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Perform these measurements when your joint feels healthy and at its best. This will be your personal reference for future tests.
          </p>
        </div>
      </motion.div>
      <MeasurementPage
        updateResults={updateResults}
        liveForceDataPoints={liveForceDataPoints}
        liveAngleDataPoints={liveAngleDataPoints}
        setLiveForceDataPoints={setLiveForceDataPoints}
        setLiveAngleDataPoints={setLiveAngleDataPoints}
        liveRomValue={liveRomValue}
        liveStrengthValue={liveStrengthValue}
        isBaselineSetting={true}
      />
    </div>
  );
};

export default BaselinePage;
