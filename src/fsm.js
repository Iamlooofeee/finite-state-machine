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
    	this.states = config.states 
        this.state = config.initial; 
        this.states = config.states;
    	
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
		for ( var key in this.states ) {
        	for (var key1 in this.states[key].transitions ) {
        		if (key1 === event) {
        			this.state = this.states[key].transitions[key1];
        			return;
        		}
        	}
        }
        throw new Error();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
    	this.state = this.config.initial;;
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
    	var bool=true;
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
    	} 

    	if (!this.undo()) {
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
