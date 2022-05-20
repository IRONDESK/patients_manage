import styled from '@emotion/styled'

import ListItem from './ListItem'

import { COLOR } from '../../constants'

export default function List({ data }) {
  return (
    <>
      <Container>
        <Li>
          <PersonId>Patient#</PersonId>
          <Gender>Gender</Gender>
          <Age>Age</Age>
          <Birth>Birth Date</Birth>
          <Ethnicity>Hispanic</Ethnicity>
          <Race>Race</Race>
        </Li>
        {data.map((el, index) => (
          <ListItem key={index} data={el} />
        ))}
      </Container>
    </>
  )
}

const Container = styled.ul``
const Li = styled.li`
  font-size: 14px;
`

const PersonId = styled.span`
  display: inline-block;
  margin: 0 12px 0 0;
  padding: 5px 8px;
  width: 93px;
  font-weight: 600;
  text-align: center;
`
const Gender = styled.span`
  display: inline-block;
  width: 65px;
  text-align: center;
`
const Age = styled.span`
  display: inline-block;
  width: 50px;
`
const Birth = styled.span`
  display: inline-block;
  width: 180px;
  text-align: center;
`
const Ethnicity = styled.span`
  display: inline-block;
  width: 120px;
  text-align: center;
`
const Race = styled.span`
  display: inline-block;
  width: 110px;
  text-align: center;
`
const Death = styled.span`
  text-align: center;
`
