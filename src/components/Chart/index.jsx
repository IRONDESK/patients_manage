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
    console.log('getStats', getStats)
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
        total={total}
        datas={[
          {
            name: '남성',
            value: genderF?.filter(el => {
              return el.gender == 'M'
            })[0]?.count,
          },
          {
            name: '여성',
            value: genderF?.filter(el => {
              return el.gender == 'F'
            })[0]?.count,
          },
        ]}
      />
      <ChartForm
        total={total}
        datas={[
          {
            name: 'native',
            value: raceF?.filter(el => {
              return el.race == 'native'
            })[0]?.count,
          },
          {
            name: 'black',
            value: raceF?.filter(el => {
              return el.race == 'black'
            })[0]?.count,
          },
          {
            name: 'white',
            value: raceF?.filter(el => {
              return el.race == 'white'
            })[0]?.count,
          },
          {
            name: 'asian',
            value: raceF?.filter(el => {
              return el.race == 'asian'
            })[0]?.count,
          },
          {
            name: 'other',
            value: raceF?.filter(el => {
              return el.race == 'other'
            })[0]?.count,
          },
        ]}
      />
      <ChartForm
        total={total}
        datas={[
          {
            name: 'nonhispanic',
            value: ethnicityF?.filter(el => {
              return el.ethnicity == 'nonhispanic'
            })[0]?.count,
          },
          {
            name: 'hispanic',
            value: ethnicityF?.filter(el => {
              return el.ethnicity == 'hispanic'
            })[0]?.count,
          },
        ]}
      />
      <ChartForm
        total={total}
        datas={[
          {
            name: '남성-native',
            value: GenRaceF?.filter(el => {
              return el.race == 'native' && el.gender == 'M'
            })[0]?.count,
          },
          {
            name: '남성-black',
            value: GenRaceF?.filter(el => {
              return el.race == 'black' && el.gender == 'M'
            })[0]?.count,
          },
          {
            name: '남성-white',
            value: GenRaceF?.filter(el => {
              return el.race == 'white' && el.gender == 'M'
            })[0]?.count,
          },
          {
            name: '남성-asian',
            value: GenRaceF?.filter(el => {
              return el.race == 'asian' && el.gender == 'M'
            })[0]?.count,
          },
          {
            name: '남성-other',
            value: GenRaceF?.filter(el => {
              return el.race == 'other' && el.gender == 'M'
            })[0]?.count,
          },
          {
            name: '여성-native',
            value: GenRaceF?.filter(el => {
              return el.race == 'native' && el.gender == 'F'
            })[0]?.count,
          },
          {
            name: '여성-black',
            value: GenRaceF?.filter(el => {
              return el.race == 'black' && el.gender == 'F'
            })[0]?.count,
          },
          {
            name: '여성-white',
            value: GenRaceF?.filter(el => {
              return el.race == 'white' && el.gender == 'F'
            })[0]?.count,
          },
          {
            name: '여성-asian',
            value: GenRaceF?.filter(el => {
              return el.race == 'asian' && el.gender == 'F'
            })[0]?.count,
          },
          {
            name: '여성-other',
            value: GenRaceF?.filter(el => {
              return el.race == 'other' && el.gender == 'F'
            })[0]?.count,
          },
        ]}
      />
      <ChartForm
        total={total}
        datas={[
          {
            name: '남성-nonhispanic',
            value: GenEthF?.filter(el => {
              return el.ethnicity == 'nonhispanic' && el.gender == 'M'
            })[0]?.count,
          },
          {
            name: '남성-hispanic',
            value: GenEthF?.filter(el => {
              return el.ethnicity == 'hispanic' && el.gender == 'M'
            })[0]?.count,
          },
          {
            name: '여성-hispanic',
            value: GenEthF?.filter(el => {
              return el.ethnicity == 'hispanic' && el.gender == 'F'
            })[0]?.count,
          },
          {
            name: '여성-nonhispanic',
            value: GenEthF?.filter(el => {
              return el.ethnicity == 'nonhispanic' && el.gender == 'F'
            })[0]?.count,
          },
        ]}
      />
    </>
  )
}
