import React, { FC, useState } from 'react'
import styles from './PalmCardConfig.module.css'

export interface PalmCardConfigProps {
  text: string
  maxTextLength: number
  fontSize: number
  numberOfColumns: number
  onComplete?: (props: PalmCardConfigProps) => void
}

const PalmCardConfig: FC<PalmCardConfigProps> = (props) => {
  const [text, setText] = useState(props.text)
  const [maxTextLength, setMaxTextLength] = useState(props.maxTextLength)
  const [fontSize, setFontSize] = useState(props.fontSize)
  const [numberOfColumns, setNumberOfColumns] = useState(props.numberOfColumns)
  return (
    <div className={`${styles.PalmCardConfig} container d-print-none`} data-testid='PalmCardConfig'>
      <form>
        <div className={`form-group row`}>
          <textarea
            className={`form-control`}
            id='text'
            aria-describedby='textHelp'
            placeholder='Enter text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ minHeight: '300px' }}
          />
          <small id='textHelp' className={`form-text text-muted`}>
            Text to break into palm cards.
          </small>
        </div>
        <div className={`form-group row`}>
          <div className={`col`}>
            <input
              type='text'
              className={`form-control`}
              placeholder='Number Of Columns'
              value={numberOfColumns}
              onChange={(e) => setNumberOfColumns(parseInt(e.target.value))}
            />
            <small id='textHelp' className={`form-text text-muted`}>
              Number Of Columns
            </small>
          </div>
          <div className={`col`}>
            <input
              type='text'
              className={`form-control`}
              placeholder='Font Size'
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
            />
            <small id='textHelp' className={`form-text text-muted`}>
              Font Size
            </small>
          </div>
          <div className={`col`}>
            <input
              type='text'
              className={`form-control`}
              placeholder='Max Text Length'
              value={maxTextLength}
              onChange={(e) => setMaxTextLength(parseInt(e.target.value))}
            />
            <small id='textHelp' className={`form-text text-muted`}>
              Max Text Length
            </small>
          </div>
        </div>
        <div className={`form-group row`}>
          <div className={`col`}>
            <button
              type='button'
              className={`btn btn-primary`}
              onClick={() => props.onComplete?.({ text, numberOfColumns, fontSize, maxTextLength })}
            >
              Submit
            </button>
          </div>
          <div className={`col`}>
            <button type='button' className={`btn btn-primary`} onClick={() => window.print()}>
              Print
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PalmCardConfig
