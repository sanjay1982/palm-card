import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PalmCard from './PalmCard';
import { PalmCardConfigProps } from '../PalmCardConfig/PalmCardConfig';

describe('<PalmCard />', () => {
  test('it should mount', () => {
    const defaultConfig: PalmCardConfigProps = {
      text:"",
      maxTextLength:200,
      fontSize: 12,
      numberOfColumns:2
      
    };
    render(<PalmCard  {...defaultConfig}/>);
    
    const palmCard = screen.getByTestId('PalmCard');

    expect(palmCard).toBeInTheDocument();
  });
});