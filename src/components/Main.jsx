import styled from '@emotion/styled'
import axios from 'axios'
import { useEffect, useState } from 'react'

import List from './List'
import Chart from './Chart'

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
        <SortWrap onClick={SortValue}>
          <label>
            <input type="radio" name="sort" value="person_id" />
            <span>환자번호순</span>
          </label>
          <label>
            <input type="radio" name="sort" value="gender" />
            <span>성별순</span>
          </label>
          <label>
            <input type="radio" name="sort" value="birth" />
            <span>생년월일순</span>
          </label>
          <label>
            <input type="radio" name="sort" value="race" />
            <span>인종순</span>
          </label>
          <label>
            <input type="radio" name="sort" value="ethnicity" />
            <span>민족순</span>
          </label>
          <label>
            <input type="radio" name="sort" value="death" />
            <span>사망순</span>
          </label>
        </SortWrap>
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
const SortWrap = styled.section`
  display: flex;
  margin: 5px 0;
  justify-content: flex-end;
  input {
    display: none;
  }
  label {
    &::after {
      margin: 0 5px;
      content: '|';
      opacity: 0.5;
    }
    &:last-child::after {
      margin: 0;
      content: '';
    }
  }
  input:checked + span {
    background-color: ${COLOR.main};
    color: ${COLOR.white};
    font-weight: 500;
  }
`
