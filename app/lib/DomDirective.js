import Class from './Class';
import request from './Request';
import it from './It';


class Dataset extends Class {
    _proxyfyDataset(onChange = Function.prototype) {
        return new Proxy(this, {
            get: (target, property) => {
                if (property[0] === '_') throw new Error(`Cannot get private property ${property} of ${target.constructor.name}`);
                else return target.domElement.dataset[property];
            },
            set: (target, property, value, receiver) => {
                if (property[0] === '_') throw new Error(`Cannot set private property ${property} of ${target.constructor.name}`);
                else {
                    const oldValue = target.domElement.dataset[property];
                    target.domElement.dataset[property] = value
                    const raiseEvent = onChange.bind(this, Class.getChangeEvent(target, 'propertyChanged', { property, value, oldValue }));
                    setTimeout(raiseEvent);
                };
            },
            has: (target, property) => {
                if (property[0] === '_') return false;
                else return property in target.domElement.dataset;
            },
            deleteProperty: (target, property) => {
                if (property[0] === '_') throw new Error(`Cannot delete private property ${property} of ${target.constructor.name}`);
                else {
                    const oldValue = target.domElement.dataset[property];
                    const raiseEvent = onChange.bind(this, Class.getChangeEvent(target, 'propertyDeleted', { property, oldValue }));
                    setTimeout(raiseEvent);
                    return delete target.domElement.dataset[property];
                }
            },
            ownKeys: target => Object.keys(target).filter(key => key[0] !== '_')
        })
    }

    constructor(domElement){
        this._domElement = domElement;
        this._dataset = _proxyfyDataset(this.onChange);
        return this._secure;
    }

    get onChange() {
        return this._onChange;
    }

    set onChange(val) {
        this._onChange = val;
    }
}

export default class DomDirective extends Class {
    constructor(domElement, options) {
        this.dataset = new Dataset(domElement);
        const delegate = domElement;
        ['addEventListener', 'removeEventListener', 'dispatchEvent'].forEach(method => {
            this[method] = (...xs) => delegate[method](...xs)
        })
        return super(domElement);
    }
}