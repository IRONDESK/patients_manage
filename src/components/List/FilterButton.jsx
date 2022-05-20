import styled from '@emotion/styled'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

import { COLOR } from '../../constants'

const url = 'http://49.50.167.136:9871/'
export default function FilterButton({ setPage, setFilterState }) {
  const [genders, setGenders] = useState([])
  const [races, setRaces] = useState([])
  const [ethnicities, setEthnicities] = useState([])
  useEffect(() => {
    axios.get(url + 'api/gender/list').then(res => {
      setGenders(res.data.genderList)
    })
    axios.get(url + 'api/race/list').then(res => {
      setRaces(res.data.raceList)
    })
    axios.get(url + 'api/ethnicity/list').then(res => {
      setEthnicities(res.data.ethnicityList)
    })
  }, [])

  const [ageminState, setAgeminState] = useState('')
  const [agemaxState, setAgemaxState] = useState('')
  const GenderSelected = e => {
    setFilterState(prev => ({
      ...prev,
      gender: e.target.value,
    }))
    setPage(1)
  }
  const RaceSelected = e => {
    setFilterState(prev => ({
      ...prev,
      race: e.target.value,
    }))
    setPage(1)
  }
  const EthSelected = e => {
    setFilterState(prev => ({
      ...prev,
      ethnicity: e.target.value,
    }))
    setPage(1)
  }
  const AgeminSelected = e => {
    setFilterState(prev => ({
      ...prev,
      age_min: e.target.value,
    }))
    setAgeminState(e.target.value)
    setPage(1)
  }
  const AgemaxSelected = e => {
    setFilterState(prev => ({
      ...prev,
      age_max: e.target.value,
    }))
    setAgemaxState(e.target.value)
    setPage(1)
  }
  const DeathSelected = e => {
    setFilterState(prev => ({
      ...prev,
      death:
        e.target.value == 'nowlive'
          ? 'false'
          : e.target.value == 'nowdeath'
          ? 'true'
          : '',
    }))
    setPage(1)
  }

  return (
    <Container>
      <ItemWrap id="item-gender">
        성별
        <Buttons onClick={GenderSelected}>
          <Label>
            <Input
              type="radio"
              name="gender"
              key="genders-all"
              value=""
              defaultChecked={true}
            />
            <span>전체</span>
          </Label>
          {genders.map((el, index) => (
            <Label>
              <Input
                type="radio"
                name="gender"
                key={'genders-' + index}
                value={el}
              />
              <span>{el}</span>
            </Label>
          ))}
        </Buttons>
      </ItemWrap>
      <ItemWrap id="item-race">
        인종
        <Buttons onClick={RaceSelected}>
          <Label>
            <Input
              type="radio"
              name="race"
              key="races-all"
              value=""
              defaultChecked={true}
            />
            <span>전체</span>
          </Label>
          {races.map((el, index) => (
            <Label>
              <Input
                type="radio"
                name="race"
                key={'races-' + index}
                value={el}
              />
              <span>{el}</span>
            </Label>
          ))}
        </Buttons>
      </ItemWrap>
      <ItemWrap id="item-eth">
        민족
        <Buttons onClick={EthSelected}>
          <Label>
            <Input
              type="radio"
              name="ethnicity"
              key="ethnicities-all"
              value=""
              defaultChecked={true}
            />
            <span>전체</span>
          </Label>
          {ethnicities.map((el, index) => (
            <Label>
              <Input
                type="radio"
                name="ethnicity"
                key={'ethnicities-' + index}
                value={el}
              />
              <span>{el}</span>
            </Label>
          ))}
        </Buttons>
      </ItemWrap>
      <ItemWrap id="item-age">
        나이
        <Buttons>
          <InputAge
            type="number"
            id="age_min"
            onChange={AgeminSelected}
            value={ageminState}
            placeholder="최소"
          />{' '}
          ~{' '}
          <InputAge
            type="number"
            id="age_max"
            onChange={AgemaxSelected}
            value={agemaxState}
            placeholder="최대"
          />
        </Buttons>
      </ItemWrap>
      <ItemWrap id="item-death">
        사망여부
        <Buttons onClick={DeathSelected}>
          <Label>
            <Input
              type="radio"
              name="isdeath"
              key="death-all"
              value=""
              defaultChecked={true}
            />
            <span>전체</span>
          </Label>
          <Label>
            <Input
              type="radio"
              name="isdeath"
              key="death-live"
              value="nowlive"
            />
            <span>해당없음</span>
          </Label>
          <Label>
            <Input
              type="radio"
              name="isdeath"
              key="death-death"
              value="nowdeath"
            />
            <span>사망</span>
          </Label>
        </Buttons>
      </ItemWrap>
    </Container>
  )
}

const Container = styled.ul`
  display: flex;
  margin: 0 0 20px 0;
  flex-wrap: wrap;
  gap: 10px 25px;
`
const ItemWrap = styled.li``
const Buttons = styled.p`
  display: inline-block;
  padding: 3px;
  border: 1px solid ${COLOR.gray};
  border-radius: 20px;
`
const Label = styled.label``
const InputAge = styled.input`
  padding: 1px 0 1px 6px;
  width: 53px;
  font-size: 16px;
  border: ${props =>
    props.value
      ? `1px solid ${COLOR.main}`
      : `1px solid rgba(${COLOR.mainrgba}, 0.3)`};
  outline: none;
  border-radius: 20px;
`
const Input = styled.input`
  display: none;
  & + span {
    cursor: pointer;
    display: inline-block;
    margin: 0 2px;
    padding: 3px 7px;
    min-width: 35px;
    font-size: 16px;
    text-align: center;
    border-radius: 20px;
  }
  &:checked + span {
    background-color: ${COLOR.main};
    color: ${COLOR.white};
    border-radius: 20px;
  }
`
