import styled from '@emotion/styled'

import Header from '../components/Layout/Header'
import Main from '../components/Main'

import { COLOR } from '../constants'

export default function Home() {
  return (
    <>
      <Header />
      <Head>
        <img src="/images/hospital_flag.svg" />
        Patients Management System
      </Head>
      <Container>
        <Main />
      </Container>
    </>
  )
}

const Head = styled.header`
  display: flex;
  padding: 10px 20px;
  height: 70px;
  align-items: center;
  background-color: ${COLOR.main};
  color: ${COLOR.white};
  font-size: 22px;
  font-weight: 700;
  img {
    margin: 0 8px 0 0;
    width: 40px;
    border-radius: 100%;
  }
`
const Container = styled.main`
  position: relative;
  height: calc(100vh - 70px);
  @media (max-width: 1280px) {
    display: flex;
    flex-direction: column;
  }
`
