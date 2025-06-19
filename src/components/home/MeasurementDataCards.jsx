
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import ForceDataChart from '@/components/ForceDataChart';

const MeasurementDataCards = ({ 
  measurementTestCompleted, 
  lastMeasurementData, 
  rawDeviceDataStream 
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

  const getStatsFromForceData = (dataArray) => {
    if (!dataArray || !Array.isArray(dataArray) || dataArray.length === 0) {
        return { average: 0, max: 0, count: 0 };
    }
    const values = dataArray.map(p => p.value);
    const sum = values.reduce((acc, val) => acc + val, 0);
    const average = values.length > 0 ? (sum / values.length) : 0;
    const max = values.length > 0 ? Math.max(...values) : 0;
    return { average: average.toFixed(2), max: max.toFixed(2), count: values.length };
  };
  
  const lastMeasurementStats = getStatsFromForceData(lastMeasurementData?.dataPoints || []);

  if (!measurementTestCompleted || !lastMeasurementData || !lastMeasurementData.dataPoints || lastMeasurementData.dataPoints.length === 0 || lastMeasurementData.isBaseline) {
    return null;
  }

  return (
    <>
      <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariants} className="w-full max-w-5xl">
         <Card className="section-gradient dark:section-gradient shadow-lg h-full flex flex-col">
          <CardHeader>
            <div className="flex items-center">
              <LineChart className="mr-2 h-6 w-6 sm:mr-3 sm:h-8 sm:w-8 text-indigo-600 dark:text-indigo-400" />
              <CardTitle className="text-md sm:text-xl">Last Measurement Force Data</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              Force readings. Avg: {lastMeasurementStats.average} lbs, Max: {lastMeasurementStats.max} lbs, Points: {lastMeasurementStats.count}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="h-48 sm:h-64 md:h-80">
              <ForceDataChart data={lastMeasurementData.dataPoints} highlightRelevant={true} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {rawDeviceDataStream && (
        <motion.div custom={3} initial="hidden" animate="visible" variants={cardVariants} className="w-full max-w-5xl">
           <Card className="section-gradient dark:section-gradient shadow-lg h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center">
                <Terminal className="mr-2 h-6 w-6 sm:mr-3 sm:h-8 sm:w-8 text-cyan-600 dark:text-cyan-400" />
                <CardTitle className="text-md sm:text-xl">Last Session Data Stream</CardTitle>
              </div>
              <CardDescription className="text-xs sm:text-sm">Raw data received from the device.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <pre className="bg-slate-100 dark:bg-slate-800 p-2 sm:p-4 rounded-md text-xs text-slate-700 dark:text-slate-300 max-h-32 sm:max-h-40 overflow-y-auto">
                {rawDeviceDataStream}
              </pre>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </>
  );
};

export default MeasurementDataCards;
