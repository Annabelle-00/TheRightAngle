
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bluetooth, PlayCircle, WifiOff, Settings2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const DeviceControlCard = ({ handleConnectDevice, isConnected, bleDeviceName }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="w-full max-w-5xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="shadow-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border-blue-200 dark:border-blue-700">
        <CardHeader className="items-center">
          <CardTitle className="text-xl sm:text-2xl">Device Control & Measurement</CardTitle>
          <CardDescription className="text-xs sm:text-sm text-center">Connect to your device, start a measurement, or set your healthy baseline.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 px-4 py-3">
          <Button 
            onClick={handleConnectDevice} 
            className={`${isConnected ? 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'} text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm`}
          >
            {isConnected ? <WifiOff className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /> : <Bluetooth className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />}
            {isConnected ? 'Disconnect' : 'Connect Device'}
          </Button>
          <Button 
            onClick={() => navigate('/measure')}
            disabled={!isConnected}
            className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
          >
            <PlayCircle className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Start Measurement
          </Button>
          <Button 
            onClick={() => navigate('/set-baseline')}
            disabled={!isConnected}
            className="bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
          >
            <Settings2 className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Set Baseline
          </Button>
        </CardContent>
        <CardFooter className="text-center justify-center pt-2 pb-3">
          <p className={`text-xs ${isConnected ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            Device Status: {isConnected ? `Connected to ${bleDeviceName || 'Device'}` : 'Disconnected'}
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DeviceControlCard;
