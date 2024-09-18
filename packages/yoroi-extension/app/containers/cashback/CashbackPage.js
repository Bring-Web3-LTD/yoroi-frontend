// @flow
import { useState, useEffect, useCallback, Suspense, useRef } from 'react';
import styles from './styles.module.css'
import type { Node } from 'react';
import { observer } from 'mobx-react';
import type { $npm$ReactIntl$IntlFormat } from 'react-intl';
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
import { useTheme } from '@mui/material';
import { walletSignData } from '../../api/ada';
import { getPublicDeriverById } from '../../../chrome/extension/background/handlers/yoroi/utils';
import Dialog from '../../components/widgets/Dialog';
import DialogCloseButton from '../../components/widgets/DialogCloseButton';
import DialogTextBlock from '../../components/widgets/DialogTextBlock'
import { Box, TextField, InputAdornment, IconButton, Tooltip, Typography } from '@mui/material';

type Props = StoresAndActionsProps;

type InjectedLayoutProps = {| +renderLayoutComponent: LayoutComponentMap => Node |};
type AllProps = {| ...Props, ...InjectedLayoutProps |};

type IframeMessageData = {|
  action: string,
    bgColor ?: string,
    message: string
      |};

const CashbackPageContainer: React$ComponentType<Props> = observer((props: AllProps) => {
  const { actions, stores } = props;
  const theme = useTheme();
  // const intl = useContext(IntlContext);

  const iframeRef = useRef < HTMLIFrameElement | null > (null);
  const [iframeSrc, setIframeSrc] = useState('');
  const [status, setStatus] = useState('loading');
  const [popup, setPopup] = useState(false);
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [message, setMessage] = useState('')
  const [signaturePopup, setSignaturePopup] = useState(false);
  const [overlayBgColor, setOverlayBgColor] = useState('#000000fa');

  const fetchIframeUrl = useCallback(async () => {
    try {
      console.log({ themeBring: theme.name.split('-')[0] });

      const publicDeriver = stores.wallets.selected;
      if (!publicDeriver) throw Error('no publicDeriver');
      const walletAddress = publicDeriver.externalAddressesByType[CoreAddressTypes.CARDANO_BASE][0].address;

      const response = await fetch(`${environment.bringBaseUrl}check/portal`, {
        method: 'POST',
        headers: {
          'x-api-key': environment.bringIdentifier,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress }),
      });
      const data = await response.json();

      const queryParams = new URLSearchParams({ ...data, theme: theme.name.split('-')[0] }).toString();
      const newIframeSrc = `${environment.bringIframeSrc}/?${queryParams}`;

      setIframeSrc(newIframeSrc);
      setStatus('done');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [stores.wallets.selected]);

  const signMessage = useCallback(async (message: string, password: string) => {
    const wallet = stores.wallets.selected;
    if (!wallet) throw Error('no publicDeriver');
    const address = wallet.externalAddressesByType[CoreAddressTypes.CARDANO_BASE][0].address;
    const publicDeriver = await getPublicDeriverById(wallet.publicDeriverId)
    let res: {| key: string, signature: string |}| null = null
    console.log({ step: 'before', address, message });
  try {
    res = await walletSignData(publicDeriver, password, address, '74657374')
    console.log({ step: 'after', ...res, message: 'test', address });

  } catch (error) {
    setErrMsg(error.message)
    console.warn(error);
  }
  iframeRef.current?.contentWindow.postMessage({ from: 'bringweb3', action: 'SIGNATURE', ...res, message, address }, '*');
  setSignaturePopup(false)
}, []);

const handleMessage = useCallback(async (event: MessageEvent) => {
  const iframeOrigin = new URL(iframeSrc).origin;

  if (event.origin !== iframeOrigin) {
    return;
  }

  console.log('Received message from iframe:', event.data);

  const messageData: IframeMessageData = (event.data: any);

if (messageData.action === 'SIGN_MESSAGE') {
  // const wallet = stores.wallets.selected;
  setMessage(messageData.message)
  setSignaturePopup(true)
  //   if (!wallet) throw Error('no publicDeriver');
  //   const address = wallet.externalAddressesByType[CoreAddressTypes.CARDANO_BASE][0].address;
  //   const publicDeriver = await getPublicDeriverById(wallet.publicDeriverId)
  //   let res: {| key: string, signature: string |}| null = null
  // try {
  //   res = await walletSignData(publicDeriver, 'Mottiemmanuelle123', address, messageData.messageToSign)
  // } catch (error) {
  //   setErrMsg(error.message)
  //   console.warn(error);
  // }
  // console.log({ res });

  // const iframe = document.getElementById('bringweb3');
  // if (iframe instanceof HTMLIFrameElement) {
  //   iframe.contentWindow.postMessage({ from: 'bringweb3', action: 'SIGNATURE', ...res, message: messageData.messageToSign }, '*');
  // }

} else if (messageData.action === 'OPEN_POPUP') {
  setPopup(true);
  setOverlayBgColor(messageData.bgColor || overlayBgColor);
} else if (messageData.action === 'CLOSE_POPUP') {
  setPopup(false);
}
}, [iframeSrc, overlayBgColor]);

useEffect(() => {
  if (environment.isLight) {
    actions.router.goToRoute.trigger({
      route: ROUTES.MY_WALLETS,
    });
  }
  if (!iframeSrc) fetchIframeUrl();

  window.addEventListener('message', handleMessage);

  return () => {
    window.removeEventListener('message', handleMessage);
  };
}, [iframeSrc, fetchIframeUrl, handleMessage]);

const closePopup = useCallback(() => {
  const iframeElement = document.getElementById('bringweb3');
  if (iframeElement instanceof HTMLIFrameElement) {
    iframeElement.contentWindow.postMessage({ action: 'CLOSE_POPUP' }, '*');
  }
  setPopup(false);
}, []);

const sidebarContainer = <SidebarContainer actions={actions} stores={stores} />;

return (
  <TopBarLayout
    banner={<BannerContainer actions={actions} stores={stores} />}
    sidebar={sidebarContainer}
    navbar={
      <NavBarContainerRevamp
        actions={actions}
        stores={stores}
        title={<NavBarTitle title={'Cashback'} />}
      // title={<NavBarTitle title={intl.formatMessage(globalMessages.sidebarCashback)} />}
      />
    }
  >
    <FullscreenLayout bottomPadding={0}>
      <Suspense fallback={null}>
        {signaturePopup ?
          <Dialog
            title='CLAIM CASHBACK'
            closeOnOverlayClick
            closeButton={<DialogCloseButton />}
            onClose={() => setSignaturePopup(false)}
            actions={[{
              label: 'CONFIRM',
              primary: true,
              disabled: !password,
              onClick: () => signMessage(message, password)
            }]}
          >
            <Box>
              <Typography>
                Enter your password and confirm to claim the cashback rewards.
              </Typography>
              <DialogTextBlock>
                Cashback rewards
                <Tooltip
                  placement='top'
                  title={<Typography align='center' component="div" variant="body3">Cashback amount rewarded for online shopping</Typography>}
                >
                  i
                </Tooltip>
              </DialogTextBlock>
              <Typography>
                300 ADA
              </Typography>
              <TextField
                className="walletPassword"
                value={password}
                label="Password"
                type="password"
                // endAdornment={
                //   <InputAdornment position="end">
                //     <IconButton
                //       aria-label="toggle password visibility"
                //       onClick={() => setShowPassword(!showPassword)}
                //       edge="end"
                //     >
                //       {!showPassword ? <Icon.VisibilityOff /> : <Icon.VisibilityOn />}
                //     </IconButton>
                //   </InputAdornment>
                // }
                onChange={e => {
                  setPassword(e.target.value);
                }}
                error={errMsg && 'Incorrect password!'}
                disabled={false}
              />
            </Box>
            {/* <TextField /> */}
          </Dialog>
          : null}
        {signaturePopup ?
          // <div className={styles.overlay}>
          //   <div className={styles.popup}>
          //     <button
          //       className={styles.close_btn}
          //       onClick={() => setSignaturePopup(false)}
          //     >X</button>
          //     <div>
          //       Sign
          //     </div>
          //     <form
          //       className={styles.form}
          //       onSubmit={(e) => {
          //         e.preventDefault()
          //         signMessage(message, password)
          //       }}
          //     >
          //       <input
          //         type='text'
          //         value={password}
          //         onChange={e => setPassword(e.target.value)}
          //       />
          //       {errMsg ? <div>{errMsg}</div> : null}
          //       <input type='submit' value={'Sign'} />
          //     </form>
          //   </div>
          // </div>
          <></>
          : null}
        {popup ? (
          <div
            className={styles.iframe_overlay}
            style={{ background: overlayBgColor }}
            onClick={closePopup}
          />
        ) : null}
        {iframeSrc && (
          <iframe
            ref={iframeRef}
            id="bringweb3"
            className={styles.iframe}
            src={iframeSrc}
            width="100%"
            height="100%"
          />
        )}
      </Suspense>
    </FullscreenLayout>
  </TopBarLayout>
);
});

export default (withLayout(CashbackPageContainer): React$ComponentType < Props >);