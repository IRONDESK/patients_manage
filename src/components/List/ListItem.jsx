import styled from '@emotion/styled'
import axios from 'axios'
import { useEffect, useState } from 'react'

import { COLOR } from '../../constants'

const url = 'http://49.50.167.136:9871/'
export default function ListItem({ data }) {
  const [brief, setBrief] = useState()
  useEffect(() => {
    axios.get(url + 'api/patient/brief/' + data?.personID).then(res => {
      setBrief(res.data)
    })
  }, [])

  return (
    <>
      <Container>
        <InfoWrap htmlFor={data?.personID}>
          <Info>
            <PersonId>{data?.personID}</PersonId>
            <Age>{data?.age}세</Age>
            <Gender>{data?.gender}</Gender>
            <Birth>{data?.birthDatetime.slice(0, 10)}</Birth>
            <Ethnicity>{data?.ethnicity == 'hispanic' ? 'Y' : 'N'}</Ethnicity>
            <Race>{data?.race}</Race>
            <Death>{data?.isDeath ? '사망' : ''}</Death>
          </Info>
        </InfoWrap>
        <Input type="checkbox" id={data?.personID} />
        <Detail>
          <DetailSubTitle>진료 방문</DetailSubTitle>
          {brief ? brief?.visitCount + '회' : 'Loading...'}
          <DetailSubTitle>상태 기록</DetailSubTitle>
          {brief
            ? brief?.conditionList.map((el, index) => (
                <ul>
                  <li key={index}>{el}</li>
                </ul>
              ))
            : 'Loading...'}
        </Detail>
      </Container>
    </>
  )
}

const Container = styled.li`
  margin: 0 0 15px 0;
  border: 1px solid ${COLOR.main};
`
const Input = styled.input`
  display: none;
  & + div {
    display: none;
  }
  &:checked + div {
    display: block;
  }
`
const InfoWrap = styled.label`
  cursor: pointer;
`
const Info = styled.article`
  font-size: 18px;
`
const PersonId = styled.span`
  display: inline-block;
  margin: 0 12px 0 0;
  padding: 5px 8px;
  width: 120px;
  background-color: ${COLOR.main};
  color: ${COLOR.white};
  font-weight: 600;
  font-size: 21px;
  text-align: center;
`
const Age = styled.span`
  display: inline-block;
  width: 55px;
`
const Gender = styled.span`
  display: inline-block;
  width: 35px;
  text-align: center;
`
const Birth = styled.span`
  display: inline-block;
  width: 130px;
  text-align: center;
`
const Ethnicity = styled.span`
  display: inline-block;
  width: 70px;
  text-align: center;
`
const Race = styled.span`
  display: inline-block;
  width: 60px;
`
const Death = styled.span``

const Detail = styled.div`
  padding: 10px 15px;
  border-top: 1px solid ${COLOR.main};
  & li {
    margin: 0 0 0 20px;
    padding: 0 0 0 -3px;
    list-style-type: disc;
    line-height: 18px;
  }
`
const DetailSubTitle = styled.p`
  margin: 12px 0 5px 0;
  color: ${COLOR.main};
  font-weight: 600;
`
