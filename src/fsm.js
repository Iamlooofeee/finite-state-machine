class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
    	this.a = 0;
    	if (config === undefined) {
    		throw new Error;
    	}
    	
    	this.config = config;
    	this.states = config.states;
        this.state = config.initial; 
    	this.bool = false;
        this.check = 0;
        this.initial = config.initial;

        this.masStates = [this.initial];
        this.delStates = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
    	return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
    	this.bool = true;
		for ( var key in this.states ) {
        	for (var key1 in this.states[key].transitions ) {
        		if(state === this.states[key].transitions[key1]) {
        			this.state = state;
                    this.masStates.push(this.state);
                    this.bool = false;
        			return;
        		}
        	}
        }
        throw new Error;
    }


    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.check === 1) {
            throw new Error;
        }

		for ( var key in this.states ) {
        	for (var key1 in this.states[key].transitions ) {
        		if (key1 === event) {
        			this.state = this.states[key].transitions[key1];
                    this.masStates.push(this.state);
                    this.bool = false;
        			return;
        		}
        	}
        }
        this.check = 1;
        throw new Error;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
    	this.state = this.initial;
        this.masStates = [this.initial];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
    	var arr = [];
        if (event) {
            for (var key in this.states) {
                	if (this.states[key].transitions.hasOwnProperty(event)) {
                    arr.push(key);     
                	}
			}
            return arr;
        } else {
            return Object.keys(this.states);
        }
    }


    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
    	if (this.masStates.length >= 2) {
            this.state = this.masStates[this.masStates.length-2];
            this.delStates.push(this.masStates[this.masStates.length-1]);
            this.masStates.pop();
            this.bool = true;
            return true;
        } else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
    	if (this.delStates.length > 0) {
            if (this.bool) {
                this.state = this.delStates[this.delStates.length-1];
                this.masStates.push(this.delStates[this.delStates.length-1]);
                this.delStates.pop();               
                return true;
            } else {
             return false;
            }
        } else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
    	this.masStates = [this.initial];
        this.delStates = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
