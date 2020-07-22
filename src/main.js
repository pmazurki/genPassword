//module
import Rand from './generator.js'
import getHash from './hash.js'
// variables
const viewElements = {}
const viewElementsId = [
    //view
    'genPasswordView',
    'genPasswordShaView',
    'genPasswordSetupView',
    'genPasswordInfoView',
    //input
    'genPasswordInput',
    'genHashInput',
    //btn
    'genPasswordSetLengthInput',
    'genPasswordBtnGen',
    'genPasswordBtnCopy',
    'genPasswordBtnHash',
    'genPasswordBtnSetup',
    'genHashBtnSHA1',
    'genHashBtnSHA2',
    'genPasswordSetLengthBtnMinus',
    'genPasswordSetLengthBtnPlus',
]

let getPassword
let setChar = 44
let setStep = 3
let setPwdLength = 9
let sha = 'SHA-1'

// let swDisplay = 'none'
// simple functions
const getDOMElements = id => document.getElementById(id)
const swDisplay = el => (el.style.display === 'none' ? (el.style.display = 'block') : (el.style.display = 'none'))
const getIdtoArry = (o, p, n) => Object.defineProperty(o, p, { value: getDOMElements(p) })
async function hash(str, encode) {
    viewElements.genHashInput.value = await getHash(str, encode)
}

// functions
const connectHTMLElements = () => viewElementsId.map(id => getIdtoArry(viewElements, id))

const setupListeners = () => {
        viewElements.genPasswordInput.addEventListener('keydown', onEnterSubmit)
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
    }
    // ini functions
const iniApp = () => {
        connectHTMLElements()
        setupListeners()
        loadView()
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

const onClickHashSubmit = () => swDisplay(viewElements.genPasswordShaView)

const onClickSetupSubmit = () => swDisplay(viewElements.genPasswordSetupView)

// switch view
const loadView = () => {
    viewElements.genPasswordView.style.display = 'block'
    viewElements.genPasswordShaView.style.display = 'none'
    viewElements.genPasswordSetupView.style.display = 'none'
    viewElements.genPasswordInfoView.style.display = 'none'
}
document.addEventListener('DOMContentLoaded', iniApp)