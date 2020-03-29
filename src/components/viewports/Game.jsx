import React from "react";

export default class ReadyCheck extends React.Component {
    onClick(e) {
        alert("Yup");
    }

    render() {
        return (
            <div className="flex flex-column items-center justify-around">
                <div>
                    { 5 - this.context.state.Letters.Incorrect.length }
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
            </div>
        );
    }
};