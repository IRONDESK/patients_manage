import styled from '@emotion/styled'
import React from 'react'

import { COLOR } from '../../constants'

export default function SortList({ orderCol, orderDesc }) {
  return (
    <>
      {orderCol == 'none' || !orderCol ? null : (
        <Control>
          <Label sortControl={true}>
            <Input type="radio" name="sort" value="none" />
            <span className="sort_control">정렬해제</span>
          </Label>

          <Label sortControl={true}>
            <Input type="checkbox" value="orderdesc" checked={orderDesc} />
            <span className="sort_control">내림차순</span>
          </Label>
        </Control>
      )}
      <Label>
        <Input type="radio" name="sort" value="person_id" />
        <span>환자번호순</span>
      </Label>
      <Label>
        <Input type="radio" name="sort" value="gender" />
        <span>성별순</span>
      </Label>
      <Label>
        <Input type="radio" name="sort" value="birth" />
        <span>생년월일순</span>
      </Label>
      <Label>
        <Input type="radio" name="sort" value="race" />
        <span>인종순</span>
      </Label>
      <Label>
        <Input type="radio" name="sort" value="ethnicity" />
        <span>민족순</span>
      </Label>
      <Label>
        <Input type="radio" name="sort" value="death" />
        <span>사망순</span>
      </Label>
    </>
  )
}

const Control = styled.article`
  display: block;
  margin: 0 5px;
  @media (max-width: 768px) {
    margin: 9px 0;
    width: 100%;
    text-align: center;
    order: 1;
  }
`
const Input = styled.input`
  display: none;
  & + span.sort_control {
    cursor: pointer;
    padding: 0 3px;
    font-size: 14px;
    color: ${COLOR.main};
    border: 1px solid ${COLOR.main};
  }
  & + span {
    cursor: pointer;
    padding: 0 3px;
    font-size: 14px;
    opacity: 0.6;
  }
  &:checked + span {
    color: ${COLOR.main};
    font-weight: 700;
    opacity: 1;
  }
`
const Label = styled.label`
  &::after {
    margin: ${props => (props.sortControl ? '0 2px' : '0 5px')};
    content: '|';
    opacity: ${props => (props.sortControl ? '0' : '0.5')};
  }
  &:last-child::after {
    margin: 0;
    content: '';
  }
`
