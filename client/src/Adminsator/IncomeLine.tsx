import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

// Utility function to parse date strings
const parseDate = (dateString: string): Date => {
  const [datePart, timePart] = dateString.split(', ');
  console.log(timePart)
  const [day, month, year] = datePart.split('/').map(Number);
  return new Date(year, month - 1, day);
};

// Calculate weeks in month with Monday start
const getWeeksInMonth = (year: number, month: number) => {
  const weeks = new Set<number>();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  let current = new Date(firstDay);
  current.setDate(current.getDate() - (current.getDay() || 7) +1); // Start on Monday

  while (current <= lastDay) {
    if (current.getMonth() === month) {
      const weekNumber = Math.ceil(current.getDate() / 7);
      weeks.add(weekNumber);
    }
    current.setDate(current.getDate() + 7);
  }

  return Array.from(weeks);
};

const processIncomeData = (
  Income: any[],
  selectedYear: string,
  selectedMonth: string,
  selectedWeek: string,
  selectedGranularity: string
) => {
  const profitByTime: Record<string, number> = {};
  const yearNum = parseInt(selectedYear);
  const monthNum = parseInt(selectedMonth) - 1;

  // Date range calculation for weekly granularity
  let weekStart: Date, weekEnd: Date;
  if (selectedGranularity === 'week') {
    const weekNum = parseInt(selectedWeek);
    weekStart = new Date(yearNum, monthNum, 1);
    weekStart.setDate(weekStart.getDate() + (weekNum - 1) * 7 - (weekStart.getDay() || 7) + 1);
    weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
  }

  Income?.forEach((sale: any) => {
    const saleDate = parseDate(sale.data.date);
    
    // Determine inclusion based on granularity
    let includeSale = false;
    switch (selectedGranularity) {
      case 'week':
        includeSale = saleDate >= weekStart! && saleDate <= weekEnd!;
        break;
      case 'month':
        includeSale = saleDate.getFullYear() === yearNum;
        break;
      case 'year':
        includeSale = true;
        break;
    }

    if (!includeSale) return;

    // Calculate profit
    const items = JSON.parse(sale.data.items);
    const costs = sale.data.utiliste * sale.data.merci;
    const revenue = items.reduce((acc: number, item: any) => 
      acc + parseFloat(item.current_price) * item.quantity, 0);
    const profit = revenue - costs;

    // Create time key
    let timeKey: string | undefined;
    switch (selectedGranularity) {
      case 'week':
        timeKey = saleDate.toISOString().split('T')[0];
        break;
      case 'month':
        timeKey = `${saleDate.getFullYear()}-${(saleDate.getMonth() + 1).toString().padStart(2, '0')}`;
        break;
      case 'year':
        timeKey = saleDate.getFullYear().toString();
        break;
    }

    if (timeKey) {
      profitByTime[timeKey] = (profitByTime[timeKey] || 0) + profit;
    }
  });

  // Generate chart data
  const labels: string[] = [];
  const data: number[] = [];

  switch (selectedGranularity) {
    case 'week': {
      const current = new Date(weekStart!);
      while (current <= weekEnd!) {
        labels.push(current.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }));
        data.push(profitByTime[current.toISOString().split('T')[0]] || 0);
        current.setDate(current.getDate() + 1);
      }
      break;
    }
    case 'month':
      for (let m = 0; m < 12; m++) {
        const date = new Date(yearNum, m);
        labels.push(date.toLocaleString('default', { month: 'short' }));
        data.push(profitByTime[`${yearNum}-${(m + 1).toString().padStart(2, '0')}`] || 0);
      }
      break;
    case 'year': {
      const years = Array.from(new Set(Income?.map(sale => 
        parseDate(sale.data.date).getFullYear().toString()
      ))).sort();
      years.forEach(year => {
        labels.push(year);
        data.push(profitByTime[year] || 0);
      });
      break;
    }
  }

  return {
    labels,
    datasets: [{
      label: `${selectedGranularity.charAt(0).toUpperCase() + selectedGranularity.slice(1)} Profit`,
      data,
      borderColor: '#36A2EB',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderWidth: 2,
      fill: true,
    }],
  };
};

const DisplayIncomeChart = ({ Income }: { Income: any[] }) => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedMonth, setSelectedMonth] = useState('03');
  const [selectedWeek, setSelectedWeek] = useState('1');
  const [selectedGranularity, setSelectedGranularity] = useState('month');

  // Extract available years
  const years = Array.from(new Set(Income?.map(sale =>
    parseDate(sale.data.date).getFullYear().toString()
  ))).sort();

  // Update available months when year changes
  const months: string[] = Array.from(new Set(Income
    ?.filter(sale => parseDate(sale.data.date).getFullYear().toString() === selectedYear)
    .map(sale => (parseDate(sale.data.date).getMonth() + 1).toString().padStart(2, '0'))
  )).sort();

  // Update weeks when month changes
  const weeks = selectedGranularity === 'week' 
    ? getWeeksInMonth(parseInt(selectedYear), parseInt(selectedMonth) - 1)
    : [];

  // Reset selections when data changes
  useEffect(() => {
    if (!years.includes(selectedYear)) setSelectedYear(years[0] || '2025');
    if (!months.includes(selectedMonth)) setSelectedMonth(months[0] || '01');
    if (!weeks.includes(parseInt(selectedWeek))) setSelectedWeek(weeks[0]?.toString() || '1');
  }, [years, months, weeks]);

  const chartData = processIncomeData(Income, selectedYear, selectedMonth, selectedWeek, selectedGranularity);

  return (
    <div className="w-full flex flex-col items-center p-4">
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          className="p-2 border rounded"
          value={selectedYear}
          onChange={e => setSelectedYear(e.target.value)}
        >
          {years.map(year => <option key={year} value={year}>{year}</option>)}
        </select>

        {selectedGranularity === 'week' && (
          <>
            <select
              className="p-2 border rounded"
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
            >
              {months.map(month => (
                <option key={month} value={month}>
                  {new Date(`${selectedYear}-${month}-01`).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>

            <select
              className="p-2 border rounded"
              value={selectedWeek}
              onChange={e => setSelectedWeek(e.target.value)}
            >
              {weeks.map(week => (
                <option key={week} value={week}>Week {week}</option>
              ))}
            </select>
          </>
        )}
      </div>

      <div className="flex gap-2 mb-4">
        {['year', 'month', 'week'].map(gran => (
          <button
            key={gran}
            className={`p-2 rounded ${
              selectedGranularity === gran 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setSelectedGranularity(gran)}
          >
            {gran.charAt(0).toUpperCase() + gran.slice(1)}
          </button>
        ))}
      </div>

      <div className="w-full h-96">
        <Line 
          data={chartData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true }
            }
          }}
        />
      </div>
    </div>
  );
};

export default DisplayIncomeChart;