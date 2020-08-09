//module
import GetPassword from './genPass.js'

import getHash from './hash.js'

const Rand = new GetPassword()
    // variables
const viewElements = {}
const viewElementsId = [
    //view
    { id: 'genPasswordView' },
    { id: 'genPasswordShaView' },
    { id: 'genPasswordSetupView' },
    { id: 'genPasswordInfoView' },
    //input
    { id: 'genPasswordInput' },
    { id: 'genHashInput' },
    { id: 'genPasswordSetLengthInput' },
    //btn
    { id: 'genPasswordBtnGen' },
    { id: 'genPasswordBtnCopy' },
    { id: 'genPasswordBtnHash' },
    { id: 'genPasswordBtnSetup' },
    { id: 'genHashBtnSHA1' },
    { id: 'genHashBtnSHA2' },
    { id: 'genPasswordSetLengthBtnMinus' },
    { id: 'genPasswordSetLengthBtnPlus' },
    { id: 'btnCheckDigitals' },
    { id: 'btnCheckUpper' },
    { id: 'btnCheckLower' },
    { id: 'btnCheckSpecial' },
]
let password
let setChar = [1, 2, 3]
let setStep = 3
let setPwdLength = 9
let sha = 'SHA-1'
let sw = 0

// simple functions
const getDOMElements = id => document.getElementById(id)
const getIdArry = (obj, param) => Object.defineProperty(obj, param, { value: getDOMElements(param) })
const loopIn = (el, t, o = 0) => {
    o < 10 ? setTimeout(() => loopIn(el, t, ++o), t) : o
    o === 0 ? swDisplay(el) : null
    el.style.opacity = (o * 0.1).toFixed(1)
}
const loopOut = (el, t, o = 10) => {
    o > 0 ? setTimeout(() => loopOut(el, t, --o), t) : o
    el.style.opacity = (o * 0.1).toFixed(1)
    o === 0 ? swDisplay(el) : null
}
const swfn = () => (sw === 0 ? (sw = 1) : (sw = 0))
const arrRemove = (arr, value) => arr.filter(el => el != value)
const swDisplay = el => (el.style.display === 'none' ? (el.style.display = 'block') : (el.style.display = 'none'))
const fadeInOut = el => (el.style.opacity === '0' || el.style.opacity === '' ? loopIn(el, 40) : loopOut(el, 55))

async function hash(str, encode) {
    viewElements.genHashInput.value = await getHash(str, encode)
}
///tabela
const genTableHead = (el, data) => {
    let table = document.querySelector(el)
    let thead = table.createTHead()
    let headData = Object.keys(data[0])
    thead.classList.add('bg-info')
    thead.classList.add('text-center')
    thead.classList.add('text-uppercase')
    thead.classList.add('text-uppercase')
    let row = thead.insertRow()
    for (let key of headData) {
        let th = document.createElement('th')
        let text = document.createTextNode(key)
        th.appendChild(text)
        row.appendChild(th)
    }
    let tbody = document.createElement('tbody')
    table.appendChild(tbody)
    for (let element of data) {
        let row = tbody.insertRow()
        for (key in element) {
            let cell = row.insertCell()
            let text = document.createTextNode(element[key])
            cell.appendChild(text)
        }
    }
}

// functions
const connectHTMLElements = () =>
    Object.keys(viewElementsId).map(key => getIdArry(viewElements, viewElementsId[key].id))

const setupListeners = () => {
        // viewElements.genPasswordInput.addEventListener('keydown', onEnterSubmit)
        viewElements.genPasswordSetLengthInput.addEventListener('keydown', onEnterLengthSubmit)
        viewElements.genPasswordSetLengthInput.addEventListener('focusout', onEnterLengthFocusout)

        viewElements.genPasswordBtnGen.addEventListener('click', onClickGenSubmit)
        viewElements.genPasswordBtnCopy.addEventListener('click', onClickCopySubmit)
        viewElements.genPasswordBtnHash.addEventListener('click', onClickHashSubmit)
        viewElements.genPasswordBtnSetup.addEventListener('click', onClickSetupSubmit)
        viewElements.genHashBtnSHA1.addEventListener('click', onClickSHA1Submit)
        viewElements.genHashBtnSHA2.addEventListener('click', onClickSHA2Submit)
        viewElements.genPasswordSetLengthBtnMinus.addEventListener('click', onClickMinusSubmit)
        viewElements.genPasswordSetLengthBtnPlus.addEventListener('click', onClickPlusSubmit)
        viewElements.btnCheckDigitals.addEventListener('click', onClickCheckDigitals)
        viewElements.btnCheckUpper.addEventListener('click', onClickbtnCheckUpper)
        viewElements.btnCheckLower.addEventListener('click', onClickbtnCheckLower)
        viewElements.btnCheckSpecial.addEventListener('click', onClickbtnCheckSpecial)
    }
    // ini functions
const iniApp = () => {
        connectHTMLElements()
        setupListeners()
        loadView()
    }
    // ini app
    // function actions
    // const onEnterSubmit = () => console.log('onEnterSubmit')

const onClickGenSubmit = () => {
    let { password } = Rand.get(setPwdLength, setChar, setStep)

    viewElements.genPasswordInput.placeholder = ''
    viewElements.genPasswordInput.value = password
    hash(password, sha)
}
const onClickCopySubmit = () => {
    viewElements.genPasswordInput.value = ''
    navigator.clipboard.writeText(password)
    viewElements.genPasswordInput.placeholder = 'Copied to clipboard'
}
const onClickSHA1Submit = () => {
    sha = 'SHA-1'
    password ? hash(password, sha) : null
}

const onClickSHA2Submit = () => {
    sha = 'SHA-256'
    hash(password, sha)
}

const onEnterLengthSubmit = event => {
    event.key === 'Enter' ? (setPwdLength = viewElements.genPasswordSetLengthInput.value) : setPwdLength
}
const onEnterLengthFocusout = event => {
    setPwdLength = viewElements.genPasswordSetLengthInput.value
}
const onClickMinusSubmit = () => {
    setPwdLength > 1 ? (setPwdLength -= 1) : setPwdLength
    viewElements.genPasswordSetLengthInput.value = setPwdLength
}
const onClickPlusSubmit = () => {
    viewElements.genPasswordSetLengthInput.value = setPwdLength
    setPwdLength < 99 ? (setPwdLength += 1) : setPwdLength
}

const onClickHashSubmit = () => fadeInOut(viewElements.genPasswordShaView)

const onClickSetupSubmit = () => fadeInOut(viewElements.genPasswordSetupView)

const onClickCheckDigitals = () => {
    viewElements.btnCheckDigitals.classList.toggle('active')
    setChar.some(el => el === 3) ? (setChar = arrRemove(setChar, 3)) : setChar.push(3)
}
const onClickbtnCheckUpper = () => {
    viewElements.btnCheckUpper.classList.toggle('active')
    setChar.some(el => el === 2) ? (setChar = arrRemove(setChar, 2)) : setChar.push(2)
}
const onClickbtnCheckLower = () => {
    viewElements.btnCheckLower.classList.toggle('active')
    setChar.some(el => el === 1) ? (setChar = arrRemove(setChar, 1)) : setChar.push(1)
}
const onClickbtnCheckSpecial = () => {
    viewElements.btnCheckSpecial.classList.toggle('active')
    setChar.some(el => el === 4) ? (setChar = arrRemove(setChar, 4)) : setChar.push(4)
}

// switch view
const loadView = () => {
    viewElements.genPasswordView.style.display = 'block'
    viewElements.genPasswordShaView.style.display = 'none'
    viewElements.genPasswordSetupView.style.display = 'none'
    viewElements.genPasswordInfoView.style.display = 'none'
    viewElements.btnCheckDigitals.classList.add('active')
    viewElements.btnCheckUpper.classList.add('active')
    viewElements.btnCheckLower.classList.add('active')
}
document.addEventListener('DOMContentLoaded', iniApp)