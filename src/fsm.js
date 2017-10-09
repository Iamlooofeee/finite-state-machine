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
    	this.clear = 0;
    	this.states = config.states;
        this.state = config.initial; 
        this.states = config.states;
    	this.check = 0;
    	this.bool = false;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
    	this.bool = true;
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
        			return;
        		}
        	}
        }
        throw new Error();
    }


    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
    	this.bool = true;
		if (this.check === 1) {
       		throw new Error;
       	}
		for ( var key in this.states ) {
        	for (var key1 in this.states[key].transitions ) {
        		if (key1 === event) {
        			this.state = this.states[key].transitions[key1];
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
    	this.bool = true;
    	this.state = this.config.initial;;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
    	this.bool = true;
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
    	if (!this.bool) {
    		return false;
    	}
    	this.bool = true;
    	if (this.clear === 1) {
    		return false;
    	}
    	if(this.state === undefined) {
    		return false;
    	}

		var num;
        for ( var key in this.config ) {
			var a=[],str;
			a.push(Object.getOwnPropertyNames(this.config[key]));
        }
        str = a.join();
        a = str.split(',')
        
		for ( var key in this.states ) {
        	for (var key1 in this.states[key].transitions ) {
        		if (this.state === this.states[key].transitions[key1]) {
        			num = a.indexOf(key);
        			if(num === 0) {
        				return false;
        			} else {
        				this.state = a[num-1];
        				return true;
        			}
        		}
        	}
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
    	} else if (!this.bool) {
    		return this.bool;
    	} else if (!this.undo()) {
    		return false;
    	}
    }

    /**
     * Clears transition history
     */
    clearHistory() {
    	this.bool = true;
    	this.clear = 1;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
