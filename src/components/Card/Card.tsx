import React, { FC } from 'react'
import styles from './Card.module.css'

interface CardProps {
  text: string
  cardNumber: number
}

const Card: FC<CardProps> = ({ text, cardNumber }) => (
  <div className={`${styles.Card} col`} data-testid='Card'>
    <div className={styles.CardNumber}>{cardNumber}</div>
    <div>
      <p>{text}</p>
    </div>
  </div>
)

export default Card
