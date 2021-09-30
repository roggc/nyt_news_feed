import styled from 'styled-components/native'

interface ITextProps {
  isBold?: boolean
  color?: string
}

export const Text = styled.Text<ITextProps>`
  ${({ isBold, color }): string => `
  ${isBold ? 'font-weight: 700;' : ''}
  ${color ? `color:${color};` : ''}
  `}
`
