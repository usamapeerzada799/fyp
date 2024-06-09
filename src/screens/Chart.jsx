// import {Line} from 'react-chartjs-2'
// import {
//     Chart as Chartjs,
//     LineElement,
//     CategoryScale,
//     LinearScale,
   
// } from 'chart.js'
// Chartjs.register(
//     LineElement,
//     LinearScale,
//     CategoryScale,
    
// )
// const Chart = () => {
//     const data={
//         lables:[1,2,3,4,5,6],
//         dataset:[{
//             data:[2,3,1,4,2,]
//         }]
//     }
//   return (
//     <div>Chart
//         <Line data={data} options={""}></Line>
//     </div>

//   )
// }
// export default Chart
import React, { useEffect, useRef } from 'react';
import Charti from 'chart.js/auto';

const  Chart= () => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Charti(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'PV',
            data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: false,
          },
          {
            label: 'UV',
            data: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  return <canvas ref={chartRef} />;
};

export default Chart;
