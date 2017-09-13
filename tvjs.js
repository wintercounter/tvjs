import hyper, {wire} from './node_modules/hyperhtml/min.js';

function gs() {
    const o =  {
        onclick(f = function () {console.log('onclick')}) {
            const {name:n} = f;
            const na = 'handleClick';
            o[n ? n : na] = f;
            console.info('onclick', o);
            return o
        },
        get render() {
            return hyper(document.body)
        }
    }

    return o
}

let c = Object.defineProperty({}, 'g', {
    get: gs,
    set: gs
});

const v = c.g;

const t = v;

const jajj = 'h';

t
    .onclick(function handleClick2() {console.log(2)})
    .render`<a href="#" onclick=${t.handleClick2}>${jajj}bgfh</a>`


//hyper(document.body)`<a href="#" onclick="${e => console.log(e)}">${jajj}bgfh</a>`

console.log(t, t.handleClick);

console.log('fut');

export default 1;

/*
(`
    <button onclick=${this.handleClick}>
`);*/

// TODO
/**
 * ES6 Dynamic imports for handlers on call.
 */
