import styled from '@emotion/styled'
import axios from 'axios'
import { useEffect, useState } from 'react'

import ChartForm from './ChartForm'

const url = 'http://49.50.167.136:9871/'
export default function Chart({ total, filter_data }) {
  const [stats, setStats] = useState([])

  const [genderF, setGenderF] = useState()
  const [raceF, setRaceF] = useState([])
  const [ethnicityF, setEthnicityF] = useState([])
  const [GenRaceF, setGenRaceF] = useState([])
  const [GenEthF, setGenEthF] = useState([])

  useEffect(() => {
    axios.get(url + 'api/patient/stats').then(res => {
      setStats(res.data.stats)
    })
  }, [])

  useEffect(() => {
    const getStats = stats.filter(el => {
      return (
        (filter_data?.gender ? el.gender == filter_data?.gender : true) &&
        (filter_data?.ethnicity
          ? el.ethnicity == filter_data?.ethnicity
          : true) &&
        (filter_data?.race ? el.race == filter_data?.race : true)
      )
    })
    const genderFilter = Object.values(
      getStats.reduce((r, o) => {
        let key = ['gender'].map(k => o[k]).join('|')
        r[key] = r[key] || { gender: o.gender, count: 0 }
        r[key].count += o.count
        return r
      }, {})
    )

    const raceFilter = Object.values(
      getStats.reduce((r, o) => {
        let key = ['race'].map(k => o[k]).join('|')
        r[key] = r[key] || { race: o.race, count: 0 }
        r[key].count += o.count
        return r
      }, {})
    )
    const ethnicityFilter = Object.values(
      getStats.reduce((r, o) => {
        let key = ['ethnicity'].map(k => o[k]).join('|')
        r[key] = r[key] || { ethnicity: o.ethnicity, count: 0 }
        r[key].count += o.count
        return r
      }, {})
    )
    const gen_ethnFilter = Object.values(
      getStats.reduce((r, o) => {
        let key = ['gender', 'ethnicity'].map(k => o[k]).join('|')
        r[key] = r[key] || {
          gender: o.gender,
          ethnicity: o.ethnicity,
          count: 0,
        }
        r[key].count += o.count
        return r
      }, {})
    )
    const gen_raceFilter = Object.values(
      getStats.reduce((r, o) => {
        let key = ['gender', 'race'].map(k => o[k]).join('|')
        r[key] = r[key] || { gender: o.gender, race: o.race, count: 0 }
        r[key].count += o.count
        return r
      }, {})
    )
    setGenderF(genderFilter)
    setRaceF(raceFilter)
    setEthnicityF(ethnicityFilter)
    setGenRaceF(gen_raceFilter)
    setGenEthF(gen_ethnFilter)
  }, [stats, filter_data])

  return (
    <>
      <ChartForm
        title="성별"
        datas={[
          {
            name: 'Male',
            value: genderF?.filter(el => {
              return el.gender == 'M'
            })[0]?.count,
          },
          {
            name: 'Female',
            value: genderF?.filter(el => {
              return el.gender == 'F'
            })[0]?.count,
          },
        ]}
      />
      <ChartForm
        title="인종별"
        datas={[
          {
            name: 'Native',
            value: raceF?.filter(el => {
              return el.race == 'native'
            })[0]?.count,
          },
          {
            name: 'Black',
            value: raceF?.filter(el => {
              return el.race == 'black'
            })[0]?.count,
          },
          {
            name: 'White',
            value: raceF?.filter(el => {
              return el.race == 'white'
            })[0]?.count,
          },
          {
            name: 'Asian',
            value: raceF?.filter(el => {
              return el.race == 'asian'
            })[0]?.count,
          },
          {
            name: 'Other',
            value: raceF?.filter(el => {
              return el.race == 'other'
            })[0]?.count,
          },
        ]}
      />
      <ChartForm
        title="민족별"
        datas={[
          {
            name: 'Nonhispanic',
            value: ethnicityF?.filter(el => {
              return el.ethnicity == 'nonhispanic'
            })[0]?.count,
          },
          {
            name: 'Hispanic',
            value: ethnicityF?.filter(el => {
              return el.ethnicity == 'hispanic'
            })[0]?.count,
          },
        ]}
      />
      <ChartForm
        title="성-인종"
        datas={[
          {
            name: 'M-Native',
            value: GenRaceF?.filter(el => {
              return el.race == 'native' && el.gender == 'M'
            })[0]?.count,
          },
          {
            name: 'M-Black',
            value: GenRaceF?.filter(el => {
              return el.race == 'black' && el.gender == 'M'
            })[0]?.count,
          },
          {
            name: 'M-White',
            value: GenRaceF?.filter(el => {
              return el.race == 'white' && el.gender == 'M'
            })[0]?.count,
          },
          {
            name: 'M-Asian',
            value: GenRaceF?.filter(el => {
              return el.race == 'asian' && el.gender == 'M'
            })[0]?.count,
          },
          {
            name: 'M-Other',
            value: GenRaceF?.filter(el => {
              return el.race == 'other' && el.gender == 'M'
            })[0]?.count,
          },
          {
            name: 'F-Native',
            value: GenRaceF?.filter(el => {
              return el.race == 'native' && el.gender == 'F'
            })[0]?.count,
          },
          {
            name: 'F-Black',
            value: GenRaceF?.filter(el => {
              return el.race == 'black' && el.gender == 'F'
            })[0]?.count,
          },
          {
            name: 'F-White',
            value: GenRaceF?.filter(el => {
              return el.race == 'white' && el.gender == 'F'
            })[0]?.count,
          },
          {
            name: 'F-Asian',
            value: GenRaceF?.filter(el => {
              return el.race == 'asian' && el.gender == 'F'
            })[0]?.count,
          },
          {
            name: 'F-Other',
            value: GenRaceF?.filter(el => {
              return el.race == 'other' && el.gender == 'F'
            })[0]?.count,
          },
        ]}
      />
      <ChartForm
        title="성-민족"
        datas={[
          {
            name: 'M-Nonhispanic',
            value: GenEthF?.filter(el => {
              return el.ethnicity == 'nonhispanic' && el.gender == 'M'
            })[0]?.count,
          },
          {
            name: 'M-Hispanic',
            value: GenEthF?.filter(el => {
              return el.ethnicity == 'hispanic' && el.gender == 'M'
            })[0]?.count,
          },
          {
            name: 'F-Hispanic',
            value: GenEthF?.filter(el => {
              return el.ethnicity == 'hispanic' && el.gender == 'F'
            })[0]?.count,
          },
          {
            name: 'F-Nonhispanic',
            value: GenEthF?.filter(el => {
              return el.ethnicity == 'nonhispanic' && el.gender == 'F'
            })[0]?.count,
          },
        ]}
      />
    </>
  )
}
