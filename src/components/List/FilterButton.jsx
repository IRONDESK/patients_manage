import styled from '@emotion/styled'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

import { COLOR } from '../../constants'

const url = 'http://49.50.167.136:9871/'
export default function FilterButton({ setFilterState }) {
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

  const [genderState, setGenderState] = useState('')
  const [raceState, setRaceState] = useState('')
  const [ethnicityState, setEthnicityState] = useState('')
  const [ageminState, setAgeminState] = useState('')
  const [agemaxState, setAgemaxState] = useState('')
  const [deathState, setDeathState] = useState('')

  const GenderSelected = e => {
    setFilterState(prev => ({
      ...prev,
      gender: e.target.value,
    }))
  }
  const RaceSelected = e => {
    setFilterState(prev => ({
      ...prev,
      race: e.target.value,
    }))
  }
  const EthSelected = e => {
    setFilterState(prev => ({
      ...prev,
      ethnicity: e.target.value,
    }))
  }
  const AgeminSelected = e => {
    setFilterState(prev => ({
      ...prev,
      age_min: e.target.value,
    }))
    setAgeminState(e.target.value)
  }
  const AgemaxSelected = e => {
    setFilterState(prev => ({
      ...prev,
      age_max: e.target.value,
    }))
    setAgemaxState(e.target.value)
  }
  const DeathSelected = e => {
    setFilterState(prev => ({
      ...prev,
      death: e.target.value == 'nowlive' ? 'false' : 'true',
    }))
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
            전체
          </Label>
          {genders.map((el, index) => (
            <Label>
              <Input
                type="radio"
                name="gender"
                key={'genders-' + index}
                value={el}
              />
              {el}
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
            전체
          </Label>
          {races.map((el, index) => (
            <Label>
              <Input
                type="radio"
                name="race"
                key={'races-' + index}
                value={el}
              />
              {el}
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
            전체
          </Label>
          {ethnicities.map((el, index) => (
            <Label>
              <Input
                type="radio"
                name="ethnicity"
                key={'ethnicities-' + index}
                value={el}
              />
              {el}
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
          />{' '}
          ~{' '}
          <InputAge
            type="number"
            id="age_max"
            onChange={AgemaxSelected}
            value={agemaxState}
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
            전체
          </Label>
          <Label>
            <Input
              type="radio"
              name="isdeath"
              key="death-live"
              value="nowlive"
            />
            해당없음
          </Label>
          <Label>
            <Input
              type="radio"
              name="isdeath"
              key="death-death"
              value="nowdeath"
            />
            사망
          </Label>
        </Buttons>
      </ItemWrap>
    </Container>
  )
}

const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
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
  width: 55px;
  font-size: 16px;
  border-radius: 20px;
`
const Input = styled.input`
  margin: 0 2px;
  padding: 3px 5px;
  min-width: 30px;
  background-color: ${COLOR.main};
  color: ${COLOR.white};
  font-size: 16px;
  border-radius: 20px;
`
