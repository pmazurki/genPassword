import GetPassword from './genPass.js'
import { vElId } from './data/data.js'

import getHash from './hash.js'

const getPass = new GetPassword()

class genPassApp {
    constructor() {
        this.pass
        this.setChar = [1, 2, 3]
        this.setStep = 3
        this.setPwdLength = 9
        this.sha = 'SHA-1'
        this.vEl = {}
        this.iniApp()
    }
    iniApp = () => {
            this.connectHTMLElements()
            this.setupListeners()
            this.loadView()
        }
        // simple functions
    getDOMElements = id => document.getElementById(id)
    getIdArry = (obj, param) => Object.defineProperty(obj, param, { value: this.getDOMElements(param) })
    arrRemove = (arr, value) => arr.filter(el => el != value)
    connectHTMLElements = () => Object.keys(vElId).map(key => this.getIdArry(this.vEl, vElId[key].id))
        // animation
    loopIn = (el, t, o = 0) => {
        o < 10 ? setTimeout(() => this.loopIn(el, t, ++o), t) : o
        o === 0 ? this.swDisplay(el) : null
        el.style.opacity = (o * 0.1).toFixed(1)
    }
    loopOut = (el, t, o = 10) => {
        o > 0 ? setTimeout(() => this.loopOut(el, t, --o), t) : o
        el.style.opacity = (o * 0.1).toFixed(1)
        o === 0 ? this.swDisplay(el) : null
    }
    fadeInOut = el => (el.style.opacity === '0' || el.style.opacity === '' ? this.loopIn(el, 40) : this.loopOut(el, 55))
    swDisplay = el => (el.style.display === 'none' ? (el.style.display = 'block') : (el.style.display = 'none'))

    // sw

    // async hash
    async hash(str, encode) {
            this.vEl.genHashInput.value = await getHash(str, encode)
        }
        // element
    setupListeners = () => {
            // this.vEl.genPasswordInput.addEventListener('keydown', this.onEnterSubmit)
            this.vEl.genPasswordSetLengthInput.addEventListener('keydown', this.onEnterLengthSubmit)
            this.vEl.genPasswordSetLengthInput.addEventListener('focusout', this.onEnterLengthFocusout)
            this.vEl.genPasswordBtnGen.addEventListener('click', this.onClickGenSubmit)
            this.vEl.genPasswordBtnCopy.addEventListener('click', this.onClickCopySubmit)
            this.vEl.genPasswordBtnHash.addEventListener('click', this.onClickHashSubmit)
            this.vEl.genPasswordBtnSetup.addEventListener('click', this.onClickSetupSubmit)
            this.vEl.genHashBtnSHA1.addEventListener('click', this.onClickSHA1Submit)
            this.vEl.genHashBtnSHA2.addEventListener('click', this.onClickSHA2Submit)
            this.vEl.genPasswordSetLengthBtnMinus.addEventListener('click', this.onClickMinusSubmit)
            this.vEl.genPasswordSetLengthBtnPlus.addEventListener('click', this.onClickPlusSubmit)
            this.vEl.btnCheckDigitals.addEventListener('click', this.onClickCheckDigitals)
            this.vEl.btnCheckUpper.addEventListener('click', this.onClickBtnCheckUpper)
            this.vEl.btnCheckLower.addEventListener('click', this.onClickBtnCheckLower)
            this.vEl.btnCheckSpecial.addEventListener('click', this.onClickBtnCheckSpecial)
        }
        //Function on
    onClickGenSubmit = () => {
        let { password } = getPass.get(this.setPwdLength, this.setChar, this.setStep) //poprawka
        this.pass = password
        this.vEl.genPasswordInput.placeholder = ''
        this.vEl.genPasswordInput.value = this.pass
        this.hash(this.pass, this.sha)
    }
    onClickCopySubmit = () => {
        this.vEl.genPasswordInput.value = ''
        navigator.clipboard.writeText(this.pass)
        this.vEl.genPasswordInput.placeholder = 'Copied to clipboard'
    }
    onClickSHA1Submit = () => {
        this.sha = 'SHA-1'
        this.pass ? this.hash(this.pass, this.sha) : null
    }
    onClickSHA2Submit = () => {
        this.sha = 'SHA-256'
        this.hash(this.pass, this.sha)
    }
    onEnterLengthSubmit = e =>
        e.key === 'Enter' ? (this.setPwdLength = this.vEl.genPasswordSetLengthInput.value) : this.setPwdLength
    onEnterLengthFocusout = e => (this.setPwdLength = this.vEl.genPasswordSetLengthInput.value)
    onClickMinusSubmit = () => {
        this.setPwdLength > 1 ? (this.setPwdLength -= 1) : this.setPwdLength
        this.vEl.genPasswordSetLengthInput.value = this.setPwdLength
    }
    onClickPlusSubmit = () => {
        this.vEl.genPasswordSetLengthInput.value = this.setPwdLength
        this.setPwdLength < 99 ? (this.setPwdLength += 1) : this.setPwdLength
    }
    onClickHashSubmit = () => this.fadeInOut(this.vEl.genPasswordShaView)
    onClickSetupSubmit = () => this.fadeInOut(this.vEl.genPasswordSetupView)
    onClickCheckDigitals = () => {
        this.vEl.btnCheckDigitals.classList.toggle('active')
        this.setChar.some(el => el === 3) ? (this.setChar = this.arrRemove(this.setChar, 3)) : this.setChar.push(3)
    }
    onClickBtnCheckUpper = () => {
        this.vEl.btnCheckUpper.classList.toggle('active')
        this.setChar.some(el => el === 2) ? (this.setChar = this.arrRemove(this.setChar, 2)) : this.setChar.push(2)
    }
    onClickBtnCheckLower = () => {
        this.vEl.btnCheckLower.classList.toggle('active')
        this.setChar.some(el => el === 1) ? (this.setChar = this.arrRemove(this.setChar, 1)) : this.setChar.push(1)
    }
    onClickBtnCheckSpecial = () => {
            this.vEl.btnCheckSpecial.classList.toggle('active')
            this.setChar.some(el => el === 4) ? (this.setChar = this.arrRemove(this.setChar, 4)) : this.setChar.push(4)
        }
        // switch view
    loadView = () => {
        this.vEl.genPasswordView.style.display = 'block'
        this.vEl.genPasswordShaView.style.display = 'none'
        this.vEl.genPasswordSetupView.style.display = 'none'
        this.vEl.genPasswordInfoView.style.display = 'none'
        this.vEl.btnCheckDigitals.classList.add('active')
        this.vEl.btnCheckUpper.classList.add('active')
        this.vEl.btnCheckLower.classList.add('active')
    }
}
document.addEventListener('DOMContentLoaded', new genPassApp())