import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);


export function Chart(props) {
    const data = {
        labels: ['CodeChef', 'CodeForces', 'LeetCode', ],
        datasets: [
          {
            label: 'Problems solved',
            data: [props.codechef, props.codeforces, props.leetcode],
            backgroundColor: [
              '#64CCC5',
              '#176B87',
              '#053B50',
            ],
          },
        ],
      };
  return <Pie data={data} />;
}
