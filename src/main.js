//module
import Rand from './generator.js'
import getHash from './hash.js'
// variables
const viewElements = {}
let getPassword
let setChar = 44
let setStep = 3
let setPwdLength = 9
let sha = 'SHA-1'
    // simple functions
const getDOMElements = id => document.getElementById(id)

async function hash(str, encode) {
    viewElements.genHashInput.value = await getHash(str, encode)
}

// functions
const connectHTMLElements = () => {
    viewElements.genPasswordView = getDOMElements('genPasswordView')
    viewElements.genPasswordInput = getDOMElements('genPasswordInput')
    viewElements.genHashInput = getDOMElements('genHashInput')
    viewElements.genPasswordBtnGen = getDOMElements('genPasswordBtnGen')
    viewElements.genPasswordBtnCopy = getDOMElements('genPasswordBtnCopy')
    viewElements.genHashBtnSHA1 = getDOMElements('genHashBtnSHA1')
    viewElements.genHashBtnSHA2 = getDOMElements('genHashBtnSHA2')
    viewElements.genPasswordSetLengthBtnMinus = getDOMElements('genPasswordSetLengthBtnMinus')
    viewElements.genPasswordSetLengthBtnPlus = getDOMElements('genPasswordSetLengthBtnPlus')
    viewElements.genPasswordSetLengthInput = getDOMElements('genPasswordSetLengthInput')
}

const setupListeners = () => {
        viewElements.genPasswordInput.addEventListener('keydown', onEnterSubmit)
        viewElements.genPasswordSetLengthInput.addEventListener('keydown', onEnterLengthSubmit)
        viewElements.genPasswordSetLengthInput.addEventListener('focusout', onEnterLengthFocusout)
        viewElements.genPasswordBtnGen.addEventListener('click', onClickGenSubmit)
        viewElements.genPasswordBtnCopy.addEventListener('click', onClickCopySubmit)
        viewElements.genHashBtnSHA1.addEventListener('click', onClickSHA1Submit)
        viewElements.genHashBtnSHA2.addEventListener('click', onClickSHA2Submit)
        viewElements.genPasswordSetLengthBtnMinus.addEventListener('click', onClickMinusSubmit)
        viewElements.genPasswordSetLengthBtnPlus.addEventListener('click', onClickPlusSubmit)
    }
    // ini functions
const iniApp = () => {
        connectHTMLElements()
        setupListeners()
    }
    // ini app
    // function actions
const onEnterSubmit = () => console.log('onEnterSubmit')

const onClickGenSubmit = () => {
    getPassword = Rand.get(setPwdLength, setChar, setStep)
    viewElements.genPasswordInput.placeholder = ''
    viewElements.genPasswordInput.value = getPassword
    hash(getPassword, sha)
}
const onClickCopySubmit = () => {
    viewElements.genPasswordInput.value = ''
    navigator.clipboard.writeText(getPassword)
    viewElements.genPasswordInput.placeholder = 'Copied to clipboard'
}
const onClickSHA1Submit = () => {
    sha = 'SHA-1'
    hash(getPassword, sha)
}
const onClickSHA2Submit = () => {
    sha = 'SHA-256'
    hash(getPassword, sha)
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

document.addEventListener('DOMContentLoaded', iniApp)