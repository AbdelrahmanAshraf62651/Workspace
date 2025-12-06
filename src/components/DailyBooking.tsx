import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomSimpleLineChart from './CustomSimpleLineChart';

const DailyBooking = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/dashboard/monthly_income'
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-4 h-100 d-flex flex-column">
      <h3 className="mb-4 fw-semibold">Year's Income</h3>
      <div className="flex-grow-1" style={{ minHeight: '200px' }}>
        <CustomSimpleLineChart data={data} colors={['#000000']} />
      </div>
    </div>
  );
};

export default DailyBooking;
