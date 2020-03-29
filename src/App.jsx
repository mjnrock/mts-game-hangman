/* eslint-disable no-unused-vars */
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
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

    render() {
        // return (
        //     <Router>
        //         <Switch>
        //             <Route path="/c">

        //             </Route>
        //             <Route path="/v">
        //                 <Viewports.Game />
        //             </Route>
        //         </Switch>
        //     </Router>
        // )
        
        console.log(this.context.state.Scribe);
        console.log(this.context.Network.getWebSocketNode().id);
        console.log(this.context.state.Scribe === this.context.Network.getWebSocketNode().id);

        if(this.context.state.Winner !== false) {
            return (
                <Pages.Winner />
            );
        } else {
            return (
                <div>
                    <Viewports.Game />
                    {
                        this.context.state.Scribe === this.context.Network.getWebSocketNode().id
                        ? <Pages.WordChoice />
                        : <Pages.Alphabet />
                    }
                </div>
            );
        }
    }
};