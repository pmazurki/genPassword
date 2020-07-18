// variables
const viewElements = {}
    // simple functions
const getDOMElements = id => document.getElementById(id)

// functions
const connectHTMLElements = () => {}

// ini functions
const iniApp = () => {}
connectHTMLElements()
setupListeners()

// ini app
;
(() => {
    window.addEventListener('load', () => iniApp)
})()