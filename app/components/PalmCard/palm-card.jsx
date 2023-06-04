import React from "react";
import _ from "lodash";
import Card from "./card";
import $ from 'jquery';

export default class PalmCard extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    isDraggable: false,
    isResizable: false,
    text: "",
    maxTextLength: 200,
    cols: 2,
    rowHeight: 30,
    fontSize: 16,
    onLayoutChange: function () { }
  };

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      maxTextLength: this.props.maxTextLength,
      cols: this.props.cols,
      fontSize: this.props.fontSize,
      items: []
    }
  }


  getCards(items, startIndex) {
    const state = this.state;
    return _.map(items, function (text, index) {
      return (
        <Card text={text} cardNumber={startIndex + index} fontSize={state.fontSize} key={"card" + (startIndex + index + 1)} />
      );
    });

  }
  handleTextChange(e) {
    this.setState({ text: e.target.value, items: [] });
  }
  handleTextLenChange(e) {
    this.setState({ maxTextLength: e.target.value, items: [] });
  }
  handleColsChange(e) {
    this.setState({ cols: e.target.value, items: [] });
  }
  handleFontSizeChange(e) {
    this.setState({ fontSize: e.target.value, items: [] });
  }

  breakText(text, maxLength) {
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


  generateDOM() {
    let cardIndex = 0;
    let rowIndex = 0;
    const items = this.state.items;
    const cols = this.state.cols;
    const rows = _.chunk(items, cols);
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
          {this.getCards(row, startIndex)}
        </div>
      );
    });
  }

  generateConfig() {
    return (
      <form>
        <div class="form-group row">
          <label for="text">Enter text</label>
          <textarea class="form-control" id="text" aria-describedby="textHelp" placeholder="Enter text" value={this.state.text} onChange={this.handleTextChange.bind(this)} />
          <small id="textHelp" class="form-text text-muted">Text to break into palm cards.</small>
        </div>
        <div class="form-group row">
          <div class="col">
            <input type="text" class="form-control" placeholder="Number Of Columns" value={this.state.cols} onChange={this.handleColsChange.bind(this)} />
          </div>
          <div class="col">
            <input type="text" class="form-control" placeholder="Font Size" value={this.state.fontSize} onChange={this.handleFontSizeChange.bind(this)} />
          </div>
          <div class="col">
            <input type="text" class="form-control" placeholder="Max Text Length" value={this.state.maxTextLength} onChange={this.handleTextLenChange.bind(this)} />
          </div>
        </div>
        <div class="form-group row">
          <button type="button" class="btn btn-primary" onClick={this.onLayoutChange.bind(this)}>Submit</button>
        </div>
      </form>
    );
  }

  onLayoutChange() {
    const items = this.breakText(this.state.text, this.state.maxTextLength);
    this.setState({ items: items });
  }
  componentDidUpdate() {
    const maxHeight = Math.max.apply(null, $('.cardRow').map(function () {
      return $(this).height();
    }));
    console.log(maxHeight);
    $('.cardRow').height(maxHeight);
  }
  render() {
    return (
      <div>
        <div className="container d-print-none">
          {this.generateConfig()}
        </div>
        <div className="container cards" style={{ 'font-size': this.state.fontSize + 'pt' }}>
          {this.generateDOM()}
        </div>
      </div>
    );
  }
}
