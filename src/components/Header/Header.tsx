import React from 'react'
import styled from 'styled-components/native'
import { Platform } from 'react-native'
import { Text } from '../utils'

/**
 * renders a header
 * @returns {JSX.Element}
 */
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
  background-color: dodgerblue;
  padding-top: ${Platform.OS === 'android' ? 20 : 60}px;
  padding-left: 10px;
  padding-bottom: 10px;
`
