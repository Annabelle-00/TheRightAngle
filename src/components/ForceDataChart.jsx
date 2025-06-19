import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
} from 'chart.js';
import 'chart.js/auto'; 
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);

const ForceDataChart = ({ data, yAxisLabel = "Force (lbs)", highlightRelevant = false }) => {
  const chartData = {
    labels: data.map(p => new Date(p.timestamp)),
    datasets: [
      {
        label: yAxisLabel,
        data: data.map(p => p.value),
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
          const point = data[context.dataIndex];
          if (highlightRelevant && point && point.isRelevant) {
            gradient.addColorStop(0, 'rgba(255, 99, 132, 0.6)'); 
            gradient.addColorStop(1, 'rgba(255, 99, 132, 0.1)');
          } else {
            gradient.addColorStop(0, 'rgba(75, 192, 192, 0.6)');
            gradient.addColorStop(1, 'rgba(75, 192, 192, 0.1)');
          }
          return gradient;
        },
        borderColor: (context) => {
          const point = data[context.dataIndex];
          return (highlightRelevant && point && point.isRelevant) ? 'rgb(255, 99, 132)' : 'rgb(75, 192, 192)';
        },
        tension: 0.3,
        pointRadius: (context) => {
            const point = data[context.dataIndex];
            return (highlightRelevant && point && point.isRelevant) ? 4 : 2;
        },
        pointBackgroundColor: (context) => {
            const point = data[context.dataIndex];
            return (highlightRelevant && point && point.isRelevant) ? 'rgb(255, 99, 132)' : 'rgb(75, 192, 192)';
        },
      },
    ],
  };

  const minY = 0;
  const maxY = Math.max(100, ...data.map(p => p.value)) + 10; 

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 250, 
      easing: 'linear'
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'second',
          stepSize: 1, 
          displayFormats: {
            second: 'HH:mm:ss'
          },
          tooltipFormat: 'HH:mm:ss.SSS'
        },
        title: {
          display: true,
          text: 'Time',
          color: document.documentElement.classList.contains('dark') ? '#cbd5e1' : '#475569',
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#64748b',
          maxRotation: 0,
          autoSkipPadding: 20,
          source: 'auto', 
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        }
      },
      y: {
        beginAtZero: minY === 0, 
        min: minY,
        max: maxY,
        title: {
          display: true,
          text: yAxisLabel,
          color: document.documentElement.classList.contains('dark') ? '#cbd5e1' : '#475569',
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#64748b',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        }
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#334155',
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: document.documentElement.classList.contains('dark') ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#0f172a',
        bodyColor: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#334155',
        borderColor: document.documentElement.classList.contains('dark') ? '#334155' : '#e2e8f0',
        borderWidth: 1,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return <Line options={options} data={chartData} />;
};

export default ForceDataChart;
