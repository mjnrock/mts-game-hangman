import React from "react";

export default class ReadyCheck extends React.Component {
    onClick(e) {
        alert("Yup");
    }

    render() {
        return (
            <div>
                <div>
                    <div>Correct Words</div>
                    <div>Man</div>
                    <div>Incorrect Words</div>
                </div>
                <div>
                    <div>#</div>
                    <div>#</div>
                    <div>#</div>
                    <div>#</div>
                    <div>#</div>
                </div>
            </div>
        );
    }
};