
import React from 'react';
import SubmissionForm from '@/components/SubmissionForm';
import { Mosque, MapPin, ClipboardEdit } from 'lucide-react';

const Submit = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="pt-10 pb-16 bg-islamic-50/50 geometric-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 staggered-fade-in">
            <div className="mx-auto w-16 h-16 bg-islamic-100 rounded-full flex items-center justify-center mb-6">
              <ClipboardEdit className="h-8 w-8 text-islamic-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Submit a Taraweeh Location
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Help the Muslim community by submitting details about a mosque or prayer space offering Taraweeh prayers during Ramadan.
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-12 -mt-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <SubmissionForm />
          
          <div className="mt-12 bg-islamic-50 rounded-xl p-6">
            <div className="flex items-start">
              <div className="bg-islamic-100 p-3 rounded-full mr-4">
                <Mosque className="h-6 w-6 text-islamic-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">About Taraweeh Prayers</h3>
                <p className="text-muted-foreground mb-4">
                  Taraweeh prayers are special prayers performed by Muslims during the holy month of Ramadan. They are typically performed after the night prayer (Isha) and can vary in length from 8 to 20 rakaat (prayer cycles) depending on the mosque.
                </p>
                <p className="text-muted-foreground">
                  By helping us compile a comprehensive list of Taraweeh prayer locations, you're making it easier for Muslims in Australia to find places to worship during Ramadan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Submit;
