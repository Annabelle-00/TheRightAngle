import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ListChecks, BookOpen, History, Phone, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import DeviceControlCard from '@/components/home/DeviceControlCard';
import LiveDataCards from '@/components/home/LiveDataCards';
import MeasurementDataCards from '@/components/home/MeasurementDataCards';
import StatusCards from '@/components/home/StatusCards';

const HomePage = ({ 
  handleConnectDevice, 
  isConnected, 
  currentRomValue, 
  currentStrengthValue, 
  liveRomValue,
  liveStrengthValue,
  recommendations, 
  rawDeviceDataStream, 
  bleDeviceName,
  measurementHistory,
  measurementTestCompleted,
  lastMeasurementData,
  pjhiData,
  baselineRom,
  baselineForce
}) => {
  const navigate = useNavigate();
  
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

  useEffect(() => {
    document.title = "The Right Angle - Home";
  }, []);

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
    <div className="flex flex-col items-center w-full space-y-6 pb-8">
      <DeviceControlCard 
        handleConnectDevice={handleConnectDevice}
        isConnected={isConnected}
        bleDeviceName={bleDeviceName}
      />

      {/* Live Data Section - Only show when connected */}
      {isConnected && (
        <LiveDataCards 
          liveRomValue={liveRomValue}
          liveStrengthValue={liveStrengthValue}
        />
      )}

      <MeasurementDataCards 
        measurementTestCompleted={measurementTestCompleted}
        lastMeasurementData={lastMeasurementData}
        rawDeviceDataStream={rawDeviceDataStream}
      />
      
      <StatusCards 
        baselineRom={baselineRom}
        baselineForce={baselineForce}
        measurementTestCompleted={measurementTestCompleted}
        pjhiData={pjhiData}
        currentRomValue={currentRomValue}
        currentStrengthValue={currentStrengthValue}
      />

      <motion.div custom={8} initial="hidden" animate="visible" variants={cardVariants} className="w-full max-w-5xl px-2 sm:px-0">
        <Card className="section-gradient dark:section-gradient shadow-lg h-full flex flex-col">
          <CardHeader>
            <div className="flex items-center">
              <ListChecks className="mr-2 h-6 w-6 sm:mr-3 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
              <CardTitle className="text-md sm:text-xl">Recommendations</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">Personalized advice based on your PJHI.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow min-h-[100px]">
            {recommendations.length > 0 && measurementTestCompleted ? (
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {recommendations.map((rec, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={index < 4 ? 'font-semibold' : ''}
                  >
                    {rec.startsWith("Goal:") || rec.startsWith("Next step:") || rec.startsWith("Status:") || rec.startsWith("Current PJHI:") || rec.startsWith("Baseline:") ? <strong>{rec.split(':')[0]}:</strong> : ''}
                    {rec.includes(':') ? rec.substring(rec.indexOf(':') + 1).trim() : rec}
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-center py-4 text-xs sm:text-sm">
                {baselineRom === null || baselineForce === null ? "Set your baseline first for personalized recommendations." : "Recommendations will appear here after measurement."}
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {measurementHistory.length > 0 && (
        <motion.div custom={9} initial="hidden" animate="visible" variants={cardVariants} className="w-full max-w-5xl px-2 sm:px-0">
          <Card className="section-gradient dark:section-gradient shadow-lg h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center">
                <History className="mr-2 h-6 w-6 sm:mr-3 sm:h-8 sm:w-8 text-amber-600 dark:text-amber-400" />
                <CardTitle className="text-md sm:text-xl">Measurement History</CardTitle>
              </div>
              <CardDescription className="text-xs sm:text-sm">Your past measurements including PJHI.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {measurementHistory.map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-2 sm:p-3 bg-slate-100 dark:bg-slate-700 rounded-md shadow text-xs"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-slate-700 dark:text-slate-200">
                        {new Date(item.date).toLocaleDateString()} - {new Date(item.date).toLocaleTimeString()}
                        {item.isBaseline && <span className="ml-2 text-xs font-bold text-blue-500 dark:text-blue-400">(BASELINE)</span>}
                      </span>
                      {item.pjhiData && item.pjhiData.pjhi !== null && !item.isBaseline && (
                        <span className={`font-bold text-sm sm:text-lg ${getPjhiColor(item.pjhiData.status)}`}>
                          PJHI: {item.pjhiData.pjhi} ({item.pjhiData.status})
                        </span>
                      )}
                       {item.pjhiData && item.isBaseline && (
                        <span className={`font-bold text-sm sm:text-lg ${getPjhiColor(item.pjhiData.status)}`}>
                          {item.pjhiData.status}
                        </span>
                      )}
                       {item.pjhiData && item.pjhiData.status === "Baseline Needed" && !item.isBaseline && (
                        <span className={`font-bold text-sm sm:text-lg ${getPjhiColor(item.pjhiData.status)}`}>
                          Baseline Needed
                        </span>
                       )}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 grid grid-cols-2 gap-x-1 sm:gap-x-2">
                      {item.strength && item.strength.max !== null ? (
                         <p>Max Strength: {item.strength.max} lbs</p>
                      ) : (
                         <p>Max Strength: N/A</p>
                      )}
                      {item.rom !== null && <p>ROM: {item.rom}°</p>}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="w-full max-w-5xl px-2 sm:px-0 grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div custom={10} initial="hidden" animate="visible" variants={cardVariants}>
          <Card className="bg-gradient-to-r from-sky-500 to-indigo-500 dark:from-sky-600 dark:to-indigo-700 shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer h-full flex flex-col" onClick={() => navigate('/learn/arthritis')}>
            <CardHeader className="flex-row items-center justify-between">
              <div className="flex items-center">
                <BookOpen className="mr-2 h-6 w-6 text-white" />
                <CardTitle><span className="text-white text-sm sm:text-lg">Learn About Joint Health</span></CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-sky-100 dark:text-sky-200 text-xs sm:text-sm">Understand joint stiffness and arthritis symptoms.</CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="text-white border-white hover:bg-white/20 w-full text-xs sm:text-sm">
                Read More
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div custom={11} initial="hidden" animate="visible" variants={cardVariants}>
          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-700 shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer h-full flex flex-col" onClick={() => navigate('/contact')}>
            <CardHeader className="flex-row items-center justify-between">
              <div className="flex items-center">
                <Phone className="mr-2 h-6 w-6 text-white" />
                <CardTitle><span className="text-white text-sm sm:text-lg">Need Help?</span></CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-green-100 dark:text-green-200 text-xs sm:text-sm">Get support for device issues or app questions.</CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="text-white border-white hover:bg-white/20 w-full text-xs sm:text-sm">
                Contact Us
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div custom={12} initial="hidden" animate="visible" variants={cardVariants}>
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-700 shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer h-full flex flex-col" onClick={() => navigate('/about')}>
            <CardHeader className="flex-row items-center justify-between">
              <div className="flex items-center">
                <Info className="mr-2 h-6 w-6 text-white" />
                <CardTitle><span className="text-white text-sm sm:text-lg">About The Device</span></CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-purple-100 dark:text-purple-200 text-xs sm:text-sm">Learn how The Right Angle works and its benefits.</CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="text-white border-white hover:bg-white/20 w-full text-xs sm:text-sm">
                Learn More
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
