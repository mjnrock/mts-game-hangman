import React from "react";
import ReactDOM from "react-dom";

import Context from "./Context";
import App from "./App";

Context.MTS.Network.webSocketNode({ uri: `192.168.86.100:3000` });

ReactDOM.render(
    <App />,
    document.getElementById("root")
);