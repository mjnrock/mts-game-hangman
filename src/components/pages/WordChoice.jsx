import React from "react";
import MTSLib from "@lespantsfancy/message-transfer-system";

import SignalTypes from "./../../SignalTypes";

export default class WordChoice extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            word: ""
        };
    }
    
    onChange(e) {
        this.setState({
            word: e.target.value
        });
    }

    onSetWordClick(e) {        
        this.context.message((new MTSLib.Message(
            SignalTypes.NEW_WORD,
            this.state.word
        )).elevate());
    }

    render() {
        return (
            <div className="flex flex-column items-center justify-around">
                <textarea
                    className="f2 mt4 w-90 code overflow-hidden"
                    style={{
                        resize: "none"
                    }}
                    rows="5"
                    maxLength="30"
                    onChange={ this.onChange.bind(this) }
                    value={ this.state.word }
                ></textarea>

                <button className="mt4 pa4 w-90 ba br2 f4 blue b--blue code" onClick={ this.onSetWordClick.bind(this) }>Begin</button>
            </div>
        );


        // if(this.context.state.Word === "") {
        //     return (
        //         <div className="flex flex-column items-center justify-around">
        //             <textarea
        //                 className="f2 mt4 w-90 code overflow-hidden"
        //                 style={{
        //                     resize: "none"
        //                 }}
        //                 rows="5"
        //                 maxLength="30"
        //                 onChange={ this.onChange.bind(this) }
        //                 value={ this.state.word }
        //             ></textarea>
    
        //             <button className="mt4 pa4 w-90 ba br2 f4 blue b--blue code" onClick={ this.onBeginClick.bind(this) }>Begin</button>
        //         </div>
        //     );
        // }

        // return (
        //     <div>
        //         <div className="flex flex-wrap items-center justify-around tc code">
        //             {
        //                 this.context.state.Word.split("").map((l, i)  => {
        //                     if(l.charCodeAt(0) < 65 || l.charCodeAt(0) > 90) {
        //                         return (
        //                             <div className="f3 pb2 ma1 w2" key={ i }>{ l }</div>
        //                         );
        //                     }

        //                     if(this.context.state.Letters.Correct.includes(l)) {                            
        //                         return (
        //                             <div className="f3 pb2 bb ma1 w2" key={ i }>{ l }</div>
        //                         );
        //                     }

        //                     return (
        //                         <div className="f3 pb2 bb ma1 w2" key={ i }>&nbsp;</div>
        //                     );
        //                 })
        //             }
        //         </div>
        //     </div>
        // );
    }
};