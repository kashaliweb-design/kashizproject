import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [age, setAge] = useState<any>(null);

  useEffect(() => {
    if (birthDate && targetDate) {
      calculateAge();
    }
  }, [birthDate, targetDate]);

  const calculateAge = () => {
    const birth = new Date(birthDate);
    const target = new Date(targetDate);
    
    if (birth > target) {
      setAge(null);
      return;
    }

    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60));
    const totalMinutes = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60));
    const totalSeconds = Math.floor((target.getTime() - birth.getTime()) / 1000);

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Next birthday calculation
    let nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= target) {
      nextBirthday.setFullYear(target.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    setAge({
      years,
      months,
      days,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      daysToNextBirthday,
      nextBirthday: nextBirthday.toLocaleDateString()
    });
  };

  const reset = () => {
    setBirthDate('');
    setTargetDate(new Date().toISOString().split('T')[0]);
    setAge(null);
  };

  return (
    <Layout title="Age Calculator" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Enter Dates</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Birth Date
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Calculate Age On (Target Date)
                </label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <button
                onClick={reset}
                className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Result Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Age Result</h3>
            
            {age ? (
              <div className="space-y-4">
                <div className="text-center backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <div className="text-3xl font-bold text-white mb-2">
                    {age.years} Years, {age.months} Months, {age.days} Days
                  </div>
                  <div className="text-white/70">Exact Age</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-white">{age.totalDays.toLocaleString()}</div>
                    <div className="text-white/70 text-sm">Total Days</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-white">{age.totalHours.toLocaleString()}</div>
                    <div className="text-white/70 text-sm">Total Hours</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-white">{age.totalMinutes.toLocaleString()}</div>
                    <div className="text-white/70 text-sm">Total Minutes</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-white">{age.totalSeconds.toLocaleString()}</div>
                    <div className="text-white/70 text-sm">Total Seconds</div>
                  </div>
                </div>

                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4 text-center">
                  <div className="text-lg font-bold text-cyan-400">{age.daysToNextBirthday}</div>
                  <div className="text-white/70 text-sm">Days to Next Birthday</div>
                  <div className="text-white/60 text-xs mt-1">({age.nextBirthday})</div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50">
                {birthDate && targetDate && new Date(birthDate) > new Date(targetDate) 
                  ? 'Birth date cannot be after target date' 
                  : 'Enter your birth date to calculate age'
                }
              </div>
            )}
          </div>
        </div>

        {/* Age Milestones */}
        {age && (
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Age Milestones</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-white/70">Sweet 16</div>
                <div className="text-white">{age.years >= 16 ? '✅ Reached' : `${16 - age.years} years to go`}</div>
              </div>
              <div className="text-center">
                <div className="text-white/70">Legal Adult</div>
                <div className="text-white">{age.years >= 18 ? '✅ Reached' : `${18 - age.years} years to go`}</div>
              </div>
              <div className="text-center">
                <div className="text-white/70">Quarter Century</div>
                <div className="text-white">{age.years >= 25 ? '✅ Reached' : `${25 - age.years} years to go`}</div>
              </div>
              <div className="text-center">
                <div className="text-white/70">Half Century</div>
                <div className="text-white">{age.years >= 50 ? '✅ Reached' : `${50 - age.years} years to go`}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AgeCalculator;