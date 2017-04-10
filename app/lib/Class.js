export default class Class {
    static getChangeEvent(target, name, details) {
        let event = new Event(name, { target });
        return Object.assign(event, details);
    }
    _proxyHandler(onChange = Function.prototype) {
        return {
            get: (target, property) => {
                if (property[0] === '_') throw new Error(`Cannot get private property ${property} of ${target.constructor.name}`);
                else return target[property];
            },
            set: (target, property, value, receiver) => {
                if (property[0] === '_') throw new Error(`Cannot set private property ${property} of ${target.constructor.name}`);
                else {
                    const oldValue = target[property];
                    target[property] = value
                    const raiseEvent = onChange.bind(this, Class.getChangeEvent(target, 'propertyChanged', { property, value, oldValue }));
                    setTimeout(raiseEvent, 0);
                };
            },
            has: (target, property) => {
                if (property[0] === '_') return false;
                else return property in target;
            },
            deleteProperty: (target, property) => {
                if (property[0] === '_') throw new Error(`Cannot delete private property ${property} of ${target.constructor.name}`);
                else {
                    const oldValue = target[property];
                    const raiseEvent = onChange.bind(this, Class.getChangeEvent(target, 'propertyDeleted', { property, oldValue }));
                    setTimeout(raiseEvent, 0);
                    return delete target[property];
                }
            },
            ownKeys: target => Object.keys(target).filter(key => key[0] !== '_')
        }
    }
    get _secure(){
        return new Proxy(this, this._proxyHandler());
    }

    constructor() {
        return this._secure;
    }
}