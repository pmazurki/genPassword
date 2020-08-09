import { char, comPerSecData, si } from './data/data.js'

class GetPassword {
    constructor() {
        this.si = {}
        this.char = {}
        this.comPerSec = {};
        (this.separate = '-'), (this.isSpace = false), (this.step = 3)
        this.collectionChar = {}
    }
    ntoNum = n => {
        this.si = si

        const valFilter = el => el.filter(el => n >= el.value).pop()
        const getNumber = el => (n / valFilter(el).value).toFixed(0)
        const getSymbol = el => valFilter(el).symbol
        const getSi = el => `${getNumber(el)} ${getSymbol(el)}`
        return n ? (n <= 1000 ? n : getSi(this.si)) : false
    }

    get(n, typ, s) {
        s ? (this.isSpace = s) : s
        let a
        this.char = char
        const filterTyp = {
            key: typ,
        }
        const result = this.char.reduce((a, b) => (!filterTyp['key'].includes(b.key) ? a : [...a, b]), [])

        this.collectionChar = Object.keys(result).map(key => result[key].value)
        const randLength = el => Math.floor(Math.random() * el.length)
        const getArr = el => el[randLength(el)]
        const getRandArr = () => getArr(getArr(this.collectionChar))
        const isSpaces = (is, i) => (is ? (i % is == 1 ? is : !is) : is)
        const incArr = n => {
            let res = ''
            const inc = (n, i = 0) => {
                if (n > i) {
                    inc(n, ++i)
                    a = isSpaces(this.isSpace, i)
                    a ? (res += getRandArr() + this.separate) : (res += getRandArr())
                    return a ? res.substring(0, res.length - 1) : res
                }
            }
            return inc(n)
        }
        return {
            password: incArr(n),
        }
    }

    info(n, typ, s, spec) {
        const { password } = this.get(n, typ, s)
        const collection = this.collectionChar.map(el => el.length).reduce((total, next) => total + next)
        const allCases = collection ** password.length
        const keyFilter = (el, name) => el.filter(el => el.key === name).pop()
        const computerName = keyFilter(comPerSecData, spec).name
        const comPerSec = Number(keyFilter(comPerSecData, spec).value)
        const conTime = t => Math.floor(allCases / (comPerSec * t))
        return {
            password: password,
            lengthPass: password.length,
            result: collection,
            allCases: this.ntoNum(allCases),
            computerName,
            comPerSec: this.ntoNum(comPerSec),
            seconds: this.ntoNum(conTime(1)),
            minutes: this.ntoNum(conTime(60)),
            hours: this.ntoNum(conTime(60 * 60)),
            days: this.ntoNum(conTime(60 * 60 * 24)),
            months: this.ntoNum(conTime((60 * 60 * 24 * 7 * 52) / 12)),
            years: this.ntoNum(conTime(60 * 60 * 24 * 7 * 52)),
            yearsToBreak: this.ntoNum(Math.floor(2 * Math.log2(allCases / (comPerSec * 60 * 60)))),
        }
    }
}
export { GetPassword as default }