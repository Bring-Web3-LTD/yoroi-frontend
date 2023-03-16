// @flow
import { Node, ComponentType, useState, useMemo } from 'react';
import { defineMessages, injectIntl, FormattedHTMLMessage } from 'react-intl';
import { observer } from 'mobx-react';
import type { $npm$ReactIntl$IntlShape } from 'react-intl';
import { Stack, Box, Typography, Button } from '@mui/material'
import StepController from './StepController';
import { CREATE_WALLET_SETPS } from './steps';
import styles from './VerifyRecoveryPhraseStep.scss';
import classnames from 'classnames';
import { ReactComponent as VerifiedIcon } from '../../../assets/images/verify-icon-green.inline.svg'
import environment from '../../../environment';

const messages: * = defineMessages({
  description: {
    id: 'wallet.create.thirdStep.description',
    defaultMessage: '!!!<strong>Select</strong> each word in <strong>the correct order</strong> to confirm your recovery phrase.',
  },
  incorrectOrder: {
    id: 'wallet.create.thirdStep.incorrectOrder',
    defineMessages: '!!!Incorrect order. Try again',
  },
  verified: {
    id: 'walllet.create.thirdStep.verifiedRecoveryPhrase',
    defaultMessage: '!!!The recovery phrase is verified',
  }
});

type Intl = {|
  intl: $npm$ReactIntl$IntlShape,
|};

type Props = {|
    currentStep: string,
|};


function VerifyRecoveryPhraseStep(props: Props & Intl): Node {
  const { intl, recoveryPhrase, setCurrentStep } = props;
  if (!recoveryPhrase) throw new Error('Missing recovery phrase, should never happen');

  const [enteredRecoveryPhrase, setRecoveryPhrase] = useState<Array<string>>(
    new Array(recoveryPhrase.length).fill(null),
  );
  const [wrongWord, setWrongWord] = useState<string | null>(null)

  function onAddWord(word: string, idx: number): void {
    if (isWordAdded(word)) return;

    const nextWordIdx = enteredRecoveryPhrase.findIndex(w => w === null);
    if (nextWordIdx === -1) throw new Error('Entered recovery phrase words list is full');

    const isInCorrectOrder = recoveryPhrase[nextWordIdx] === word;
    if (!isInCorrectOrder) {
      return setWrongWord(word);
    };

    setRecoveryPhrase(prev => {
      const copy = [...prev];
      copy[idx] = word;
      return copy;
    });
    setWrongWord(null);
  };

  function isWordAdded(word) {
    return enteredRecoveryPhrase.some(w => w === word);
  }

  const isValidPhrase = !recoveryPhrase.some((word, idx) => word !== enteredRecoveryPhrase[idx]);

  function goNextStepCallback() {
    if (!isValidPhrase) return;
    return () => setCurrentStep(CREATE_WALLET_SETPS.ADD_WALLET_DETAILS)
  };

  const shortedRecoveryPhrase = useMemo(() => {
    const sorted = recoveryPhrase.slice().sort();

    const wordIndexes = new Set();

    return sorted.map((sortedWord, sortedWordIdx) => {
      const originalIdx = recoveryPhrase.findIndex((originalWord, idx) => {
        return sortedWord === originalWord && !wordIndexes.has(idx)
      });

      if (originalIdx === -1) throw new Error('Word not found in the original recovery phrase. Should never happen');

      // Mark word index as watched to handle recovery phrase with duplicates
      wordIndexes.add(originalIdx);

      return {
        word: sortedWord,
        originalIdx,
        id: sortedWordIdx,
      };
    });
  }, [recoveryPhrase]);

  console.log(shortedRecoveryPhrase);

  return (
    <Stack alignItems='center' justifyContent='center' className={styles.component}>
      <Stack direction='column' alignItems='left' justifyContent='center' maxWidth='690px'>
        <Typography mb='16px'>
          <FormattedHTMLMessage {...messages.description} />
        </Typography>

        <Box className={styles.verifyRecoveryPhraseArea}>
          <Stack
            gap='8px'
            p='16px 14px'
            flexDirection='row'
            flexWrap='wrap'
            alignItems='center'
            justifyContent='center'
          >
            {enteredRecoveryPhrase.map((word, idx) => (
              <Stack
                item
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
              >
                <Box
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '120px',
                    height: '40px',
                  }}
                  variant='body1'
                  color='primary.200'
                >
                  <Typography
                    variant='body1'
                    color='primary.200'
                    width='20px'
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {idx + 1}.
                  </Typography>
                  {word && (
                    <Typography
                      sx={{
                        background: 'linear-gradient(269.97deg, #E4E8F7 0%, #C6F7ED 99.98%)',
                        width: '100px',
                        height: '40px',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        ml: '4px'
                    }}
                    >
                      {word}
                    </Typography>
                  )}
                </Box>
              </Stack>
           ))}
          </Stack>
        </Box>

        <Stack
          flexDirection='row'
          flexWrap='wrap'
          alignItems='center'
          justifyContent='center'
          gap='8px'
        >
          {recoveryPhrase.map((word, idx) => {
            // Todo: sort words alphabetically.
            return (
              <button
                type='button'
                key={word}
                className={classnames(styles.wordChip, {
                  [styles.wordAdded]: isWordAdded(word),
                  [styles.wrongWord]: wrongWord === word,
                })}
                onClick={() => onAddWord(word, idx)}
              >
                <Typography
                  sx={{
                  width: '127px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  px: '10px',
                }}
                  variant='body1'
                  color='primary.200'
                >
                  {word}
                </Typography>
              </button>
            );
          })}
        </Stack>

        <Typography variant='body2' color='error.100' height='20px' mt='16px'>
          {wrongWord !== null && intl.formatMessage(messages.incorrectOrder)}
        </Typography>


        {isValidPhrase && (
          <Stack gap='10px' direction='row' mt='-24px'>
            <VerifiedIcon />
            <Typography variant='body1' fontWeight={500}>
              {intl.formatMessage(messages.verified)}
            </Typography>
          </Stack>
        )}


        <Box mt='10px'>
          <StepController
            goNext={goNextStepCallback()}
            goBack={() => setCurrentStep(CREATE_WALLET_SETPS.SAVE_RECOVERY_PHRASE)}
          />
        </Box>

        {environment.isDev() && (
          <Button
            onClick={() => setRecoveryPhrase(recoveryPhrase)}
            onDoubleClick={() => setRecoveryPhrase(
              new Array(recoveryPhrase.length).fill(null),
            )}
          >
            Auto Enter
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

export default (injectIntl(observer(VerifyRecoveryPhraseStep)) : ComponentType<Props>);