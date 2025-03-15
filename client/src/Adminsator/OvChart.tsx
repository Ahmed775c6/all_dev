import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Utility function to parse date strings correctly
const parseDate = (dateString: string): Date => {
  const [datePart, timePart] = dateString.split(', ');
  const [day, month, year] = datePart.split('/').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes);
};

const OVChart = ({ data }: { data: any[] }) => {
  // Generate weekly chart data
  const generateWeeklyData = () => {

    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)); // Start on Monday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const revenueByDay = Object.fromEntries(days.map(day => [day, 0]));

    data.forEach(entry => {
  if(entry.status == "Dilivired"){
    const entryDate = parseDate(entry.data.date);
    if (entryDate >= startOfWeek && entryDate <= endOfWeek) {
      const dayIndex = (entryDate.getDay() + 6) % 7; // Adjust for Monday start
      const dayName = days[dayIndex];
      const items = JSON.parse(entry.data.items);
      let s = 0;
      s += entry.data.utiliste * entry.data.merci;
      const revenue = items.reduce((sum: number, item: any) => 
        sum + (item.quantity * parseFloat(item.current_price)), 0);
      revenueByDay[dayName] += revenue -s;
    }
  }
    });

    return days.map(day => ({ day, revenue: revenueByDay[day] }));
  };

  // Generate monthly chart data
  const generateMonthlyData = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const revenueByDay = new Array(daysInMonth).fill(0);

    data.forEach(entry => {
    if(entry.status == "Dilivired"){
      const entryDate = parseDate(entry.data.date);
      let s =0;
      if (entryDate.getMonth() === month && entryDate.getFullYear() === year) {
        const day = entryDate.getDate() - 1;
        const items = JSON.parse(entry.data.items);
     s += entry.data.utiliste * entry.data.merci;
  
        const revenue = items.reduce((sum: number, item: any) => 
          sum + (item.quantity * parseFloat(item.current_price)), 0);
        revenueByDay[day] += revenue -s;
      }
    }
    
    });


    return revenueByDay.map((revenue, index) => ({ day: index + 1, revenue }));
  };

  // Dynamic date labels
  const currentWeekNumber = Math.ceil((new Date().getDate() + new Date().getDay()) / 7);
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();

  return (
    <div className="customer-tables bg-white dark:bg-gray-900 w-full p-4 rounded-md h-[80vh] overflow-auto">
      <h2 className="w-full p-2 jsh bg-gray-200 text-black dark:text-white dark:bg-gray-600">
        Revenue Overview
      </h2>
      
      <div className="revenue-charts w-full p-2">
        {/* Weekly Revenue Chart */}
        <div className="chart-container mb-8">
          <h3 className="text-lg font-semibold mb-2">
            This Week's Revenue (Week {currentWeekNumber})
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={generateWeeklyData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#FF69B4" 
                strokeWidth={2}
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Revenue Chart */}
        <div className="chart-container">
          <h3 className="text-lg font-semibold mb-2">
            This Month's Revenue ({currentMonth} {currentYear})
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={generateMonthlyData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#FF69B4" 
                strokeWidth={2}
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OVChart;