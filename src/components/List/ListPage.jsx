import styled from '@emotion/styled'
import React from 'react'

import { COLOR } from '../../constants'

export default function ListPage({
  total,
  pageLength,
  setPageLength,
  page,
  setPage,
}) {
  const setLength = e => {
    setPageLength(e.target.value)
  }
  const PageMove = e => {
    if (e.target.value) {
      setPage(e.target.value)
    }
  }
  return (
    <Container>
      <LengthSet>
        한 페이지에{' '}
        <Input type="number" value={pageLength} onChange={setLength} min={10} />
        명 씩 보기
      </LengthSet>
      <PageButtons onClick={PageMove}>
        {Array(Math.ceil(total / pageLength))
          .fill(1)
          .map((_, index) => (
            <Button
              key={index + 1}
              value={index + 1}
              defaultChecked={page == index + 1}
            >
              {index + 1}
            </Button>
          ))}
      </PageButtons>
    </Container>
  )
}

const Container = styled.section`
  margin: 25px auto 40px auto;
`
const LengthSet = styled.p`
  margin: 19px 0;
  text-align: center;
`
const Input = styled.input`
  margin: 0 4px;
  width: 55px;
  color: ${COLOR.main};
  text-align: right;
  border: 1px solid ${COLOR.main};
  outline: none;
  border-radius: 16px;
`

const PageButtons = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`
const Button = styled.li`
  cursor: pointer;
  display: inline-block;
  padding: 8px 0 6px 0;
  width: 34px;
  height: 34px;
  color: ${props => (props.defaultChecked ? COLOR.main : 'none')};
  text-align: center;
  border: ${props =>
    props.defaultChecked
      ? `2px solid ${COLOR.main}`
      : `2px solid ${COLOR.gray}`};
`
