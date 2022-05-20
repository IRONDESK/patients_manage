import styled from '@emotion/styled'
import React from 'react'

import { COLOR } from '../../constants'

export default function SortList() {
  return (
    <>
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

const Input = styled.input`
  display: none;
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
    margin: 0 5px;
    content: '|';
    opacity: 0.5;
  }
  &:last-child::after {
    margin: 0;
    content: '';
  }
`
