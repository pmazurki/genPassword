const keyFilter = (el, name) => el.filter(el => el.key === name).pop()

const nameNumber = {
    si: [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'Thousand' },
        { value: 1e6, symbol: 'Million' },
        { value: 1e9, symbol: 'Billion' },
        { value: 1e12, symbol: 'Trillion' },
        { value: 1e15, symbol: 'Billiard' },
        { value: 1e18, symbol: 'Trillion' },
        { value: 1e21, symbol: 'Tryliard' },
        { value: 1e24, symbol: 'Quadrillion' },
        { value: 1e30, symbol: 'Kwintylio' },
        { value: 1e36, symbol: 'Sextile' },
        { value: 1e42, symbol: 'Septylion' },
        { value: 1e48, symbol: 'Octylion' },
        { value: 1e54, symbol: 'Nonylion' },
        { value: 1e60, symbol: 'Decylion' },
        { value: 1e100, symbol: 'Gugol' },
    ],
    get(n) {
        const valFilter = el => el.filter(el => n >= el.value).pop()
        const getNumber = el => (n / valFilter(el).value).toFixed(0)
        const getSymbol = el => valFilter(el).symbol
        const getSi = el => `${getNumber(el)} ${getSymbol(el)}`
        return n ? (n <= 1000 ? n : getSi(this.si)) : false
    },
}

export default {
    char: [
        { key: 1, value: 'abcdefghijklmnopqrstuvwxyz' },
        { key: 2, value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
        { key: 3, value: '1234567890' },
        { key: 4, value: '!@#$%&* ' },
        { key: 5, value: '!@#$%^&*(){}[]=<>/,. ' },
    ],
    comPerSec: [{
            key: 2,
            value: 513.855 * 10 ** 12,
            name: 'RIKEN Center for Computational Science Cores(7 299 072) Memory(4 866 048 GB)',
        },
        { key: 3, value: 107.6 * 10 ** 12 * 2, name: 'GeForce RTX 2080 Ti x2' },
        {
            key: 1,
            value: (100 / 100) * 115 * 10 ** 9 * 10000000,
            name: 'Botnet Metulji i Mariposa 10 Million host cpu 30%',
        },
        { key: 5, value: 12 * 10 ** 12, name: 'Xbox Series X (Navi - RDNA 2)' },
        { key: 4, value: 1571 * 10 ** 9, name: 'AMD Ryzen Threadripper 3990X' },
        { key: 6, value: 115 * 10 ** 9, name: 'Intel Core i5-6400  4GB' },
        { key: 7, value: 13.5 * 10 ** 9, name: 'Raspberry Pi-4B (4GB) 64-bit' },
    ],
    separate: '-',
    isSpace: 0,
    step: 3,

    get(n, typ, s) {
        let a
        s ? (this.isSpace = s) : s

        const filterChar = { key: typ }
        const filterObjectArray = (data, filterChar) => {
            let result = data.reduce((a, b) => (!filterChar['key'].includes(b.key) ? a : [...a, b]), [])
            return Object.keys(result).map(key => result[key].value)
        }

        const randLength = el => Math.floor(Math.random() * el.length)
        const getArr = el => el[randLength(el)]
        const getRandArr = () => getArr(getArr(filterObjectArray(this.char, filterChar)))
        const isSpaces = (is, i) => (is ? (i % is == 1 ? is : !is) : is)

        // const resPass = i => {
        //     a = isSpaces(this.isSpace, i)
        //     a ? (res += getRandArr() + this.separate) : (res += getRandArr())
        //     return a ? res.substring(0, res.length - 1) : res
        // }

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
        return incArr(n)
    },
    getInfo(n, typ, s, spec) {
        const pass = this.get(n, typ, s)
        const comp = this.comPerSec
        const lengthPass = pass.length
            //comPerSec = this.comPerSec.filter(el => el.name.includes(spec))[0].value /find name
        const comPerSec = keyFilter(comp, spec).value
        const comName = keyFilter(comp, spec).name
        const collection = keyFilter(this.char, typ)
            .value.map(el => el.length)
            .reduce((total, next) => total + next)
        const allCases = collection ** lengthPass
        const contime = t => Math.floor(allCases / (comPerSec * t))
        return {
            pass: pass,
            lengthPass: lengthPass,
            collection: collection,
            allCases: nameNumber.get(allCases),
            seconds: nameNumber.get(contime(1)),
            minutes: nameNumber.get(contime(60)),
            hours: nameNumber.get(contime(60 * 60)),
            days: nameNumber.get(contime(60 * 60 * 24)),
            months: nameNumber.get(contime((60 * 60 * 24 * 7 * 52) / 12)),
            years: nameNumber.get(contime(60 * 60 * 24 * 7 * 52)),
            computer: comName,
            perSec: nameNumber.get(comPerSec),
            yearsToBreak: Math.floor(2 * Math.log2(allCases / (comPerSec * 60 * 60))),
        }
    },
}