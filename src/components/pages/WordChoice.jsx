import React from "react";

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

    onBeginClick(e) {
        alert("Begin!");
    }

    render() {
        return (
            <div>
                <input
                    style={{
                        width: "500px",
                        height: "80px",
                        padding: "10px",
                        fontSize: "6em"
                    }}
                    type="text"
                    onChange={ this.onChange.bind(this) }
                    value={ this.state.word }
                />

                <button onClick={ this.onBeginClick.bind(this) }>Begin</button>
            </div>
        );
    }
};