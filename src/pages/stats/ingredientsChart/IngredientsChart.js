import React from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer
} from 'recharts';

import './IngredientsChart.scss';

const IngredientsChart = ({ 
  tooltip, 
  legend, 
  data, 
  dataKey 
}) => {
  function renderBars(dataKey) {
    return (
      <Bar
        dataKey={dataKey}
        fill="#ccc"
      >
        <LabelList dataKey="name" position="insideLeft" content={renderLabel} />
      </Bar>
    )
  }

  function renderLabel(props) {
    const { x, y, height, value } = props;
    return (
      <g>
        <text x={x + 10} y={y + height / 2} textAnchor="left" dominantBaseline="middle" fill="white">
          {value}
        </text>
      </g>
    )
  }

  if (!data) return (
    <p className="stats-ingredientsChart__noData">No data available yet. Interact with some recipes to view this chart</p>
  );

  return (
    <div
      className="stats-ingredientsChart__ingredientsChartContainer"
    >
      <ResponsiveContainer
        width="100%"
      >
        <BarChart
          width={600}
          height={300}
          data={data}
          margin={{top: 15, right: 20, left: -40, bottom: 15}}
          layout="vertical"
        >
         <XAxis type="number" minTickGap={1} />
         <YAxis type="category" dataKey="name" tick={false} />
         {
           tooltip &&
            <Tooltip/>
         }
         {
           legend &&
            <Legend />
         }
         {renderBars(dataKey)}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default IngredientsChart;

IngredientsChart.propTypes = {
  tooltip: PropTypes.bool,
  legend: PropTypes.bool,
  data: PropTypes.array,
  dataKey: PropTypes.string,
}
