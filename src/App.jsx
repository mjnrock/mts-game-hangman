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
                <div className="tc mt4 flex flex-column items-center justify-around">
                    <h1 className="f1 h3"><span role="img" aria-label="yay">🎊</span> Winner <span role="img" aria-label="yay">🎊</span></h1>
                    <h3 className="f3 h3">{ this.context.state.Winner } { this.context.state.Winner === "Scribe" ? "has" : "have" } won!</h3>
                    <br /><br /><br />
                    <button className="pa4 w-90 ba br2 f4 blue b--blue code" onClick={ this.onRequestNewGame.bind(this) }>Play Again</button>
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