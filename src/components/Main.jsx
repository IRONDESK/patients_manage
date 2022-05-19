import styled from '@emotion/styled'

import List from './List'
import Chart from './Chart'

import { COLOR } from '../constants'

export default function Main() {
  return (
    <>
      <ListWrap>
        <List />
      </ListWrap>
      <ChartWrap>
        <Chart />
      </ChartWrap>
    </>
  )
}

const ListWrap = styled.section`
  float: left;
  width: 70vw;
  height: 100%;
`
const ChartWrap = styled.section`
  float: right;
  width: 30vw;
  height: 100%;
  background-color: ${COLOR.gray};
`
