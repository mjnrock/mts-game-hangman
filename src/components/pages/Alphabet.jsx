import React from "react";

export default class Alphabet extends React.Component {
    onClick(e, char) {
        alert(`"${ String.fromCharCode(char) }" was clicked`);
    }

    render() {
        let chars = [];
        for(let i = 65; i <= 90; i++) {
            chars.push( i );
        }

        return (
            <div>
                {
                    chars.map(char => (
                        <button
                            style={{
                                margin: "4px",
                                width: "23vw",
                                height: "15vh",
                                color: "#888",
                                backgroundColor: "#eee",
                                border: "4px solid #888",
                                borderRadius: "3px",
                                fontSize: "6em"
                            }}
                            key={ char }
                            onClick={ e => this.onClick(e, char) }
                        >{ String.fromCharCode(char) }</button>
                    ))
                }
            </div>
        );
    }
};