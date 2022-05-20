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
            <Gender>{data?.gender}</Gender>
            <Age>{data?.age}</Age>
            <Birth>{data?.birthDatetime.slice(0, 10)}</Birth>
            <Ethnicity>{data?.ethnicity == 'hispanic' ? 'Y' : 'N'}</Ethnicity>
            <Race>{data?.race}</Race>
            <Death>{data?.isDeath ? 'Dead' : ''}</Death>
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
  margin: 0 0 12px 0;
  border: 1px solid ${COLOR.gray};
  border-radius: 5px;
  overflow: hidden;
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
  @media (max-width: 768px) {
    span {
      font-size: 15px;
      letter-spacing: -0.5px;
    }
  }
`
const PersonId = styled.span`
  display: inline-block;
  margin: 0 12px 0 0;
  padding: 5px 8px;
  width: 93px;
  background-color: ${COLOR.gray};
  font-weight: 600;
  font-size: 17px;
  text-align: center;
  @media (max-width: 768px) {
    margin: 0 8px 0 0;
    width: 86px;
  }
`
const Gender = styled.span`
  display: inline-block;
  width: 65px;
  text-align: center;
  @media (max-width: 768px) {
    width: 16px;
    text-align: left;
  }
`
const Age = styled.span`
  display: inline-block;
  width: 50px;
  @media (max-width: 768px) {
    width: 22px;
    text-align: right;
  }
`
const Birth = styled.span`
  display: inline-block;
  width: 180px;
  text-align: center;
  @media (max-width: 768px) {
    width: 90px;
    text-align: right;
  }
`
const Ethnicity = styled.span`
  display: inline-block;
  width: 120px;
  text-align: center;
  @media (max-width: 768px) {
    width: 45px;
  }
`
const Race = styled.span`
  display: inline-block;
  width: 110px;
  text-align: center;
  @media (max-width: 768px) {
    width: 45px;
  }
`
const Death = styled.p`
  float: right;
  padding: 0 12px;
  font-size: 14px;
  text-align: right;
  line-height: 27px;
  opacity: 0.7;
  @media (max-width: 768px) {
    padding: 0 4px;
  }
`

const Detail = styled.div`
  padding: 10px 15px;
  border-top: 1px solid ${COLOR.gray};
  & li {
    margin: 0 0 0 20px;
    padding: 0 0 0 -3px;
    list-style-type: disc;
    line-height: 18px;
  }
`
const DetailSubTitle = styled.p`
  margin: 12px 0 5px 0;
  font-weight: 600;
`
