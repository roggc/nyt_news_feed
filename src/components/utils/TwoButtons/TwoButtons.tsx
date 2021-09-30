import React from 'react'
import styled from 'styled-components/native'
import { ViewProps } from 'react-native'

interface ITwoButtonsProps extends ViewProps {
  onPressButtonTop: () => void
  onPressButtonBottom: () => void
  titleTop: string
  titleBottom: string
}

export const TwoButtons: React.FC<ITwoButtonsProps> = ({
  onPressButtonBottom,
  onPressButtonTop,
  titleTop,
  titleBottom,
}) => {
  return (
    <TwoButtonsWrapper>
      <Button onPress={onPressButtonTop} title={titleTop} />
      <Button onPress={onPressButtonBottom} title={titleBottom} />
    </TwoButtonsWrapper>
  )
}

const TwoButtonsWrapper = styled.View`
  align-self: center;
  align-items: center;
  justify-content: space-around;
`

const Button = styled.Button`
  margin: 0px;
  padding: 0px;
`
