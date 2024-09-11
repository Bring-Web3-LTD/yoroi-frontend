import { bringInitContentScript } from '@bringweb3/chrome-extension-kit'

bringInitContentScript({
    getWalletAddress: async () => 'addr111111111111',
    promptLogin: () => 'asfasfa',
    walletAddressListeners: ['daniel'],
    iframeEndpoint: 'https://sandbox-extension.bringweb3.io/',
})