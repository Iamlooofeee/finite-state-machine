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
    	this.state = 'normal';
    	
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
    	if (this.state )
    	return this.state;
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
    	this.event = event;

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
    		return a
    	} else if (0) {
    		
    	} else if (0) {

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
