import MTSLib from "@lespantsfancy/message-transfer-system";

const express = require("express");
const path = require("path");
const app = express();
const expressWs = require("express-ws")(app);
const port = 3000;

const Game = {
    SignalTypes: {
        REQUEST_GAME: "Game.RequestGame",

        NEW_GAME: "Game.NewGame",
        NEW_PLAYER: "Game.NewPlayer",
        NEW_GUESS: "Game.NewGuess",
        NEW_WORD: "Game.NewWord",

        DECLARE_MODE: "Game.DeclareMode",
        DECLARE_PLAYERS: "Game.DeclarePlayers",
        DECLARE_LETTERS: "Game.DeclareLetters",
        DECLARE_WORD: "Game.DeclareWord",
        DECLARE_WINNER: "Game.DeclareWinner",

        SYNC_STATE: "Game.SyncState",
    },
    State: {
        Players: [],
        Viewers: [],
        Scribe: null,
        Winner: false,
        Word: "",
        Letters: {
            Correct: [],
            Incorrect: [],
            Remaining: []
        },
    },
    init() {
        Game.State.Winner = false;
        Game.State.Letters = {
            Correct: [],
            Incorrect: [],
            Remaining: []
        };

        for(let i = 65; i <= 90; i++) {
            Game.State.Letters.Remaining.push(String.fromCharCode(i));
        }

        Game.assignScribe();

        MTS.send(Game.SignalTypes.NEW_GAME, {
            Players: [],
            Scribe: Game.State.Scribe,
            Winner: false,
            Word: "",
            Letters: {
                Correct: [],
                Incorrect: [],
                Remaining: []
            },
        }, { elevate: true });
    },
    check() {
        if(Game.State.Word.length > 1) {
            let word = Game.State.Word.split("").filter(l => l.charCodeAt(0) >= 65 && l.charCodeAt(0) <= 90);

            if(Game.State.Letters.Incorrect.length === 5) {
                MTS.send(Game.SignalTypes.DECLARE_WINNER, "Scribe", { elevate: true });
                
                Game.State.Winner = "Scribe";
            } else if(word.every(l => Game.State.Letters.Correct.includes(l))) {
                MTS.send(Game.SignalTypes.DECLARE_WINNER, "Players", { elevate: true });
                
                Game.State.Winner = "Players";
            }
        }
    },
    assignScribe() {
        if(Game.State.Players.length) {
            Game.State.Scribe = Game.State.Players[ 0 ];
        } else {
            Game.State.Scribe = null;
        }

        MTS.send(Game.SignalTypes.SYNC_STATE, Game.State, { elevate: true });
    }
};

const MTS = (new MTSLib.Main({
    receive: function(msg) {
        MTSLib.MSRP(msg, {
            scope: MTS
        })
        .if(Game.SignalTypes.NEW_PLAYER)
            .run(msg => {
                if(Game.State.Players.length === 0) {
                    Game.State.Scribe = msg.payload;
                }
    
                Game.State.Players.push(msg.payload);
            })
            .send(Game.SignalTypes.SYNC_STATE, Game.State, { elevate: true })
        .if(Game.SignalTypes.NEW_WORD)
            .call(Game.init)
            .run(msg => {
                Game.State.Word = msg.payload.toUpperCase();
            })
            .send(Game.SignalTypes.SYNC_STATE, Game.State, { elevate: true })
        .if(Game.SignalTypes.NEW_GUESS)
            .run(msg => {
                let letter = msg.payload;
    
                if(Game.State.Word.includes(letter) && !Game.State.Letters.Correct.includes(letter)) {
                    Game.State.Letters.Correct.push(letter);
                } else if(!Game.State.Letters.Incorrect.includes(letter)) {
                    Game.State.Letters.Incorrect.push(letter);
                }
                Game.State.Letters.Remaining = Game.State.Letters.Remaining.filter(l => l !== letter);
            })
            .send(Game.SignalTypes.SYNC_STATE, Game.State, { elevate: true })
            .call(Game.check)
        .if(Game.SignalTypes.NEW_GAME)
            .call(Game.init)
        .if(Game.SignalTypes.DECLARE_MODE)
            .run(msg => {                
                let id = MTSLib.Registry.SanitizeId(msg.source);
                
                if(msg.payload === "VIEWPORT") {
                    Game.State.Players = Game.State.Players.filter(p => p !== id);
                    Game.State.Viewers.push(id);
                }
            })
            .call(Game.assignScribe)
    }
})).loadNetwork(true);

Game.init();

app.ws("/", function (ws, req) {
    let id = MTS.Network.webSocketNode({
        ws,
        onClose: (wsn) => {
            Game.State.Players = Game.State.Players.filter(p => p !== wsn.id);
            Game.State.Viewers = Game.State.Viewers.filter(p => p !== wsn.id);            

            if(Game.State.Players.length) {
                Game.State.Scribe = Game.State.Players[ 0 ];
            } else {
                Game.State.Scribe = null;
            }
            
            MTS.send(Game.SignalTypes.SYNC_STATE, Game.State, { elevate: true });
        }
    });

    MTS.send(Game.SignalTypes.NEW_PLAYER, id);    
});

app.listen(port, () => {
    console.log(`Hangman server is running on port: ${ port }`)
});