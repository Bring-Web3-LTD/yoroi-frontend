import { GovernanceApi } from '@emurgo/yoroi-lib/dist/governance/emurgo-api';
import * as React from 'react';

import { RustModule } from '../../../../api/ada/lib/cardanoCrypto/rustLoader';
import { unwrapStakingKey } from '../../../../api/ada/lib/storage/bridge/utils';
import { asGetSigningKey, asGetStakingKey } from '../../../../api/ada/lib/storage/models/PublicDeriver/traits';
import { useGovernanceManagerMaker } from '../common/useGovernanceManagerMaker';
import { GovernanceActionType, GovernanceReducer, defaultGovernanceActions, defaultGovernanceState } from './state';

const initialGovernanceProvider = {
  ...defaultGovernanceState,
  ...defaultGovernanceActions,
  walletId: '',
  governanceManager: null,
  checkUserPassword: (_password: string) => Response,
};

const GovernanceContext = React.createContext(initialGovernanceProvider);

type GovernanceProviderProps = {
  children: React.ReactNode;
  currentWallet: any; // TODO to be defined
};

export const GovernanceContextProvider = ({ children, currentWallet }: GovernanceProviderProps) => {
  if (!currentWallet?.selectedWallet) throw new Error(`requires a wallet to be selected`);
  const [state, dispatch] = React.useReducer(GovernanceReducer, {
    ...defaultGovernanceState,
  });
  const [stakingKeyHash, setStakingKeyHash] = React.useState(null);
  const [stakingKeyHex, setStakingKeyHex] = React.useState(null);

  const { walletId, networkId, currentPool, selectedWallet, backendService, backendServiceZero } = currentWallet;
  const governanceManager = useGovernanceManagerMaker(walletId, networkId);

  // TODO to me moved in rootStore and use this globbaly whenever we need a wallet password check
  const checkUserPassword = async (password: string): Promise<any> => {
    try {
      // check the password
      const withSigningKey = asGetSigningKey(selectedWallet);
      if (!withSigningKey) {
        throw new Error(`[sign tx] no signing key`);
      }
      const signingKeyFromStorage = await withSigningKey.getSigningKey();
      // will throw a WrongPasswordError
      await withSigningKey.normalizeKey({
        ...signingKeyFromStorage,
        password,
      });
    } catch (error) {
      return error;
    }
  };

  React.useEffect(() => {
    const withStakingKey = asGetStakingKey(selectedWallet);
    if (withStakingKey == null) {
      throw new Error(`missing staking key functionality`);
    }

    withStakingKey
      .getStakingKey()
      .then(async stakingKeyResp => {
        setStakingKeyHash(stakingKeyResp.addr.Hash);
        const skey = unwrapStakingKey(stakingKeyResp.addr.Hash).to_keyhash()?.to_hex();
        if (skey == null) {
          throw new Error('Cannot get staking key from the wallet!');
        }
        setStakingKeyHex(skey);

        const govApi = new GovernanceApi({
          oldBackendUrl: String(backendService),
          newBackendUrl: String(backendServiceZero),
          networkId: networkId,
          wasmFactory: RustModule.CrossCsl.init,
        });

        const governanceStatus = await govApi.getAccountState(skey, skey);
        console.log('governanceStatus', governanceStatus);

        return null;
      })
      .catch(err => {
        console.error(`unexpected erorr: failed to get wallet staking key: ${err}`);
      });
  }, []);

  const actions = React.useRef({
    governanceVoteChanged: (vote: any) => {
      dispatch({
        type: GovernanceActionType.GovernanceVoteChanged,
        governanceVote: vote,
      });
    },
    dRepIdChanged: (dRepId: any) => {
      dispatch({ type: GovernanceActionType.DRepIdChanged, dRepId });
    },
  }).current;
  console.log('stakingKeyHash', stakingKeyHash);
  console.log('stakingKeyHex', stakingKeyHex);
  const context: any = {
    ...state,
    ...actions,
    governanceManager: governanceManager,
    stakePoolKeyHash: currentPool?.hash ?? '',
    walletId: currentWallet.walletId,
    stakingKeyHash,
    stakingKeyHex,
    checkUserPassword,
  };

  return <GovernanceContext.Provider value={context}>{children}</GovernanceContext.Provider>;
};

export const useGovernance = () =>
  React.useContext(GovernanceContext) ?? console.log('useGovernance: needs to be wrapped in a GovernanceManagerProvider');
