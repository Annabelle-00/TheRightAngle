import { calculatePJHI, getPJHIStatusAndRecommendations } from '@/services/jointHealthService';

export const updateMeasurementResults = (
  newRom,
  newStrengthData,
  finalDataPoints,
  isBaselineSetting,
  appState,
  toast
) => {
  const {
    baselineRom,
    baselineForce,
    setBaselineRom,
    setBaselineForce,
    setCurrentRomValue,
    setCurrentStrengthValue,
    setRecommendations,
    setPjhiData,
    setMeasurementTestCompleted,
    setLastMeasurementData,
    measurementHistory,
    setMeasurementHistory,
    MAX_HISTORY_ITEMS
  } = appState;

  if (isBaselineSetting) {
    setBaselineRom(newRom);
    setBaselineForce(newStrengthData.avg); // Use average for baseline
    toast({
      title: "Baseline Set!",
      description: `New Baseline: ROM ${newRom}°, Avg Force ${newStrengthData.avg} lbs.`,
      variant: "success",
      duration: 5000,
    });
    setCurrentRomValue(newRom);
    setCurrentStrengthValue(newStrengthData);
    setRecommendations(["Baseline successfully updated. Perform a regular measurement to see your PJHI."]);
    setPjhiData({ pjhi: null, status: "Baseline Updated" });
    setMeasurementTestCompleted(true); 
    
    const baselineEntry = {
      date: new Date().toISOString(),
      rom: newRom,
      strength: newStrengthData,
      dataPoints: finalDataPoints,
      isBaseline: true,
      pjhiData: { pjhi: null, status: "Baseline Set" }
    };
    setLastMeasurementData(baselineEntry);
    const updatedHistory = [baselineEntry, ...measurementHistory].slice(0, MAX_HISTORY_ITEMS);
    setMeasurementHistory(updatedHistory);

  } else {
    setCurrentRomValue(newRom);
    setCurrentStrengthValue(newStrengthData); 
    setMeasurementTestCompleted(true);

    if (baselineRom === null || baselineForce === null) {
      toast({
        title: "Baseline Not Set",
        description: "Please set your healthy baseline first to calculate PJHI.",
        variant: "warning",
      });
      setPjhiData({ pjhi: null, status: "Baseline Needed" });
      setRecommendations(["Please set your healthy baseline from the homepage to get personalized recommendations."]);
      
      const currentMeasurementEntry = {
        date: new Date().toISOString(),
        rom: newRom,
        strength: newStrengthData,
        dataPoints: finalDataPoints,
        isBaseline: false,
        pjhiData: { pjhi: null, status: "Baseline Needed" }
      };
      setLastMeasurementData(currentMeasurementEntry);
      const updatedHistory = [currentMeasurementEntry, ...measurementHistory].slice(0, MAX_HISTORY_ITEMS);
      setMeasurementHistory(updatedHistory);
      return;
    }

    // Use average force instead of max force for PJHI calculation
    const { pjhi } = calculatePJHI(newRom, newStrengthData.avg, baselineRom, baselineForce);
    const { jointHealth, recommendations: newRecommendations } = getPJHIStatusAndRecommendations(
      pjhi,
      newRom,
      newStrengthData.avg,
      baselineRom,
      baselineForce
    );
    
    const currentPjhiData = { pjhi, status: jointHealth };
    setPjhiData(currentPjhiData);

    const newHistoryEntry = {
      date: new Date().toISOString(),
      rom: newRom,
      strength: newStrengthData, 
      dataPoints: finalDataPoints,
      isBaseline: false,
      pjhiData: currentPjhiData
    };
    const updatedHistory = [newHistoryEntry, ...measurementHistory].slice(0, MAX_HISTORY_ITEMS);
    setMeasurementHistory(updatedHistory);
    setLastMeasurementData(newHistoryEntry);
    setRecommendations(newRecommendations);
  }
};