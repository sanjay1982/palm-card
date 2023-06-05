import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PalmCardConfig, { PalmCardConfigProps } from './PalmCardConfig'

describe('<PalmCardConfig />', () => {
  test('it should mount', () => {
    render(
      <PalmCardConfig
        text=''
        fontSize={0}
        maxTextLength={10}
        numberOfColumns={2}
        onComplete={(config: PalmCardConfigProps) => console.log(config)}
      />,
    )

    const palmCardConfig = screen.getByTestId('PalmCardConfig')

    expect(palmCardConfig).toBeInTheDocument()
  })
})
