import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts'
import { COLOR } from '../../constants'

export default function ChartForm({ title, datas }) {
  const [data, setData] = useState([{}])
  useEffect(() => {
    setData(datas)
  }, [datas])

  const COLORS = [
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#3db8dd',
    '#a77cdf',
    '#18c47c85',
    '#adaf1584',
    '#ff311683',
    '#14dcff87',
    '#eb53ff84',
  ]

  return (
    <Container>
      <PieChart width={330} height={200}>
        <Pie
          data={data}
          cx={225}
          cy={95}
          isAnimationActive={true}
          stroke={false}
          innerRadius={40}
          outerRadius={90}
          paddingAngle={0}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <>
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            </>
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <Title>{title}</Title>
    </Container>
  )
}

const Container = styled.article`
  position: relative;
  width: 300px;
  .recharts-legend-wrapper {
    top: 20px;
    ul {
      float: left;
      display: flex;
      flex-direction: column;
      gap: 2.5px;
      li {
        text-align: left;
      }
    }
  }
  .recharts-tooltip-wrapper {
    z-index: 9;
  }
  .recharts-default-tooltip {
    font-size: 14px;
    border-radius: 20px;
  }
`
const Title = styled.div`
  position: absolute;
  width: 55px;
  z-index: 1;
  top: 50%;
  right: calc(175px / 2);
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  transform: translate(81%, -50%);
`
