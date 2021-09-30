import { TextProps } from 'react-native'
import styled from 'styled-components/native'

interface ITextProps extends TextProps {
  isBold?: boolean
  color?: string
  fontSize?: number
}

export const Text = styled.Text<ITextProps>`
  ${({ isBold, color, fontSize }): string => `
  ${isBold ? 'font-weight: 700;' : ''}
  ${color ? `color:${color};` : ''}
  ${fontSize ? `font-size:${fontSize}px;` : ''}
  `}
`
