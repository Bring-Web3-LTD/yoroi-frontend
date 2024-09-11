// @flow
import { bringInitBackground } from '@bringweb3/chrome-extension-kit'
import environment from '../../../app/environment'

export default () => {
    bringInitBackground({
        identifier: environment.bringIdentifier,
        apiEndpoint: 'sandbox',
    })
}

