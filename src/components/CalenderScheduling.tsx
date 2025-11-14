import { useState, useMemo } from 'react';
import AnalyticsCard from './AnalysisCard';

function CalenderScheduling() {
  const calendarData = [
    { date: '2024-11-01', status: 'Past' },
    { date: '2024-11-02', status: 'Past' },
    { date: '2024-11-03', status: 'Past' },
    { date: '2024-11-04', status: 'Past' },
    { date: '2024-11-05', status: 'Past' },

    { date: '2024-11-06', status: 'Booked', value: 6 },
    { date: '2024-11-07', status: 'Maintenance', value: 2 },
    { date: '2024-11-08', status: 'Available', value: 13 },
    { date: '2024-11-09', status: 'Booked', value: 9 },
    { date: '2024-11-10', status: 'Available', value: 13 },

    { date: '2024-11-11', status: 'Available', value: 11 },
    { date: '2024-11-12', status: 'Booked', value: 9 },
    { date: '2024-11-13', status: 'Available', value: 14 },
    { date: '2024-11-14', status: 'Maintenance', value: 1 },
    { date: '2024-11-15', status: 'Booked', value: 9 },
    { date: '2024-11-16', status: 'Available', value: 13 },
    { date: '2024-11-17', status: 'Available', value: 10 },

    { date: '2024-11-18', status: 'Booked', value: 7 },
    { date: '2024-11-19', status: 'Available', value: 10 },
    { date: '2024-11-20', status: 'Available', value: 12 },
    { date: '2024-11-21', status: 'Maintenance', value: 2 },
    { date: '2024-11-22', status: 'Available', value: 14 },
    { date: '2024-11-23', status: 'Available', value: 11 },
    { date: '2024-11-24', status: 'Booked', value: 5 },

    { date: '2024-11-25', status: 'Available', value: 14 },
    { date: '2024-11-26', status: 'Available', value: 11 },
    { date: '2024-11-27', status: 'Booked', value: 5 },
    { date: '2024-11-28', status: 'Maintenance', value: 0 },
    { date: '2024-11-29', status: 'Available', value: 12 },
    { date: '2024-11-30', status: 'Booked', value: 9 },
  ];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [currentDate, setCurrentDate] = useState(
    new Date('2024-11-01T00:00:00')
  );

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const calendarGrid = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const grid: ({ day: number; status: string; value?: number } | null)[] = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      grid.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayString = `${year}-${String(month + 1).padStart(2, '0')}-${String(
        i
      ).padStart(2, '0')}`;
      const dayData = calendarData.find((event) => event.date === dayString);

      grid.push({
        day: i,
        status: dayData?.status || '',
        value: dayData?.value,
      });
    }

    while (grid.length % 7 !== 0) {
      grid.push(null);
    }

    return grid;
  }, [currentDate]);

  return (
    <>
      <h3 className="fw-semibold mt-5 pb-2 sub-title">Calendar Scheduling</h3>
      <div className="border rounded-3 py-4 px-5 overflow-x-scroll">
        <div
          className="d-flex flex-row align-items-center justify-content-between"
          style={{ minWidth: '1180px' }}
        >
          <h5 className="fw-semibold mb-1">
            {currentDate.toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
          </h5>
          <div className="d-flex flex-row gap-2">
            <button className="btn sec-btn" onClick={handlePreviousMonth}>
              Previous
            </button>
            <button className="btn sec-btn" onClick={handleNextMonth}>
              Next
            </button>
          </div>
        </div>
        <div
          className="mt-5 border-bottom"
          style={{
            minWidth: '1180px',
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '8px',
          }}
        >
          {days.map((day, index) => (
            <div
              key={index}
              className="text-center pb-2"
              style={{ width: '100%' }}
            >
              {day}
            </div>
          ))}
        </div>

        <div
          className="mt-4"
          style={{
            minWidth: '1180px',
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '8px',
          }}
        >
          {calendarGrid.map((day, index) => (
            <div key={index} style={{ width: '100%', padding: '4px' }}>
              {day && (
                <AnalyticsCard
                  title=""
                  body={day.day.toString()}
                  unit={
                    day.status +
                    (day.value !== undefined ? `: ${day.value}` : '')
                  }
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CalenderScheduling;
