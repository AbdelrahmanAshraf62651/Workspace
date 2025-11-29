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
    { date: '2024-11-10', status: 'Available', value: 11 },
    { date: '2024-11-11', status: 'Available', value: 10 },
    { date: '2024-11-12', status: 'Booked', value: 7 },
    { date: '2024-11-13', status: 'Available', value: 12 },
    { date: '2024-11-14', status: 'Maintenance', value: 1 },
    { date: '2024-11-15', status: 'Booked', value: 8 },
    { date: '2024-11-16', status: 'Available', value: 14 },
    { date: '2024-11-17', status: 'Available', value: 9 },
    { date: '2024-11-18', status: 'Booked', value: 5 },
    { date: '2024-11-19', status: 'Available', value: 12 },
    { date: '2024-11-20', status: 'Available', value: 11 },
    { date: '2024-11-21', status: 'Maintenance', value: 3 },
    { date: '2024-11-22', status: 'Available', value: 14 },
    { date: '2024-11-23', status: 'Available', value: 10 },
    { date: '2024-11-24', status: 'Booked', value: 6 },
    { date: '2024-11-25', status: 'Available', value: 13 },
    { date: '2024-11-26', status: 'Available', value: 11 },
    { date: '2024-11-27', status: 'Booked', value: 7 },
    { date: '2024-11-28', status: 'Maintenance', value: 2 },
    { date: '2024-11-29', status: 'Available', value: 12 },
    { date: '2024-11-30', status: 'Booked', value: 9 },

    { date: '2024-12-01', status: 'Booked', value: 8 },
    { date: '2024-12-02', status: 'Available', value: 13 },
    { date: '2024-12-03', status: 'Available', value: 10 },
    { date: '2024-12-04', status: 'Booked', value: 7 },
    { date: '2024-12-05', status: 'Maintenance', value: 2 },
    { date: '2024-12-06', status: 'Available', value: 12 },
    { date: '2024-12-07', status: 'Booked', value: 9 },
    { date: '2024-12-08', status: 'Available', value: 11 },
    { date: '2024-12-09', status: 'Available', value: 14 },
    { date: '2024-12-10', status: 'Maintenance', value: 1 },
    { date: '2024-12-11', status: 'Booked', value: 6 },
    { date: '2024-12-12', status: 'Available', value: 13 },
    { date: '2024-12-13', status: 'Available', value: 10 },
    { date: '2024-12-14', status: 'Booked', value: 8 },
    { date: '2024-12-15', status: 'Available', value: 12 },
    { date: '2024-12-16', status: 'Maintenance', value: 2 },
    { date: '2024-12-17', status: 'Booked', value: 9 },
    { date: '2024-12-18', status: 'Available', value: 11 },
    { date: '2024-12-19', status: 'Available', value: 14 },
    { date: '2024-12-20', status: 'Booked', value: 5 },
    { date: '2024-12-21', status: 'Available', value: 12 },
    { date: '2024-12-22', status: 'Available', value: 10 },
    { date: '2024-12-23', status: 'Booked', value: 7 },
    { date: '2024-12-24', status: 'Maintenance', value: 3 },
    { date: '2024-12-25', status: 'Available', value: 13 },
    { date: '2024-12-26', status: 'Available', value: 11 },
    { date: '2024-12-27', status: 'Booked', value: 8 },
    { date: '2024-12-28', status: 'Available', value: 12 },
    { date: '2024-12-29', status: 'Maintenance', value: 1 },
    { date: '2024-12-30', status: 'Booked', value: 6 },
    { date: '2024-12-31', status: 'Available', value: 14 },

    { date: '2025-01-01', status: 'Past' },
    { date: '2025-01-02', status: 'Past' },
    { date: '2025-01-03', status: 'Past' },
    { date: '2025-01-04', status: 'Past' },
    { date: '2025-01-05', status: 'Past' },
    { date: '2025-01-06', status: 'Booked', value: 9 },
    { date: '2025-01-07', status: 'Available', value: 11 },
    { date: '2025-01-08', status: 'Maintenance', value: 2 },
    { date: '2025-01-09', status: 'Booked', value: 7 },
    { date: '2025-01-10', status: 'Available', value: 13 },
    { date: '2025-01-11', status: 'Available', value: 10 },
    { date: '2025-01-12', status: 'Booked', value: 6 },
    { date: '2025-01-13', status: 'Available', value: 12 },
    { date: '2025-01-14', status: 'Maintenance', value: 1 },
    { date: '2025-01-15', status: 'Booked', value: 8 },
    { date: '2025-01-16', status: 'Available', value: 14 },
    { date: '2025-01-17', status: 'Available', value: 9 },
    { date: '2025-01-18', status: 'Booked', value: 5 },
    { date: '2025-01-19', status: 'Available', value: 12 },
    { date: '2025-01-20', status: 'Available', value: 11 },
    { date: '2025-01-21', status: 'Maintenance', value: 3 },
    { date: '2025-01-22', status: 'Available', value: 14 },
    { date: '2025-01-23', status: 'Booked', value: 6 },
    { date: '2025-01-24', status: 'Available', value: 13 },
    { date: '2025-01-25', status: 'Available', value: 11 },
    { date: '2025-01-26', status: 'Booked', value: 8 },
    { date: '2025-01-27', status: 'Available', value: 12 },
    { date: '2025-01-28', status: 'Maintenance', value: 2 },
    { date: '2025-01-29', status: 'Booked', value: 9 },
    { date: '2025-01-30', status: 'Available', value: 14 },
    { date: '2025-01-31', status: 'Booked', value: 7 },
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
