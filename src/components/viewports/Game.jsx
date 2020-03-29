/* eslint-disable no-unused-vars */
import React from "react";
import MTSLib from "@lespantsfancy/message-transfer-system";

import SignalTypes from "./../../SignalTypes";

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            subscriptionId: null
        };
    }
    componentDidMount() {
        let id = this.context.subscribe(() => this.forceUpdate());

        this.setState({
            subscriptionId: id
        });
        
        setTimeout(() => {
            this.context.internal.MODE = "VIEWPORT";
            this.context.message((new MTSLib.Message(
                SignalTypes.DECLARE_MODE,
                this.context.internal.MODE
            )).elevate());
        }, 0);
    }
    componentWillUnmount() {
        this.context.unsubscribe(this.state.subscriptionId)
    }

    render() {
        if(Object.keys(this.context.state).length === 0 || this.context.state.Word === "") {
            return (
                <div className="flex items-center justify-center h-100">
                    <div className="mt4 code tc f2">Waiting on Scribe...</div>
                </div>
            )
        }

        let attempts = [];
        for(let i = 0; i < 5; i++) {
            if(i < this.context.state.Letters.Incorrect.length) {
                attempts.push(this.context.state.Letters.Incorrect[ i ]);
            } else {
                attempts.push(true);
            }
        }

        return (
            <div className="flex flex-column items-center justify-around">
                <div className="flex items-center justify-center">
                    {
                        attempts.map(att => {
                            if(att === true) {
                                return (
                                    <div className="flex items-center justify-center w3 h3 bg-light-green ba br2 b--dark-green mr3 mt2 mb4">&nbsp;</div>
                                );
                            }

                            return (
                                <div className="flex items-center justify-center w3 h3 bg-light-red f3 white tc ba br2 b--dark-red mr3 mt2 mb4">{ att }</div>
                            );
                        })
                    }
                </div>

                <div className="flex flex-wrap items-center justify-around tc code">
                    {
                        this.context.state.Word.split("").map((l, i)  => {
                            if(l.charCodeAt(0) < 65 || l.charCodeAt(0) > 90) {
                                return (
                                    <div className="f3 pb2 ma1 w2" key={ i }>{ l }</div>
                                );
                            }

                            if(this.context.state.Letters.Correct.includes(l)) {                            
                                return (
                                    <div className="f3 pb2 bb ma1 w2" key={ i }>{ l }</div>
                                );
                            }

                            return (
                                <div className="f3 pb2 bb ma1 w2" key={ i }>&nbsp;</div>
                            );
                        })
                    }
                </div>

                {
                    this.context.state.Winner !== false
                    ? (
                        <div className="code tc mt4 flex flex-column items-center justify-around">
                            <br /><br />
                            <h1 className="f1 h3"><span role="img" aria-label="yay">🎊</span> Winner <span role="img" aria-label="yay">🎊</span></h1>
                            <h3 className="f3 h3"><span className="b">{ this.context.state.Winner }</span> { this.context.state.Winner === "Scribe" ? "has" : "have" } won!</h3>
                        </div>
                    )
                    : null
                }
            </div>
        );
    }
};