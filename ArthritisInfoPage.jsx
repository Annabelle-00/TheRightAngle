import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const ArthritisInfoPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "The Right Angle - Joint Stiffness & Arthritis";
    window.scrollTo(0, 0);
  }, []);

  const paragraphStyle = "mb-4 text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300";
  const headingStyle = "text-2xl sm:text-3xl font-semibold mb-3 mt-6 text-blue-700 dark:text-blue-400";

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 dark:from-slate-900 dark:to-blue-950 text-slate-800 dark:text-slate-200 flex flex-col items-center p-4 sm:p-8 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Card className="shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-blue-200 dark:border-blue-700">
          <CardHeader className="items-center relative">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.2, duration: 0.5 }} 
              className="absolute top-4 left-4 sm:top-6 sm:left-6"
            >
              <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </motion.div>
            <div className="flex items-center justify-center pt-12 sm:pt-0">
              <Info className="mr-3 h-10 w-10 text-blue-600 dark:text-blue-400" />
              <CardTitle className="text-3xl sm:text-4xl text-center">Joint Stiffness & Arthritis</CardTitle>
            </div>
            <CardDescription className="text-center text-md sm:text-lg mt-2">Understanding the conditions affecting joint health.</CardDescription>
          </CardHeader>
          <CardContent className="px-6 sm:px-8 md:px-10 py-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.7 }}>
              <h2 className={headingStyle}>What is Joint Stiffness?</h2>
              <p className={paragraphStyle}>
                Joint Stiffness is the perceived tightness when moving a joint. It is a strong indicator of joint issues as it typically signals inflammation, cartilage degradation, and overuse. It could also be due to a variety of underlying causes such as arthritis, gout, lupus, and bone cancer. However, arthritis is the most common cause of stiffness.
              </p>

              <h2 className={headingStyle}>Understanding Arthritis</h2>
              <p className={paragraphStyle}>
                Arthritis is a condition where joints (places where two bones meet) are inflamed, usually at the elbows and knees, involving symptoms like pain, heat, and swelling. As symptoms worsen, daily activities such as getting off the toilet, gripping a pan, or even walking become difficult. Eventually, patients see a sharp decline in quality of life. Early diagnosis is key to slowing down its progression and optimizing joint function.
              </p>

              <h2 className={headingStyle}>Osteoarthritis (OA)</h2>
              <p className={paragraphStyle}>
                Osteoarthritis is a degenerative disease where the tissues in the joint break down over time. Age, obesity, joint injury, and repeated joint stress play a role in its development. According to the World Health Organization, osteoarthritis affects 528 million people around the globe.
              </p>

              <h2 className={headingStyle}>Rheumatoid Arthritis (RA)</h2>
              <p className={paragraphStyle}>
                Rheumatoid arthritis is a chronic inflammatory disorder that occurs when the immune system attacks body tissues. It causes painful swelling, which eventually leads to joint deformation and bone erosion. Currently, more than 18 million people are affected by it.
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ArthritisInfoPage;