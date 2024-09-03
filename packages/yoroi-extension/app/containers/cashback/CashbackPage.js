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

type Props = StoresAndActionsProps;

type InjectedLayoutProps = {| +renderLayoutComponent: LayoutComponentMap => Node |};
type AllProps = {| ...Props, ...InjectedLayoutProps |};
type State = {| iframeSrc: string, status: string |};

@observer
class CashbackPageContainer extends Component<AllProps, State> {
    static contextTypes: {| intl: $npm$ReactIntl$IntlFormat |} = {
    intl: intlShape.isRequired,
  };

state = {
    iframeSrc: 'http://localhost:5173/', // Initial URL
    status: 'loading', // Initial status
};

  async componentDidMount() {
    // User should not be able to access the route when using Yoroi Light
    if (environment.isLight) {
        this.props.actions.router.goToRoute.trigger({
            route: ROUTES.MY_WALLETS,
        });
    }
    try {
        const response = await fetch('https://sandbox-api.bringweb3.io/v1/extension/check/portal', {
            method: 'POST',
            headers: {
                'x-api-key': 'G1TjqDrfxS8jhRYz15Sg2fMGsvZpdFF8IWgKe0g8',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                walletAddress: '011e8784d9b47de988206dce537b0cc210671cc5ac3483bb887769c13fba257f40c080f1509fceeefad6871d16f765496bf22d188f6c9af303',

            }),
        }); // Replace with your API endpoint
        const data = await response.json();

        // Convert data to query parameters (assuming data is an object)
        const queryParams = new URLSearchParams(data).toString();
        const iframeSrc = `http://localhost:5173/?${queryParams}`;

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
                <Suspense fallback={null}>
                    <iframe
                        src={this.state.iframeSrc}
                        width='100%'
                        height='100%'
                    />
                </Suspense>
            </FullscreenLayout>
        </TopBarLayout>
    );
}
}
export default (withLayout(CashbackPageContainer): ComponentType < Props >);
