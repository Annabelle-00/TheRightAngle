const WEIGHT_ROM_PJHI = 0.6;
const WEIGHT_FORCE_PJHI = 0.4;

export const calculatePJHI = (currentRom, currentForce, baselineRom, baselineForce) => {
  if (baselineRom === null || baselineForce === null || baselineRom === 0 || baselineForce === 0) {
    console.warn("Baseline ROM or Force is not set or is zero. PJHI cannot be calculated.");
    return { pjhi: null };
  }

  const romRatio = currentRom / baselineRom;
  const forceRatio = currentForce / baselineForce;

  const pjhi = (WEIGHT_ROM_PJHI * romRatio) + (WEIGHT_FORCE_PJHI * forceRatio);
  
  return { 
    pjhi: parseFloat(pjhi.toFixed(3))
  };
};

export const getPJHIStatusAndRecommendations = (pjhi, currentRom, currentForceAvg, baselineRom, baselineForce) => {
  let jointHealth = "";
  let recommendations = [
    `Current ROM: ${currentRom}° (Baseline: ${baselineRom === null ? 'N/A' : baselineRom + '°'})`,
    `Current Avg Force: ${currentForceAvg} lbs (Baseline: ${baselineForce === null ? 'N/A' : baselineForce + ' lbs'})`,
  ];

  if (pjhi === null) {
    jointHealth = "Baseline Needed";
    recommendations.push("Status: Baseline data missing. Please set your baseline to get personalized recommendations.");
    return { jointHealth, recommendations };
  }
  
  // Add formula calculation display
  const romRatio = (currentRom / baselineRom).toFixed(3);
  const forceRatio = (currentForceAvg / baselineForce).toFixed(3);
  const formulaDisplay = `PJHI = 0.6 × (${currentRom}°/${baselineRom}°) + 0.4 × (${currentForceAvg}/${baselineForce}) = 0.6 × ${romRatio} + 0.4 × ${forceRatio} = ${pjhi}`;
  
  recommendations.unshift(`Current PJHI: ${pjhi}`);
  recommendations.splice(1, 0, `Formula: ${formulaDisplay}`);

  if (pjhi >= 1.3) {
    jointHealth = "Excellent";
    recommendations.push(...[
      "Status: Excellent Joint Health (relative to your baseline).",
      "Goal: Maintain mobility and strength.",
      "Exercises: Focus on advanced or sport-specific exercises, plyometrics, dynamic stretching."
    ]);
  } else if (pjhi >= 0.9) {
    jointHealth = "Good";
     recommendations.push(...[
      "Status: Good Joint Health (relative to your baseline).",
      "Goal: Address any mild deficits, prevent worsening.",
      "Mobility: Dynamic and static stretching (e.g., hamstring, quad, calf, shoulder stretches).",
      "Strength: Resistance bands, bodyweight exercises.",
      "Proprioception: Balance drills."
    ]);
  } else if (pjhi >= 0.7) {
    jointHealth = "Fair";
    recommendations.push(...[
      "Status: Fair Joint Health (relative to your baseline).",
      "Goal: Improve both ROM and force towards your baseline.",
      "Mobility: PNF stretching, joint mobilizations, foam rolling.",
      "Strength: Isometric holds, light resistance training, closed-chain exercises.",
      "Neuromuscular: Controlled movement patterns, slow eccentrics."
    ]);
  } else if (pjhi >= 0.4) {
    jointHealth = "Poor";
    recommendations.push(...[
      "Status: Poor Joint Health (relative to your baseline).",
      "Goal: Restore function, reduce pain, avoid injury. Work towards your baseline.",
      "Mobility: Passive stretching, gentle active-assisted ROM.",
      "Strength: Isometrics, low-load resistance, aquatic therapy.",
      "Next step: Consider consulting a physiotherapist for an individualized plan."
    ]);
  } else {
    jointHealth = "Critical";
    recommendations.push(...[
      "Status: Critical Joint Health (relative to your baseline).",
      "Goal: Medical intervention, prevent further damage. Significant deviation from your baseline.",
      "Exercises: Only under medical supervision: Gentle ROM, pain-free isometrics.",
      "Next step: Immediate medical/physio assessment required."
    ]);
  }
  
  return { jointHealth, recommendations };
};
