import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Info, Zap, Activity, TrendingUp, Shield, Clock, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "The Right Angle - About Us";
  }, []);

  const features = [
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Range of Motion Tracking",
      description: "Uses a potentiometer to measure the angle of rotation with precision"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Muscle Strength Measurement",
      description: "Load cell technology measures the force exerted by muscles around joints"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Real-time Data",
      description: "See your measurements instantly and track changes over extended periods"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Non-invasive Design",
      description: "Safe, comfortable, and easy-to-use wearable device"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Time-saving",
      description: "Reduces the need for frequent physical therapist visits"
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Affordable Solution",
      description: "Cost-effective alternative to traditional monitoring methods"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-200 dark:from-blue-900 dark:to-indigo-900 text-slate-800 dark:text-slate-200 flex flex-col items-center justify-center p-4 sm:p-8 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-blue-300 dark:border-blue-600">
          <CardHeader className="items-center relative">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="absolute top-4 left-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </motion.div>
            <div className="flex items-center justify-center mb-4 pt-12 sm:pt-4">
              <Info className="mr-3 h-8 w-8 text-blue-600 dark:text-blue-400" />
              <CardTitle className="text-2xl sm:text-3xl text-center">About The Right Angle</CardTitle>
            </div>
            <CardDescription className="text-center text-sm sm:text-base">
              Innovative wearable technology for joint health monitoring
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 py-6 sm:py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-200 dark:border-blue-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">What is The Right Angle?</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    The Right Angle is a wearable, personal monitoring device designed to measure the active range of motion (ROM) and muscle strength exerted by a user's elbow or knee joint movement. It uses a potentiometer to measure the angle of rotation and a load cell to measure the force exerted by muscles around the joints.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    The Right Angle is designed to be an easy-to-use, non-invasive, and affordable option that saves time compared to traditional physical therapist visits. The system can be connected to an app that allows users to see their real-time data and track changes continuously over extended periods. It also provides quick feedback and advice on certain stretches or activities that help improve mobility and stiffness.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Card className="bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 hover:shadow-md transition-shadow duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg text-blue-600 dark:text-blue-400">
                            {feature.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-1">
                              {feature.title}
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border-amber-200 dark:border-amber-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Health Monitoring & Early Detection</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    The Right Angle measures the range of motion and strength of the elbow and knee to detect stiffness and changes in mobility that may indicate arthritis or joint disorders. While the device is not the equivalent of visiting a physical therapist, it can be an important early or pre-indicator of joint health issues, helping users identify potential issues and make informed decisions about scheduling appointments.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    The device also eliminates the need for any extra time-consuming check-ups by providing continuous monitoring and personalized insights right from your home.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6"
            >
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                Important Note
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                The Right Angle is designed as a monitoring and early detection tool. It is not intended to replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical concerns and treatment decisions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="text-center"
            >
              <Button 
                onClick={() => navigate('/')}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-2"
              >
                Get Started with The Right Angle
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AboutPage;