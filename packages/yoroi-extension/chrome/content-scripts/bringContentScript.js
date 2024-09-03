const { bringInitContentScript } = require('@bringweb3/chrome-extension-kit')
// import { bringInitContentScript } from '@bringweb3/chrome-extension-kit'

bringInitContentScript({
    getWalletAddress: () => 'asd',
    promptLogin: () => 'asd',
    walletAddressListeners: ['change'],
    iframeEndpoint: 'http',
    customTheme: {
        popupBg: 'white'
    }
})