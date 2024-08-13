import BasePage from '../pages/basepage.js';
import { customAfterEach } from '../utils/customHooks.js';
import AddNewWallet from '../pages/addNewWallet.page.js';
import RestoreWalletStepOne from '../pages/newWalletPages/restoreWalletSteps/restoreWalletStepOne.page.js';
import RestoreWalletStepTwo from '../pages/newWalletPages/restoreWalletSteps/restoreWalletStepTwo.page.js';
import WalletDetails from '../pages/newWalletPages/walletDetails.page.js';
import TransactionsSubTab from '../pages/wallet/walletTab/walletTransactions.page.js';
import { testWallet1 } from '../utils/testWallets.js';
import { getPassword } from '../helpers/constants.js';
import { expect } from 'chai';
import { getTestLogger } from '../utils/utils.js';
import { oneMinute } from '../helpers/timeConstants.js';
import driversPoolsManager from '../utils/driversPool.js';

describe('Restoring 15-wallet', function () {
  this.timeout(2 * oneMinute);
  let webdriver = null;
  let logger = null;

  before(async function () {
    webdriver = await driversPoolsManager.getDriverFromPool();
    logger = getTestLogger(this.test.parent.title);
  });

  it('Selecting Restore wallet 15-word', async function () {
    const addNewWalletPage = new AddNewWallet(webdriver, logger);
    await addNewWalletPage.selectRestoreWallet();
    const restoreWalletStepOnePage = new RestoreWalletStepOne(webdriver, logger);
    await restoreWalletStepOnePage.selectFifteenWordWallet();
  });

  it('Enter the wallet seed phrase', async function () {
    const restoreWalletStepTwoPage = new RestoreWalletStepTwo(webdriver, logger);
    await restoreWalletStepTwoPage.enterRecoveryPhrase15Words(testWallet1.mnemonic);
    await restoreWalletStepTwoPage.sleep(100);
    const phraseIsVerified = await restoreWalletStepTwoPage.recoveryPhraseIsVerified();
    expect(phraseIsVerified, 'The recovery phrase is not verified').to.be.true;
    await restoreWalletStepTwoPage.continue();
  });

  it('Enter wallet details', async function () {
    const walletDetailsPage = new WalletDetails(webdriver, logger);
    // close info dialog
    await walletDetailsPage.closeTipsModalWindow();
    // enter wallet details
    const walletPassword = getPassword();
    await walletDetailsPage.enterWalletName(testWallet1.name);
    await walletDetailsPage.enterWalletPassword(walletPassword);
    await walletDetailsPage.repeatWalletPassword(walletPassword);

    const walletPlate = await walletDetailsPage.getWalletPlate();
    expect(walletPlate, 'Wallet plate is different from expected').to.equal(testWallet1.plate);

    await walletDetailsPage.saveToLocalStorage('walletName', testWallet1.name);
    await walletDetailsPage.saveToLocalStorage('walletPlate', walletPlate);

    const noWalletNameErrors = await walletDetailsPage.checkWalletNameHasNoError();
    expect(noWalletNameErrors, 'The wallet name has an error').to.be.true;
    const noWalletPasswordError = await walletDetailsPage.checkWalletPaswordHasNoError();
    expect(noWalletPasswordError, 'The wallet password has an error').to.be.true;
    const noWalletRepeatPasswordError =
      await walletDetailsPage.checkWalletRepeatPasswordHasNoError();
    expect(noWalletRepeatPasswordError, 'The wallet repeat password has an error').to.be.true;
    await walletDetailsPage.continue();
  });

  it('Check new wallet', async function () {
    const transactionsPage = new TransactionsSubTab(webdriver, logger);
    await transactionsPage.waitPrepareWalletBannerIsClosed();
    await transactionsPage.closeUpdatesModalWindow();
    const txPageIsDisplayed = await transactionsPage.isDisplayed();
    expect(txPageIsDisplayed, 'The transactions page is not displayed').to.be.true;
    const walletInfo = await transactionsPage.getSelectedWalletInfo();
    expect(walletInfo.balance, 'The wallet balance is different').to.equal(testWallet1.balance);
    const expWalletName = await transactionsPage.getFromLocalStorage('walletName');
    const expWalletPlate = await transactionsPage.getFromLocalStorage('walletPlate');
    expect(walletInfo.name, `The wallet name should be "${expWalletName}"`).to.equal(expWalletName);
    expect(walletInfo.plate, `The wallet plate should be "${expWalletPlate}"`).to.equal(
      expWalletPlate
    );
  });

  afterEach(function (done) {
    customAfterEach(this, webdriver, logger);
    done();
  });

  after(function (done) {
    const basePage = new BasePage(webdriver, logger);
    basePage.closeBrowser();
    done();
  });
});
