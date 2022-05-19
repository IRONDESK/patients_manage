import styled from '@emotion/styled'

import ListItem from './ListItem'

import { COLOR } from '../../constants'

export default function List({ data }) {
  return (
    <>
      <Container>
        <Li>
          {data.map((el, index) => (
            <ListItem key={index} data={el} />
          ))}
        </Li>
      </Container>
    </>
  )
}

const Container = styled.ul``
const Li = styled.li``
