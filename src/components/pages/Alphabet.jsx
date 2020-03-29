import React from "react";
import MTSLib from "@lespantsfancy/message-transfer-system";

import SignalTypes from "./../../SignalTypes";

export default class Alphabet extends React.Component {
    onClick(e, char) {
        let letter = String.fromCharCode(char);
        
        this.context.message((new MTSLib.Message(
            SignalTypes.NEW_GUESS,
            letter
        )).elevate());
    }

    render() {
        let chars = [];
        for(let i = 65; i <= 90; i++) {
            chars.push( i );
        }

        return (
            <div>
                {
                    chars.map(char => {
                        let color = "#888";

                        if(this.context.state.Letters.Incorrect.includes(String.fromCharCode(char))) {
                            color = "#f00";
                        } else if(this.context.state.Letters.Correct.includes(String.fromCharCode(char))) {
                            color = "#0f0";
                        }

                        return (
                            <button
                                style={{
                                    margin: "4px",
                                    width: "23vw",
                                    height: "15vh",
                                    color: color,
                                    backgroundColor: "#eee",
                                    border: `4px solid ${ color }`,
                                    borderRadius: "3px",
                                    fontSize: "6em"
                                }}
                                key={ char }
                                onClick={ e => this.onClick(e, char) }
                            >{ String.fromCharCode(char) }</button>
                        );
                    })
                }
            </div>
        );
    }
};