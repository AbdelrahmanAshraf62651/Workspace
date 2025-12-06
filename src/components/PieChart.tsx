import Chart from 'react-apexcharts';

interface PieChartProps {
  labels: string[];
  values: number[];
}

function PieChart({ labels, values }: PieChartProps) {
  const chartOptions = {
    labels: labels,
    legend: {
      position: 'bottom' as const,
    },
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <Chart options={chartOptions} series={values} type="pie" width="400px" />
    </div>
  );
}

export default PieChart;
