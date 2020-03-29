/* eslint-disable no-unused-vars */
import React from "react";
import MTSLib from "@lespantsfancy/message-transfer-system";

import SignalTypes from "./SignalTypes";

import Context from "./Context";
import Viewports from "./components/viewports/package";
import Pages from "./components/pages/package";

export default class App extends React.Component {
    static contextType = Context.MTSContext;

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
    }    
    componentWillUnmount() {
        this.context.unsubscribe(this.state.subscriptionId)
    }
    
    onRequestNewGame(e) {        
        this.context.message((new MTSLib.Message(
            SignalTypes.NEW_GAME,
            true
        )).elevate());
    }

    render() {
        if(this.context.state.Winner !== false) {
            return (
                <div>
                    <h1>Congratulations!</h1>
                    <h3>{ this.context.state.Winner } { this.context.state.Winner === "Scribe" ? "has" : "have" } won!</h3>
                    <br /><br /><br />
                    <button onClick={ this.onRequestNewGame.bind(this) }>Play Again</button>
                </div>
            );
        } else {
            return (
                <div>
                    <Viewports.Game />
                    <Pages.WordChoice />
                    <Pages.Alphabet />
                </div>
            );
        }
    }
};