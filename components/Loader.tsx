
import React from 'react';
import { DnaIcon } from './icons/DnaIcon';

const loadingMessages = [
  "Analyzing genomic sequences...",
  "Cross-referencing genetic databases...",
  "Identifying significant markers...",
  "Compiling analysis report...",
  "Finalizing results...",
];

export const Loader: React.FC = () => {
  const [message, setMessage] = React.useState(loadingMessages[0]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessage(prev => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="flex flex-col items-center justify-center space-y-4 my-8">
      <DnaIcon className="w-16 h-16 text-brand-highlight animate-spin" />
      <p className="text-lg text-brand-light animate-pulse">{message}</p>
    </div>
  );
};