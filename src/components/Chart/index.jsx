import styled from '@emotion/styled'
import axios from 'axios'
import { useEffect, useState } from 'react'

import ChartForm from './ChartForm'

import { COLOR } from '../../constants'

const url = 'http://49.50.167.136:9871/'
export default function Chart({ total }) {
  useEffect(() => {
    axios.get(url + 'api/patient/stats').then(res => {
      console.log(res.data.stats)
    })
  }, [])

  return (
    <>
      <h1>차트</h1>
      <ChartForm total={total} />
    </>
  )
}
