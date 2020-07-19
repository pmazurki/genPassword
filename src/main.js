//module
import Rand from './generator.js'

// variables
const viewElements = {}
let getPassword
let setPwdLength = 9
    // simple functions
const getDOMElements = id => document.getElementById(id)

// functions
const connectHTMLElements = () => {
    viewElements.genPassword = getDOMElements('genPasswordView')
    viewElements.genPasswordInput = getDOMElements('genPasswordInput')
    viewElements.genPasswordBtnGen = getDOMElements('genPasswordBtnGen')
    viewElements.genPasswordBtnCopy = getDOMElements('genPasswordBtnCopy')
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
    getPassword = Rand.get(setPwdLength, 1)
    viewElements.genPasswordInput.placeholder = ''
    viewElements.genPasswordInput.value = getPassword
}
const onClickCopySubmit = () => {
    viewElements.genPasswordInput.value = ''
    navigator.clipboard.writeText(getPassword)
    viewElements.genPasswordInput.placeholder = 'Copied to clipboard'
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