// @flow
// import { useState } from 'react';
import { Box } from '@mui/material';
// import { useSwap } from '@yoroi/swap';
// import { ReactComponent as ChevronDownIcon } from '../../assets/images/revamp/icons/chevron-down.inline.svg';
// import { ReactComponent as InfoIcon } from '../../assets/images/revamp/icons/info.inline.svg';

export default function SwapPool(): React$Node {
  // const { orderData } = useSwap();
  // const { amounts, selectedPoolCalculation: calculation } = orderData;
  // const {} = calculation;

  // const isSellPrimary = amounts.sell.tokenId === wallet.primaryTokenInfo.id;
  // // Quantities.zero case would only happen on an API error where the price in Ada of Ada were missing
  // const total = isSellPrimary
  //   ? calculation.ptTotalValueSpent?.quantity ?? Quantities.zero
  //   : amounts.sell.quantity;
  // const formattedSellText = `${total} ${tokenToSellName}`;
  // const formattedFeeText = `${Quantities.format(
  //   Quantities.sum([cost.batcherFee.quantity, cost.frontendFeeInfo.fee.quantity]),
  //   wallet.primaryTokenInfo.decimals ?? 0
  // )} ${wallet.primaryTokenInfo.ticker}`;
  // const [showFullInfo, setShowFullInfo] = useState(false);

  // const handleShowFullInfo = () => setShowFullInfo(p => !p);

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'grayscale.400',
        borderRadius: '8px',
        position: 'relative',
        bgcolor: 'common.white',
        p: '16px',
      }}
    >
      {/* <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          gap: '8px',
        }}
        onClick={handleShowFullInfo}
      >
        <Box flexGrow="1" flexShrink="0" display="flex" alignItems="center" gap="4px">
          <Box>Total:</Box>
          {quoteCurrency.amount ? (
            <Box>
              {quoteCurrency.amount} {quoteCurrency.ticker}
            </Box>
          ) : (
            <Box>0 {baseCurrency.ticker}</Box>
          )}
          {baseCurrency.amount && (
            <>
              {quoteCurrency.amount && <Box>+</Box>}
              <Box>
                {baseCurrency.amount} {baseCurrency.ticker}
              </Box>
            </>
          )}
        </Box>
        <Box sx={{ transform: showFullInfo ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <ChevronDownIcon />
        </Box>
      </Box>
      {showFullInfo && (
        <Box sx={{ display: 'flex', flexFlow: 'column', gap: '8px', mt: '8px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box color="grayscale.500" display="flex" alignItems="center" gap="8px">
              Min ADA{' '}
              <Box component="span" color="grayscale.900">
                <InfoIcon />
              </Box>
            </Box>
            <Box>{minAda} ADA</Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box color="grayscale.500" display="flex" alignItems="center" gap="8px">
              Minimum assets received
              <Box component="span" color="grayscale.900">
                <InfoIcon />
              </Box>
            </Box>
            <Box>{minAssets} ADA</Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box color="grayscale.500" display="flex" alignItems="center" gap="8px">
              Fees{' '}
              <Box component="span" color="grayscale.900">
                <InfoIcon />
              </Box>
            </Box>
            <Box>{fees} ADA</Box>
          </Box>
        </Box>
      )} */}
    </Box>
  );
}
