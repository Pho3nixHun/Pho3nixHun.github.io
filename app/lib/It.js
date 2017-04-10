'use strict';

const _o = {
    plural: true,
    pluralChar: 's'
};

const it = (variable) => {
    const value = variable;
    const singleProxy = new Proxy({}, {
        get: (target, property) => {
            const isTypeMatches = (typeof value === property);
            const constructor = (typeof value === 'object') && value.constructor.name;
            const isConstructorMatches = (property === constructor);
            if (!(isTypeMatches || isConstructorMatches)) throw new Error(`Expected ${value}'s type/constructor to be ${property}. Got ${typeof value}`);
            return variable;
        }
    });
    const arrayOfProxy = new Proxy({}, {
        get: (target, property) => {
            let index = 0;
            property = (_o.plural && property.slice(_o.pluralChar.lenght) === _o.pluralChar) ? property.slice(0, _o.pluralChar.lenght) : property;
            if ((value.constructor || {}).name !== "Array") throw new Error(`Expected ${value} to be an Array. Got ${typeof value}`)
            try {
                for(item in value) { it(item)[property]; index++; }
            } catch (ex) {
                throw new Error(`Expected ${value} to be array of ${property}.`);
            }
            
            return variable;
        }
    });
	return {
        is: singleProxy,
        contains: arrayOfProxy,
        setup(options) {
            return Object.assign(_o, options);
        }
    }
}

export default it;