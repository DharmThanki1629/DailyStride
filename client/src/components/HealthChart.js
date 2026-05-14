import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale,
         PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement,
                 LineElement, Title, Tooltip, Legend);

function HealthChart({ logs }) {
  const labels = logs.map(l => new Date(l.date).toLocaleDateString());
  const data = {
    labels,
    datasets: [
      { label:'Steps', data: logs.map(l => l.steps),
        borderColor:'#3498db', tension: 0.4 },
      { label:'Calories', data: logs.map(l => l.calories),
        borderColor:'#e74c3c', tension: 0.4 },
      { label:'Sleep (hrs)', data: logs.map(l => l.sleep),
        borderColor:'#9b59b6', tension: 0.4 },
      { label:'Water (glasses)', data: logs.map(l => l.water),
        borderColor:'#1abc9c', tension: 0.4 },
    ]
  };

  return (
    <div style={{ maxWidth:'800px', margin:'0 auto 30px' }}>
      <Line data={data} options={{ responsive:true,
        plugins:{ legend:{ position:'top' },
                  title:{ display:true, text:'Health Progress Over Time' }}}} />
    </div>
  );
}

export default HealthChart;