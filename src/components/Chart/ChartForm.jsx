import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell } from 'recharts'

export default function ChartForm({ total, datas }) {
  const [data, setData] = useState([{}])
  useEffect(() => {
    setData(datas)
  }, [datas])

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042']

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        key={`label-${index}`}
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <Container>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </Container>
  )
}

const Container = styled.article`
  div {
    margin: 0 auto;
  }
`
