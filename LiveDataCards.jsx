
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Radio, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const LiveDataCards = ({ liveRomValue, liveStrengthValue }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div 
      className="w-full max-w-5xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants}>
          <Card className="bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-900/50 dark:to-blue-900/50 border-cyan-200 dark:border-cyan-700 shadow-lg h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center">
                <Radio className="mr-2 h-6 w-6 sm:mr-3 sm:h-8 sm:w-8 text-cyan-600 dark:text-cyan-400" />
                <CardTitle className="text-md sm:text-xl text-cyan-700 dark:text-cyan-300">Live ROM</CardTitle>
              </div>
              <CardDescription className="text-xs sm:text-sm text-cyan-600 dark:text-cyan-400">Real-time range of motion reading.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-center justify-center">
              {liveRomValue !== null ? (
                <div className="text-center">
                  <p className="text-4xl sm:text-6xl font-bold text-cyan-700 dark:text-cyan-300">{liveRomValue.toFixed(1)}°</p>
                  <p className="text-xs sm:text-sm text-cyan-600 dark:text-cyan-400 mt-1">Live Reading</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="animate-pulse">
                    <div className="h-12 sm:h-16 w-24 sm:w-32 bg-cyan-200 dark:bg-cyan-800 rounded-lg mb-2"></div>
                  </div>
                  <p className="text-cyan-500 dark:text-cyan-400 text-xs sm:text-sm">Waiting for ROM data...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants}>
          <Card className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/50 dark:to-red-900/50 border-orange-200 dark:border-orange-700 shadow-lg h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center">
                <Zap className="mr-2 h-6 w-6 sm:mr-3 sm:h-8 sm:w-8 text-orange-600 dark:text-orange-400" />
                <CardTitle className="text-md sm:text-xl text-orange-700 dark:text-orange-300">Live Strength</CardTitle>
              </div>
              <CardDescription className="text-xs sm:text-sm text-orange-600 dark:text-orange-400">Real-time force measurement.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-center justify-center">
              {liveStrengthValue !== null ? (
                <div className="text-center">
                  <p className="text-4xl sm:text-6xl font-bold text-orange-700 dark:text-orange-300">{liveStrengthValue.toFixed(1)} <span className="text-lg sm:text-2xl">lbs</span></p>
                  <p className="text-xs sm:text-sm text-orange-600 dark:text-orange-400 mt-1">Live Reading</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="animate-pulse">
                    <div className="h-12 sm:h-16 w-24 sm:w-32 bg-orange-200 dark:bg-orange-800 rounded-lg mb-2"></div>
                  </div>
                  <p className="text-orange-500 dark:text-orange-400 text-xs sm:text-sm">Waiting for force data...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LiveDataCards;
