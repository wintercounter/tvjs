import hyper, {wire, Component} from './node_modules/hyperhtml/min.js';

function gs() {
    const _c = Symbol()
    const _s = Symbol();
    const _d = Symbol();
    const _tpl = Symbol();
    const _ts = Object.prototype.toString
    const o =  {
        [_s] : {},
        state(s = {}) {
            Object.assign(o[_s], s);
            return o
        },
        onclick(f = function () {console.log('onclick')}) {
            const {name:n} = f
            const na = 'handleClick'
            o[n ? n : na] = f
            console.info('onclick', o)
            return o
        },
        get render() {
            return function(d = document.body) {
                return function(...a) {
                    o[_c] = class extends Component {
                        get defaultState() {return o[_s]}
                        static get _tpl() { return a }
                        render() {
                            o[_s] = this.state
                            return this.html(...a)
                        }
                    }

                    o[_d] = hyper(
                        _ts.call(d) === "[object String]"
                            ? document.querySelector(d)
                            : d
                    )`${new o[_c]}`
                    return o
                }
            }
        },
        blackhole(fn) {
            _ts.call(fn) === '[object Function]' && fn()
            return o
        },
        testAfter(){
            console.log('after')
            return o
        },
        get wire() {
            return wire;
        }
    }
    return o
}

let c = Object.defineProperty({}, 'g', {
    get: gs,
    set: gs
});

export default c.g;

/////////////////////////////////////////////////////


/*
(`
    <button onclick=${this.handleClick}>
`);*/

// TODO
/**
 * ES6 Dynamic imports for handlers on call.
 */


// Examples
/**
const cmp = v;

cmp.
    .state({isClicked : false})
    .onclick(function(){
        this.setState({isClicked: true})
    })
    .render`
        <button onclick=${cmp.handleClick}>${cmp.state.isClicked ? 'Clicked' : 'Not Clicked'}</button>
    `
 */
