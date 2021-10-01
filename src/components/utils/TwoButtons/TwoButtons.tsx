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
  ...props
}) => {
  return (
    <TwoButtonsWrapper {...props}>
      <FirstButtonWrapper>
        <Button onPress={onPressButtonTop} title={titleTop} />
      </FirstButtonWrapper>
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

const FirstButtonWrapper = styled.View`
  margin-bottom: 5px;
`
