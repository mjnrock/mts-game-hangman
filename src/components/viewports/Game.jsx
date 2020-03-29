import React from "react";

export default class ReadyCheck extends React.Component {
    onClick(e) {
        alert("Yup");
    }

    render() {
        console.log(this.context.state.Word.split(""))
        return (
            <div className="flex flex-column items-center justify-around">
                <div className="flex items-center justify-around">
                    <div>
                        <h3 className="f3 pb2 bb">Correct</h3>
                        <div className="tc f4 pt2 code">
                            {
                                this.context.state.Letters.Correct.map((l, i)  => (
                                    <div key={ i }>{ l }</div>
                                ))
                            }
                        </div>
                    </div>

                    <div>
                        <h3 className="f3 pb2 bb">Attempts Remaining</h3>
                        <div className="tc f4 pt2 code">
                            { 5 - this.context.state.Letters.Incorrect.length }
                        </div>
                    </div>

                    <div>
                        <h3 className="f3 pb2 bb">Incorrect</h3>
                        <div className="tc f4 pt2 code">
                            {
                                this.context.state.Letters.Incorrect.map((l, i) => (
                                    <div key={ i }>{ l }</div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-around tc">
                    {
                        this.context.state.Word.split("").map((l, i)  => {
                            if(l === " ") {
                                return (
                                    <div className="f3 pb2 ma1 w2" key={ i }>&nbsp;</div>
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