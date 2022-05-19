import styled from '@emotion/styled'
import axios from 'axios'
import { useEffect, useState } from 'react'

import List from './List'
import Chart from './Chart'
import SortButton from './List/SortButton'

import { COLOR } from '../constants'

const url = 'http://49.50.167.136:9871/'
export default function Main() {
  const [patient, setPatient] = useState([])
  const [page, setPage] = useState(1)
  const [pageLength, setPageLength] = useState(30)
  const [orderCol, setOrderCol] = useState('')
  useEffect(() => {
    axios
      .get(
        url +
          'api/patient/list' +
          '?page=' +
          page +
          '&length=' +
          pageLength +
          '&order_column=' +
          orderCol
      )
      .then(res => {
        setPatient(res.data.patient.list)
      })
  }, [patient])

  const SortValue = e => {
    setOrderCol(e.target.value)
  }

  return (
    <>
      <ListWrap>
        <FilterWrap></FilterWrap>
        <SortButtons onClick={SortValue}>
          <SortButton />
        </SortButtons>
        <List data={patient} />
      </ListWrap>
      <ChartWrap>
        <Chart />
      </ChartWrap>
    </>
  )
}

const ListWrap = styled.section`
  padding: 20px 25px;
  float: left;
  width: 70vw;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
`
const ChartWrap = styled.section`
  padding: 20px 25px;
  float: right;
  width: 30vw;
  height: 100%;
  background-color: ${COLOR.gray};
`
const FilterWrap = styled.article``
const SortButtons = styled.section`
  display: flex;
  margin: 5px 0;
  justify-content: flex-end;
`
