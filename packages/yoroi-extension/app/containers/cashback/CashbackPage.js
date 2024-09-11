// @flow
import type { Node, ComponentType } from 'react';
import { Component, Suspense } from 'react';
import { observer } from 'mobx-react';
import type { $npm$ReactIntl$IntlFormat } from 'react-intl';
import { intlShape } from 'react-intl';
import type { StoresAndActionsProps } from '../../types/injectedProps.types';
import TopBarLayout from '../../components/layout/TopBarLayout';
import BannerContainer from '../banners/BannerContainer';
import { withLayout } from '../../styles/context/layout';
import type { LayoutComponentMap } from '../../styles/context/layout';
import SidebarContainer from '../SidebarContainer';
import FullscreenLayout from '../../components/layout/FullscreenLayout';
import environment from '../../environment';
import { ROUTES } from '../../routes-config';
import NavBarContainerRevamp from '../NavBarContainerRevamp';
import NavBarTitle from '../../components/topbar/NavBarTitle';
import globalMessages from '../../i18n/global-messages';
import { CoreAddressTypes } from '../../api/ada/lib/storage/database/primitives/enums';

type Props = StoresAndActionsProps;

type InjectedLayoutProps = {| +renderLayoutComponent: LayoutComponentMap => Node |};
type AllProps = {| ...Props, ...InjectedLayoutProps |};
type State = {| iframeSrc: string, status: string, popup: boolean, overlayBgColor: string |};

type IframeMessageData = {|
    action: string,
        bgColor ?: string,
        messageToSign: string
            |};

@observer
class CashbackPageContainer extends Component<AllProps, State> {
    static contextTypes: {| intl: $npm$ReactIntl$IntlFormat |} = {
    intl: intlShape.isRequired,
  };

state = {
    iframeSrc: '', // Initial URL
    status: 'loading', // Initial status
    popup: false,
    overlayBgColor: '#000000fa'
};

async componentDidMount() {
    // User should not be able to access the route when using Yoroi Light
    if (environment.isLight) {
        this.props.actions.router.goToRoute.trigger({
            route: ROUTES.MY_WALLETS,
        });
    }
    this.fetchIframeUrl()
    this.setupMessageListener();
}

componentWillUnmount() {
    this.removeMessageListener();
}

setupMessageListener = () => {
    window.addEventListener('message', this.handleMessage);
}

removeMessageListener = () => {
    window.removeEventListener('message', this.handleMessage);
}

handleMessage = (event: MessageEvent) => {
    const iframeOrigin = new URL(this.state.iframeSrc).origin

    if (event.origin !== iframeOrigin) {
        return;
    }

    console.log('Received message from iframe:', event.data);

    const messageData: IframeMessageData = (event.data: any);

    if (messageData.action === 'SIGN_MESSAGE') {
        // messageData.messageToSign
    }
    else if (messageData.action === 'OPEN_POPUP') {
        this.setState({ popup: true, overlayBgColor: messageData.bgColor || this.state.overlayBgColor })
    }
    else if (messageData.action === 'CLOSE_POPUP') {
        this.setState({ popup: false })
    }
}

async fetchIframeUrl(){
    try {
        const publicDeriver = this.props.stores.wallets.selected
        if (!publicDeriver) throw Error('no publicDeriver')
        const walletAddress = publicDeriver.externalAddressesByType[CoreAddressTypes.CARDANO_BASE][0].address;

        const response = await fetch(`${environment.bringBaseUrl}check/portal`, {
            method: 'POST',
            headers: {
                'x-api-key': environment.bringIdentifier,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                walletAddress,

            }),
        }); // Replace with your API endpoint
        const data = await response.json();

        // Convert data to query parameters (assuming data is an object)
        const queryParams = new URLSearchParams({ ...data, theme: environment.isLight ? 'light' : 'dark' }).toString();
        const iframeSrc = `${environment.bringIframeSrc}/?${queryParams}`;

        // Update the state to reflect the new iframe URL
        this.setState({ iframeSrc, status: 'done' });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}



render(): Node {
    const { actions, stores } = this.props;
    const sidebarContainer = <SidebarContainer actions={actions} stores={stores} />;
    const { intl } = this.context;

    return (
        <TopBarLayout
            banner={<BannerContainer actions={actions} stores={stores} />}
            sidebar={sidebarContainer}
            navbar={
                <NavBarContainerRevamp
                    actions={actions}
                    stores={stores}
                    title={<NavBarTitle title={intl.formatMessage(globalMessages.sidebarCashback)} />}
                />
            }
        >
            <FullscreenLayout bottomPadding={0}>
                {this.state.popup ?
                    <div
                        style={{ position: 'fixed', inset: 0, background: this.state.overlayBgColor, zIndex: 10 }}
                        onClick={() => {
                            const iframeElement = document.getElementById('bringweb3');
                            if (iframeElement instanceof HTMLIFrameElement) {
                                iframeElement.contentWindow.postMessage({ action: 'CLOSE_POPUP' }, '*')
                            }
                            this.setState({ popup: false })
                        }}
                    ></div>
                    :
                    null
                }
                <Suspense fallback={null}>
                    {this.state.iframeSrc.length ?
                        <iframe
                            id='bringweb3'
                            style={{ position: 'relative', zIndex: 11 }}
                            src={this.state.iframeSrc}
                            width='100%'
                            height='100%'
                        />
                        :
                        null
                    }
                </Suspense>
            </FullscreenLayout>
        </TopBarLayout>
    );
}
}
export default (withLayout(CashbackPageContainer): ComponentType < Props >);
