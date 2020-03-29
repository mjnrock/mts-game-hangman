import ReadyCheck from "./ReadyCheck";
import WordChoice from "./WordChoice";
import Alphabet from "./Alphabet";

import Context from "./../../Context";
ReadyCheck.contextType = Context.MTSContext;
WordChoice.contextType = Context.MTSContext;
Alphabet.contextType = Context.MTSContext;

export default {
    ReadyCheck,
    WordChoice,
    Alphabet
};