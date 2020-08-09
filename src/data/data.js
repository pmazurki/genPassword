const comPerSecData = [{
        key: 2,
        value: 513.855 * 10 ** 12,
        name: 'RIKEN Center for Computational Science Cores(7 299 072) Memory(4 866 048 GB)',
    },
    {
        key: 3,
        value: 107.6 * 10 ** 12 * 2,
        name: 'GeForce RTX 2080 Ti x2',
    },
    {
        key: 1,
        value: (100 / 100) * 115 * 10 ** 9 * 10000000,
        name: 'Botnet Metulji i Mariposa 10 Million host cpu 30%',
    },
    {
        key: 5,
        value: 12 * 10 ** 12,
        name: 'Xbox Series X (Navi - RDNA 2)',
    },
    {
        key: 4,
        value: 1571 * 10 ** 9,
        name: 'AMD Ryzen Threadripper 3990X',
    },
    {
        key: 6,
        value: 115 * 10 ** 9,
        name: 'Intel Core i5-6400  4GB',
    },
    {
        key: 7,
        value: 13.5 * 10 ** 9,
        name: 'Raspberry Pi-4B (4GB) 64-bit',
    },
]

const si = [
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
]

const char = [
    { key: 1, value: 'abcdefghijklmnopqrstuvwxyz' },
    { key: 2, value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
    { key: 3, value: '1234567890' },
    { key: 4, value: '!@#$%&* ' },
    { key: 5, value: '!@#$%^&*(){}[]=<>/,. ' },
]

const vElId = [
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
export { char, comPerSecData, si, vElId }