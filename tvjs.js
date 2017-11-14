import hyper, {wire, Component} from './node_modules/hyperhtml/min.js';

function gs() {
    const _c = Symbol()
    const _ci = Symbol()
    const _s = Symbol()
    const _d = Symbol()
    const _tpl = Symbol()
    const _ts = Object.prototype.toString
    let o =  {
        [_s] : {},
        defaultState(s = {}) {
            Object.assign(o[_s], s)
            return o
        },
        setState(s = {}) {
            o[_ci].setState(s)
            return o
        },
        get state(){
            return o[_ci] ? o[_ci].state : o[_s]
        },
        fn(f = function () {console.log('on')}) {
            const {name:n} = f
            o[n] = f
            return o
        },
        get render() {
            return function(...p) {
                let d = p[0];
                const r = function(...a) {
                    o[_c] = class extends Component {
                        get defaultState() {return o[_s]}
                        async render() {
                            o[_s] = this.state
                            if ('raw' in a[0]) {
                                o[_tpl] = a
                            }
                            else {
                                const x = a[0]((...ar) => o[_tpl] = ar)
                                if (x.then) {
                                    await x
                                    return o.render(d)(...o[_tpl])
                                }
                            }
                            console.log(o[_tpl])
                            return this.html(...o[_tpl])
                        }
                    }
                    o[_ci] = new o[_c]
                    o[_d] = hyper(
                        _ts.call(d) === "[object String]"
                            ? document.querySelector(d)
                            : d
                    )`${o[_ci]}`
                    return o
                };
                if (typeof p[0] === 'object' && 'raw' in p[0]) {
                    d = document.body
                    return r(...p)
                }
                return r
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
            return wire
        }
    }
    o = new Proxy(o, {
        get(obj, prop) {
            return (prop in obj)
                ? obj[prop]
                : function(fn) {
                    obj[prop] = fn
                    return o
                }
        }
    });
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
