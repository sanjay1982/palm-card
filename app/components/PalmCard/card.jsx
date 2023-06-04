import React from 'react';

export default class Card extends React.PureComponent {
    static defaultProps = {
        className: "card",
        text: "",
        cardNumber: 0
    };
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="card col">
                <div className="card-number">{this.props.cardNumber}</div>
                <div className="card-text">
                    <p>{this.props.text}</p>
                </div>
            </div>
        );
    }
}