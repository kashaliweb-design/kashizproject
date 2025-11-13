import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

const DateDifferenceCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [includeEndDate, setIncludeEndDate] = useState(false);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    if (startDate && endDate) {
      calculateDifference();
    }
  }, [startDate, endDate, includeEndDate]);

  const calculateDifference = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) {
      setResults(null);
      return;
    }

    // Calculate total difference in milliseconds
    const timeDiff = end.getTime() - start.getTime();
    const adjustment = includeEndDate ? 24 * 60 * 60 * 1000 : 0; // Add one day if including end date
    const adjustedTimeDiff = timeDiff + adjustment;

    // Calculate different units
    const totalDays = Math.floor(adjustedTimeDiff / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(adjustedTimeDiff / (1000 * 60 * 60));
    const totalMinutes = Math.floor(adjustedTimeDiff / (1000 * 60));
    const totalSeconds = Math.floor(adjustedTimeDiff / 1000);

    // Calculate years, months, days
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    if (includeEndDate) {
      days++;
      if (days > new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate()) {
        days = 1;
        months++;
        if (months > 11) {
          months = 0;
          years++;
        }
      }
    }

    // Calculate weeks and remaining days
    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;

    // Calculate business days (excluding weekends)
    let businessDays = 0;
    const currentDate = new Date(start);
    while (currentDate <= end) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
        businessDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (includeEndDate && end.getDay() !== 0 && end.getDay() !== 6) {
      // End date is already included in the loop above
    }

    setResults({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      remainingDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      businessDays
    });
  };

  const reset = () => {
    setStartDate('');
    setEndDate('');
    setIncludeEndDate(false);
    setResults(null);
  };

  const setQuickDates = (type: string) => {
    const today = new Date();
    const start = new Date(today);
    
    switch (type) {
      case 'week':
        start.setDate(today.getDate() - 7);
        break;
      case 'month':
        start.setMonth(today.getMonth() - 1);
        break;
      case 'year':
        start.setFullYear(today.getFullYear() - 1);
        break;
      case 'ytd':
        start.setMonth(0, 1); // January 1st of current year
        break;
    }
    
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);
  };

  return (
    <Layout title="Date Difference Calculator" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Select Dates</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={includeEndDate}
                    onChange={(e) => setIncludeEndDate(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-white/70 text-sm">Include end date in calculation</span>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={reset}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Reset
                </button>
                <button
                  onClick={() => {
                    const today = new Date().toISOString().split('T')[0];
                    setEndDate(today);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Today
                </button>
              </div>
            </div>

            {/* Quick Date Ranges */}
            <div className="mt-6">
              <h4 className="text-white/70 font-medium mb-3">Quick Ranges</h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setQuickDates('week')}
                  className="px-3 py-2 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
                >
                  Last Week
                </button>
                <button
                  onClick={() => setQuickDates('month')}
                  className="px-3 py-2 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
                >
                  Last Month
                </button>
                <button
                  onClick={() => setQuickDates('year')}
                  className="px-3 py-2 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
                >
                  Last Year
                </button>
                <button
                  onClick={() => setQuickDates('ytd')}
                  className="px-3 py-2 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
                >
                  Year to Date
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Date Difference</h3>
            
            {results ? (
              <div className="space-y-4">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-2">
                    {results.years > 0 && `${results.years} year${results.years > 1 ? 's' : ''}, `}
                    {results.months > 0 && `${results.months} month${results.months > 1 ? 's' : ''}, `}
                    {results.days} day{results.days !== 1 ? 's' : ''}
                  </div>
                  <div className="text-white/70">Exact Difference</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-white">{results.totalDays.toLocaleString()}</div>
                    <div className="text-white/70 text-sm">Total Days</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-blue-400">{results.businessDays.toLocaleString()}</div>
                    <div className="text-white/70 text-sm">Business Days</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-white">{results.totalWeeks}</div>
                    <div className="text-white/70 text-sm">Weeks</div>
                    {results.remainingDays > 0 && (
                      <div className="text-white/50 text-xs">+ {results.remainingDays} day{results.remainingDays > 1 ? 's' : ''}</div>
                    )}
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-white">{results.totalHours.toLocaleString()}</div>
                    <div className="text-white/70 text-sm">Total Hours</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-white">{results.totalMinutes.toLocaleString()}</div>
                    <div className="text-white/70 text-sm">Total Minutes</div>
                  </div>
                  <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-white">{results.totalSeconds.toLocaleString()}</div>
                    <div className="text-white/70 text-sm">Total Seconds</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/50">
                {startDate && endDate && new Date(startDate) > new Date(endDate) 
                  ? 'Start date must be before end date' 
                  : 'Select start and end dates to calculate difference'
                }
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        {results && (
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-medium mb-3">Date Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/70">
                    <span>Start Date:</span>
                    <span>{new Date(startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>End Date:</span>
                    <span>{new Date(endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Include End Date:</span>
                    <span>{includeEndDate ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-3">Time Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/70">
                    <span>Weekend Days:</span>
                    <span>{results.totalDays - results.businessDays}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Average Days/Month:</span>
                    <span>{(results.totalDays / Math.max(1, results.years * 12 + results.months)).toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Average Days/Year:</span>
                    <span>{results.years > 0 ? (results.totalDays / results.years).toFixed(1) : 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DateDifferenceCalculator;