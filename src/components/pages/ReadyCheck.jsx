import React from "react";

export default class ReadyCheck extends React.Component {
    onClick(e) {
        alert("Yup");
    }

    render() {
        return (
            <div>
                <div>
                    <div>X</div>
                    <div>X</div>
                </div>
                <div>
                    Are you ready?
                </div>
                <button onClick={ this.onClick.bind(this) }>Yes</button>
            </div>
        );
    }
};