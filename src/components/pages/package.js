import ReadyCheck from "./ReadyCheck";
import WordChoice from "./WordChoice";
import Alphabet from "./Alphabet";
import Winner from "./Winner";

import Context from "./../../Context";
ReadyCheck.contextType = Context.MTSContext;
WordChoice.contextType = Context.MTSContext;
Alphabet.contextType = Context.MTSContext;
Winner.contextType = Context.MTSContext;

export default {
    ReadyCheck,
    WordChoice,
    Alphabet,
    Winner
};