/* eslint-disable no-unused-vars */
import React from "react";

import Viewports from "./components/viewports/package";
import Pages from "./components/pages/package";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Viewports.Game />
                <Pages.WordChoice />
            </div>
        );
    }
};