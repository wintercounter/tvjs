import hyper, {wire, Component} from './node_modules/hyperhtml/min.js'

function gs() {
    const _c = Symbol()
    const _ci = Symbol()
    const _s = Symbol()
    const _d = Symbol()
    const _tpl = Symbol()
    const _ts = Object.prototype.toString
    const _as = Symbol()
    let po
    const o =  {
        [_s] : {},
        defaultState(s = {}) {
            Object.assign(o[_s], s)
            return po
        },
        setState(s = {}) {
            o[_ci].setState(s)
            return po
        },
        get state(){
            return o[_ci] ? o[_ci].state : o[_s]
        },
        get render() {
            return function(...p) {
                let d = p[0]
                const r = function(...a) {
                    o[_tpl] = a
                    o[_c] = o[_c] || class extends Component {
                        get defaultState() {return o[_s]}
                        async render() {
                            o[_s] = this.state
                            if (!('raw' in a)) {
                                const x = a[0]((...ar) => o[_tpl] = ar)
                                if (x.then) {
                                    await x
                                    return o.render(d)(...o[_tpl])
                                }
                            }
                            return this.html(...o[_tpl])
                        }
                    }
                    if (d === false) {return po}
                    o[_ci] = o[_ci] || new o[_c]
                    o[_d] = hyper(
                        _ts.call(d) === "[object String]"
                            ? document.querySelector(d)
                            : d
                    )`${o[_ci]}`
                    return po
                }
                if (_c in o && _ts.call(d) === "[object String]") {
                    d = document.querySelector(d)
                    return r(...o[_tpl])
                }
                else if ((typeof p[0] === 'object' && 'raw' in p[0])) {
                    d = document.body
                    return r(...p)
                }
                return r
            }
        },
        blackhole(fn) {
            _ts.call(fn) === '[object Function]' && fn()
            return po
        },
        testAfter(){
            console.log('after')
            return po
        },
        get wire() {
            return wire
        }
    }
    po = new Proxy(o, {
        get(obj, prop) {
            return (prop in obj)
                ? obj[prop]
                : function(fn) {
                    obj[prop] = fn
                    return po
                }
        }
    });
    return po
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
