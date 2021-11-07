
export class AlertVariable {
    constructor(value) {
        this._value = value;
        this.boundFunctions = [];
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        this._value = newValue;
        this.callFuncs();
    }

    callFuncs() {
        this.boundFunctions.forEach(func => {
            func(this.value)
        })
    }

    bindFunction(func) {
        this.boundFunctions.push(func);
    }

}
