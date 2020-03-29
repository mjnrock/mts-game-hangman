import React from "react";
import MTSLib from "@lespantsfancy/message-transfer-system";

import SignalTypes from "./../../SignalTypes";

export default class WordChoice extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            word: ""
        };
    }
    
    onChange(e) {
        this.setState({
            word: e.target.value
        });
    }

    onBeginClick(e) {        
        this.context.message((new MTSLib.Message(
            SignalTypes.NEW_WORD,
            this.state.word
        )).elevate());
    }

    render() {
        return (
            <div>
                <input
                    style={{
                        width: "500px",
                        height: "80px",
                        padding: "10px",
                        fontSize: "6em"
                    }}
                    type="text"
                    onChange={ this.onChange.bind(this) }
                    value={ this.state.word }
                />

                <button onClick={ this.onBeginClick.bind(this) }>Begin</button>
            </div>
        );
    }
};