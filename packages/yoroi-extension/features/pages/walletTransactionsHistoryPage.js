// @flow

import type { LocatorObject } from '../support/webdriver';
import { getMethod } from '../support/helpers/helpers';
import { By } from 'selenium-webdriver';

export const walletSummaryBox: LocatorObject = { locator: 'walletSummary_box', method: 'id' };
export const transactionComponent: LocatorObject = {
  locator: '.Transaction_component',
  method: 'css',
};
export const transactionStatus: LocatorObject = { locator: '.Transaction_status', method: 'css' };
export const walletSummaryComponent: LocatorObject = {
  locator: '.WalletSummary_component',
  method: 'css',
};
export const copyToClipboardButton: LocatorObject = {
  locator: '.CopyableAddress_copyIconBig',
  method: 'css',
};
export const numberOfTransactions: LocatorObject = {
  locator: '.WalletSummary_numberOfTransactions',
  method: 'css',
};
export const noTransactionsComponent: LocatorObject = {
  locator: '.WalletNoTransactions_component',
  method: 'css',
};
export const showMoreButton: LocatorObject = {
  locator: '.WalletTransactionsList_component .MuiButton-primary',
  method: 'css',
};
export const pendingTransactionElement: LocatorObject = {
  locator: '.Transaction_pendingLabel',
  method: 'css',
};
export const failedTransactionElement: LocatorObject = {
  locator: '.Transaction_failedLabel',
  method: 'css',
};
export const transactionAddressListElement: LocatorObject = {
  locator: '.Transaction_addressList',
  method: 'css',
};
export const confirmationCountText: LocatorObject = {
  locator: '.confirmationCount',
  method: 'css',
};
export const transactionIdText: LocatorObject = {
  locator: '.txid',
  method: 'css',
};
export const txStatus: LocatorObject = { locator: 'txStatus', method: 'id' };
export const txFee: LocatorObject = { locator: 'txFee', method: 'id' };
export const txAmount: LocatorObject = { locator: 'transactionAmount', method: 'id' };

export const getLastTx = async (
  customWorld: any
): Promise<webdriver$WebElement> => {
  const allTxs = await customWorld.findElements(transactionComponent);
  return allTxs[0];
};

export const getLastTxStatus = async (customWorld: any): Promise<string> => {
  const lastTx = await getLastTx(customWorld);
  const statusElement = await lastTx.findElement(getMethod(txStatus.method)(txStatus.locator));
  return await statusElement.getText();
};

export const getLastTxFee = async (customWorld: any): Promise<string> => {
  const lastTx = await getLastTx(customWorld);
  const feeElement = await lastTx.findElement(getMethod(txFee.method)(txFee.locator));
  return await feeElement.getText();
};

export const getLastTxAmount = async (customWorld: any): Promise<string> => {
  const lastTx = await getLastTx(customWorld);
  const amountElement = await lastTx.findElement(getMethod(txAmount.method)(txAmount.locator));
  return await amountElement.getText();
};

export const getTxAmount = async (txElement: webdriver$WebElement): Promise<string> => {
  const amountElement = await txElement.findElement(getMethod(txAmount.method)(txAmount.locator));
  return await amountElement.getText();
};

export const getTxStatus = async (tx: webdriver$WebElement): Promise<string> => {
  const statusElement = await tx.findElement(
    getMethod(transactionStatus.method)(transactionStatus.locator)
  );
  return await statusElement.getText();
};

export const getNotificationMessage = async (
  customWorld: any,
  translatedMessage: string
): Promise<webdriver$WebElement> => {
  const messageParentElement = await customWorld.driver.findElement(
    By.xpath('//div[contains(@role, "tooltip")]')
  );
  return await messageParentElement.findElement(
    By.xpath(`//span[contains(text(), "${translatedMessage}")]`)
  );
};

export const parseTxInfo = async (addressList: webdriver$WebElement): Promise<Array<any>> => {
  const addressInfoRow = await addressList.findElements(By.css('.Transaction_addressItem'));

  const result = [];
  for (const row of addressInfoRow) {
    const rowInfo = await row.findElements(By.xpath('*'));
    const rowInfoText = await Promise.all(rowInfo.map(async column => await column.getText()));
    result.push(rowInfoText);
  }

  return result;
}