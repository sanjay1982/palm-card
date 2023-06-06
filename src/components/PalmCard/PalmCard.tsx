import React, { Component } from 'react'
import styles from './PalmCard.module.css'
import { PalmCardConfigProps } from '../PalmCardConfig/PalmCardConfig'
import Card from '../Card/Card'
import $ from 'jquery'

function breakText(text: string, maxLength: number) {
  const sentences = text.split(/(?<=[.!?])\s+/)
  const chunks = []
  let currentChunk = ''

  for (const sentence of sentences) {
    if ((currentChunk + ' ' + sentence).trim().length <= maxLength) {
      currentChunk = (currentChunk ? currentChunk + ' ' : '') + sentence
    } else {
      if (currentChunk) {
        chunks.push(currentChunk.trim())
        currentChunk = ''
      }

      const words = sentence.split(' ')

      for (const word of words) {
        const potentialChunk = currentChunk + (currentChunk ? ' ' : '') + word

        if (potentialChunk.length <= maxLength) {
          currentChunk = potentialChunk
        } else {
          chunks.push(currentChunk.trim())
          currentChunk = word
        }
      }
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim())
  }

  return chunks
}
function getCards(items: string[], startIndex: number) {
  return items.map((text, index) => (
    <Card text={text} cardNumber={startIndex + index + 1} key={'card' + (startIndex + index)} />
  ))
}

function generateDOM(props: PalmCardConfigProps) {
  const { text, maxTextLength, numberOfColumns } = props

  let cardIndex = 0
  let rowIndex = 0
  const items = breakText(text, maxTextLength)
  const cols = numberOfColumns
  const rows = items.reduce<string[][]>((value, current, index) => {
    if (index % cols === 0) value.push([])
    const last = value[value.length - 1]
    last.push(current)
    return value
  }, [])

  if (rows.length > 0) {
    const lastRow = rows[rows.length - 1]
    while (lastRow.length < cols) lastRow.push('')
  }
  return rows.map((row) => {
    const startIndex = cardIndex
    cardIndex += row.length
    rowIndex++
    return (
      <div className='cardRow row' key={'row' + rowIndex} style={{ height: 'auto' }}>
        {getCards(row, startIndex)}
      </div>
    )
  })
}

export default class PalmCard extends Component<PalmCardConfigProps> {
  public static defaultProps = {
    text: '',
    maxTextLength: 200,
    fontSize: 12,
    numberOfColumns: 2,
    minCardHeight: 100,
  }
  getSnapshotBeforeUpdate() {
    $('.cardRow').height('auto');
  }
  // After the component did mount, we set the state each second.
  componentDidUpdate() {
    let maxHeight = 10;
    $('.cardRow').each((i, e) => {
      maxHeight = Math.max($(e).height() || 0, maxHeight)
    });
    maxHeight = Math.max(this.props.minCardHeight, maxHeight);
    $('.cardRow').height(maxHeight);
    $('.cardRow').parent().height('auto');
  }

  render() {
    return (
      <div
        className={`container ${styles.PalmCard}`}
        style={{ fontSize: this.props.fontSize + 'pt' }}
        data-testid='PalmCard'
      >
        <div className='container'>{generateDOM(this.props)}</div>
      </div>
    )
  }
}
