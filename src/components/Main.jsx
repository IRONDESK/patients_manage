import styled from '@emotion/styled'
import axios from 'axios'
import { useEffect, useState } from 'react'

import List from './List'
import Chart from './Chart'
import ListPage from './List/ListPage'
import FilterButton from './List/FilterButton'
import SortButton from './List/SortButton'

import { COLOR } from '../constants'

const url = 'http://49.50.167.136:9871/'
export default function Main() {
  const [patient, setPatient] = useState([])
  const [totalData, setTotalData] = useState(0)
  const [page, setPage] = useState(1)
  const [pageLength, setPageLength] = useState(30)
  const [orderCol, setOrderCol] = useState('')
  const [filterState, setFilterState] = useState({
    gender: '',
    race: '',
    ethnicity: '',
    age_min: '',
    age_max: '',
    death: '',
  })
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
          orderCol +
          FilterURL(filterState)
      )
      .then(res => {
        setPatient(res.data.patient.list)
        setTotalData(res.data.patient.totalLength)
      })
  }, [patient])

  const FilterURL = data => {
    return (
      (data.gender ? '&gender=' + data.gender : '') +
      (data.race ? '&race=' + data.race : '') +
      (data.ethnicity ? '&ethnicity=' + data.ethnicity : '') +
      (data.age_min ? '&age_min=' + data.age_min : '') +
      (data.age_max ? '&age_max=' + data.age_max : '') +
      (data.death ? '&death=' + data.death : '')
    )
  }

  const SortValue = e => {
    setOrderCol(e.target.value)
  }

  return (
    <>
      <ListWrap>
        <FilterButton setPage={setPage} setFilterState={setFilterState} />
        <TableNav>
          <TotalText>{totalData.toLocaleString()}명의 환자 정보</TotalText>
          <SortButtons onClick={SortValue}>
            <SortButton />
          </SortButtons>
        </TableNav>
        <List data={patient} />
        <ListPage
          total={totalData}
          pageLength={pageLength}
          setPageLength={setPageLength}
          page={page}
          setPage={setPage}
        />
      </ListWrap>
      <ChartWrap>{/* <Chart total={totalData} /> */}</ChartWrap>
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
const TableNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const TotalText = styled.p``
const ChartWrap = styled.section`
  padding: 20px 25px;
  float: right;
  width: 30vw;
  height: 100%;
  background-color: ${COLOR.gray};
`
const SortButtons = styled.section`
  display: flex;
  margin: 5px 0;
  justify-content: flex-end;
`
