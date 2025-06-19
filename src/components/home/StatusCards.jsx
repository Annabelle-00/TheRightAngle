
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BarChart3, Target, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const StatusCards = ({ 
  baselineRom, 
  baselineForce, 
  measurementTestCompleted, 
  pjhiData, 
  currentRomValue, 
  currentStrengthValue 
}) => {
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

  const getPjhiColor = (status) => {
    if (status === "Excellent") return "text-emerald-500 dark:text-emerald-400";
    if (status === "Good") return "text-lime-500 dark:text-lime-400";
    if (status === "Fair") return "text-yellow-500 dark:text-yellow-400";
    if (status === "Poor") return "text-orange-500 dark:text-orange-400";
    if (status === "Critical") return "text-red-500 dark:text-red-400";
    if (status === "Baseline Set" || status === "Baseline Updated") return "text-blue-500 dark:text-blue-400";
    return "text-slate-500 dark:text-slate-400";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl px-2 sm:px-0">
      <motion.div custom={4} initial="hidden" animate="visible" variants={cardVariants} className={`${(baselineRom !== null && baselineForce !== null) ? 'md:col-span-1 lg:col-span-1' : 'md:col-span-2 lg:col-span-3'}`}>
        <Card className="section-gradient dark:section-gradient shadow-lg h-full flex flex-col">
          <CardHeader>
            <div className="flex items-center">
              <Target className="mr-2 h-6 w-6 sm:mr-3 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
              <CardTitle className="text-md sm:text-xl">Your Baselines</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">Your personal healthy readings.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col items-center justify-center space-y-1 sm:space-y-2">
            {baselineRom !== null && baselineForce !== null ? (
              <>
                <p className="text-xl sm:text-2xl font-semibold text-purple-700 dark:text-purple-300">ROM: {baselineRom}°</p>
                <p className="text-xl sm:text-2xl font-semibold text-purple-700 dark:text-purple-300">Force: {baselineForce} lbs</p>
              </>
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm text-center px-2">Set your baseline readings first using the 'Set Baseline' button above.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {(baselineRom !== null && baselineForce !== null) && (
      <motion.div custom={5} initial="hidden" animate="visible" variants={cardVariants} className="md:col-span-1 lg:col-span-2">
        <Card className="section-gradient dark:section-gradient shadow-lg h-full flex flex-col">
          <CardHeader>
            <div className="flex items-center">
              <ShieldCheck className="mr-2 h-6 w-6 sm:mr-3 sm:h-8 sm:w-8 text-teal-600 dark:text-teal-400" />
              <CardTitle className="text-md sm:text-xl">Personal Joint Health Index (PJHI)</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">Your joint health vs. your baseline.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col items-center justify-center space-y-1 sm:space-y-2">
            {measurementTestCompleted && pjhiData && pjhiData.pjhi !== null ? (
              <>
                <p className={`text-3xl sm:text-5xl font-bold ${getPjhiColor(pjhiData.status)}`}>{pjhiData.pjhi}</p>
                <p className={`text-lg sm:text-2xl font-semibold ${getPjhiColor(pjhiData.status)}`}>{pjhiData.status}</p>
              </>
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
                {baselineRom === null || baselineForce === null ? "Set baseline first." : "Complete a test to see PJHI."}
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
      )}

      <motion.div custom={6} initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="section-gradient dark:section-gradient shadow-lg h-full flex flex-col">
          <CardHeader>
            <div className="flex items-center">
              <Activity className="mr-2 h-6 w-6 sm:mr-3 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
              <CardTitle className="text-md sm:text-xl">Test ROM</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">Last recorded ROM from test.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-center justify-center">
            {currentRomValue !== null && measurementTestCompleted ? (
              <p className="text-3xl sm:text-5xl font-bold text-blue-700 dark:text-blue-300">{currentRomValue}°</p>
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Complete a test.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div custom={7} initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="section-gradient dark:section-gradient shadow-lg h-full flex flex-col">
          <CardHeader>
            <div className="flex items-center">
              <BarChart3 className="mr-2 h-6 w-6 sm:mr-3 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" />
              <CardTitle className="text-md sm:text-xl">Test Strength</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">Last recorded strength from test.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col items-center justify-center space-y-1 sm:space-y-2">
            {currentStrengthValue && currentStrengthValue.max !== null && measurementTestCompleted ? (
              <>
                <p className="text-2xl sm:text-4xl font-bold text-green-700 dark:text-green-300">
                  Max: {currentStrengthValue.max} <span className="text-sm sm:text-lg">lbs</span>
                </p>
                {currentStrengthValue.avg !== null && (
                   <p className="text-lg sm:text-2xl text-green-600 dark:text-green-400">
                     Avg: {currentStrengthValue.avg} <span className="text-xs sm:text-sm">lbs</span>
                   </p>
                )}
              </>
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Complete a test.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StatusCards;
