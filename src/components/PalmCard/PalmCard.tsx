import React, { FC } from 'react';
import styles from './PalmCard.module.css';
import { PalmCardConfigProps } from '../PalmCardConfig/PalmCardConfig';
import { array } from 'yargs';
import Card from '../Card/Card';

function breakText(text: string, maxLength: number) {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks = [];
  let currentChunk = "";

  for (const sentence of sentences) {
    if ((currentChunk + " " + sentence).trim().length <= maxLength) {
      currentChunk = (currentChunk ? currentChunk + " " : "") + sentence;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
        currentChunk = "";
      }

      let words = sentence.split(" ");

      for (const word of words) {
        const potentialChunk = currentChunk + (currentChunk ? " " : "") + word;

        if (potentialChunk.length <= maxLength) {
          currentChunk = potentialChunk;
        } else {
          chunks.push(currentChunk.trim());
          currentChunk = word;
        }
      }
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}
function getCards(items: string[], startIndex: number) {
  return items.map((text, index) =>
  (
    <Card text={text} cardNumber={startIndex + index + 1} key={"card" + (startIndex + index)} />
  )
  );

}

function generateDOM(props: PalmCardConfigProps) {
  var {
    text,
    maxTextLength,
    fontSize,
    numberOfColumns
  } = props;

  let cardIndex = 0;
  let rowIndex = 0;
  const items = breakText(text, maxTextLength);
  const cols = numberOfColumns;
  const rows = items.reduce<string[][]>((value, current, index, array) => {
    if (index % cols === 0) value.push([]);
    const last = value[value.length - 1];
    last.push(current);
    return value;
  }, []);

  console.log(rows);
  if (rows.length > 0) {
    const lastRow = rows[rows.length - 1];
    while (lastRow.length < cols) lastRow.push("");
  }
  return rows.map(row => {
    const startIndex = cardIndex;
    cardIndex += row.length;
    rowIndex++;
    return (
      <div className="cardRow row" key={"row" + rowIndex} style={{ height: 'auto' }}>
        {getCards(row, startIndex)}
      </div>
    );
  });
}


const PalmCard: FC<PalmCardConfigProps> = (props) => (
  <div className={`${styles.PalmCard} container`} data-testid="PalmCard">
    {generateDOM(props)}
  </div>
);

export default PalmCard;
