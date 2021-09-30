import React from 'react'
import styled from 'styled-components/native'
import { Text } from '../utils'

const Header = () => {
  return (
    <HeaderWrapper>
      <Text isBold color={'white'}>
        NYT News Feed
      </Text>
    </HeaderWrapper>
  )
}

export default Header

const HeaderWrapper = styled.View`
  background-color: blue;
  padding-top: 60px;
  padding-left: 10px;
  padding-bottom: 10px;
`
