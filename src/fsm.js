class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
    	if (config === undefined) {
    		throw new Error;
    	}
    	this.config = config;
    	this.clear = 0;
    	this.states = config.states;

    	this.initial = config.initial;   
        this.state = this.initial; 
        this.states = config.states;
    	
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
    	if (this.state){
    		return this.state;
    	}
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
    	this.state = state;
    	

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
		for (var prop in this.states[this.state].transitions) {
            if (prop === event) {
                this.state = this.states[this.state].transitions[event];
                return;
            }
        }
        throw new Error();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
    	this.state = 'normal';
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
    	var a = [];
    	a = Object.keys(this.config.states);
    	if (event === undefined) {
    		return a;
    	} else if ( arguments.length != 0) {
    		a = [];
    		for (var i in this.states) {
    			if (this.states[i].transitions.hasOwnProperty(event)) {
    				a.push(i);
    			}
    		}
    		return a;
    	} else {
    		return [];
    	}
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
    	if (this.clear === 1) {
    		return false;
    	} else {
    		return true;
    	}
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
    	if (this.clear === 1) {
    		return false;
    	} else {
    		return true;
    	}
    }

    /**
     * Clears transition history
     */
    clearHistory() {
    	this.clear = 1;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
