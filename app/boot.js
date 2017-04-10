import Class from '/app/lib/Class';
import request from '/app/lib/request';

class DomDirective extends Class {
    
}

class Line extends Class {
    constructor(){
        return super();
    }
}

class History extends Class {

}

let input = document.createElement('input');
let str = new String('Change me');
input.value = str;
let observer = new MutationObserver(mutuations => {
    console.log('Something happened')
    mutuations.forEach(mutuation => console.log(mutuation.type));
})
let observerConfig = {
    attributes: true,
    childList: true, 
    characterData: true
}
document.body.appendChild(input);
observer.observe(input, observerConfig);

window.input = input;
window.str = str;
windo.test = new Test();