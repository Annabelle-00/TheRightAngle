import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone, MessageCircle, Headphones as HeadphonesIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "The Right Angle - Contact Us";
  }, []);

  const handleEmailClick = () => {
    window.location.href = 'mailto:pan546zachary@gmail.com?subject=The Right Angle - Support Request';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+14103022012';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-200 dark:from-blue-900 dark:to-indigo-900 text-slate-800 dark:text-slate-200 flex flex-col items-center justify-center p-4 sm:p-8 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-blue-300 dark:border-blue-600">
          <CardHeader className="items-center relative">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="absolute top-4 left-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </motion.div>
            <div className="flex items-center justify-center mb-4 pt-12 sm:pt-4">
              <HeadphonesIcon className="mr-3 h-8 w-8 text-blue-600 dark:text-blue-400" />
              <CardTitle className="text-2xl sm:text-3xl text-center">Contact Us</CardTitle>
            </div>
            <CardDescription className="text-center text-sm sm:text-base">
              Need help with your device or have questions about the app? We're here to help!
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 py-6 sm:py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Having issues with your Right Angle device or need technical support? 
                Get in touch with us using any of the methods below:
              </p>
            </motion.div>

            <div className="grid gap-4 sm:gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-200 dark:border-blue-700 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-full">
                        <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200">Email Support</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                          Send us a detailed message about your issue
                        </p>
                        <Button 
                          onClick={handleEmailClick}
                          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          pan546zachary@gmail.com
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-green-200 dark:border-green-700 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-green-100 dark:bg-green-800 rounded-full">
                        <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200">Phone Support</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                          Call us directly for immediate assistance
                        </p>
                        <Button 
                          onClick={handlePhoneClick}
                          className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white"
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          410-302-2012
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4"
            >
              <div className="flex items-start space-x-3">
                <MessageCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                    When contacting us, please include:
                  </h4>
                  <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                    <li>• Description of the issue you're experiencing</li>
                    <li>• Device model and any error messages</li>
                    <li>• Steps you've already tried to resolve the problem</li>
                    <li>• Your contact information for follow-up</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                We typically respond to support requests within 24 hours during business days.
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ContactPage;