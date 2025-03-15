import { useState, useEffect } from "react";

const CountdownTimer = ({ expirationDate }: { expirationDate: string }) => {
  const [d, setD] = useState<number>(0);
  const [h, setH] = useState<number>(0);
  const [m, setM] = useState<number>(0);
  const [s, setS] = useState<number>(0);
  const [expired, setExpired] = useState<boolean>(false);

  useEffect(() => {
    if (!expirationDate) return;

    const targetTime = new Date(expirationDate).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        setExpired(true);
        clearInterval(timer);
        return;
      }

      setD(Math.floor(difference / (1000 * 60 * 60 * 24)));
      setH(Math.floor((difference % (1000 * 60 * 24)) / (1000 * 60 * 60)));
      setM(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
      setS(Math.floor((difference % (1000 * 60)) / 1000));
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer(); // Run once immediately

    return () => clearInterval(timer);
  }, [expirationDate]);

  if (expired) return null; // Hide when expired

  return (
    <div className="absolute top-16 left-2   ">

      <div className="flex gap-3 justify-center flex-col">
        
        <div className="flex flex-col items-center p-2   shadow-sm">
          <span className="text-xl font-bold">{d}</span>
          <span className="text-xs text-gray-400">Jours</span>
        </div>
        <div className="flex flex-col items-center p-2  shadow-sm">
          <span className="text-xl font-bold">{h}</span>
          <span className="text-xs text-gray-400">Heures</span>
        </div>
        <div className="flex flex-col items-center p-2 shadow-sm">
          <span className="text-xl font-bold">{m}</span>
          <span className="text-xs text-gray-400">Minutes</span>
        </div>
        <div className="flex flex-col items-center p-2  shadow-sm">
          <span className="text-xl font-bold">{s}</span>
          <span className="text-xs text-gray-400">Secondes</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
