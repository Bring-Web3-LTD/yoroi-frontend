// @flow
import environment from '../../../environment';

export const RESTORE_WALLET_STEPS = Object.freeze({
  SELECT_NETWORK: 'SELECT_NETWORK',
  SELECT_WALLET_TYPE: 'SELECT_WALLET_TYPE',
  ENTER_RECOVERY_PHRASE: 'ENTER_RECOVERY_PHRASE',
  ADD_WALLET_DETAILS: 'ADD_WALLET_DETAILS',
});

export function getFirstRestorationStep(): string {
  if (environment.isDev() || environment.isNightly()) return RESTORE_WALLET_STEPS.SELECT_NETWORK;

  return RESTORE_WALLET_STEPS.SELECT_WALLET_TYPE;
}
