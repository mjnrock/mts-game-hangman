import React from "react";

export default class ReadyCheck extends React.Component {
    onClick(e) {
        alert("Yup");
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        {
                            this.context.state.Letters.Correct.map(l => (
                                <div>{ l }</div>
                            ))
                        }
                    </div>
                    <div>Attempts Remaining: { 5 - this.context.state.Letters.Incorrect.length }</div>
                    <div>
                        {
                            this.context.state.Letters.Incorrect.map(l => (
                                <div>{ l }</div>
                            ))
                        }
                    </div>
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