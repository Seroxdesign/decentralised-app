import { toExactFixed } from 'app/common/functions/utils';
import { Tooltip } from 'app/modernUI/components';
import dollarInfo from 'app/modernUI/images/dollarInfo.svg';
import { Box, Text } from 'grommet';
import Skeleton from 'react-loading-skeleton';

export const TopHeader = ({
  selectedFarmInfo,
  isLoading,
  interest,
  isCorrectNetworkAtom,
}) => {
  const { first, second } = selectedFarmInfo.current?.depositDividedAmount || 0;
  return (
    <>
      {isLoading ? (
        <Skeleton count={2} height="22px" borderRadius="20px" />
      ) : (
        <>
          {!isCorrectNetworkAtom ? (
            <Text textAlign="center" weight="bold" size="18px">
              Switch network to Ethereum Mainnet to view balances
            </Text>
          ) : (
            <>
              {!selectedFarmInfo.current?.isLocked ? (
                <Text textAlign="center" weight="bold" size="18px">
                  Your balance currently earning <br />
                  {toExactFixed(interest.current, 2)}% APY is{' '}
                  {selectedFarmInfo.current?.sign}
                  {(+first).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                  <Text color="softText" size="18px">
                    {second}
                  </Text>
                </Text>
              ) : (
                <>
                  <Text
                    textAlign="center"
                    weight="bold"
                    size="18px"
                    style={{ justifyContent: 'center' }}
                  >
                    You have{' '}
                    {toExactFixed(
                      +selectedFarmInfo.current?.depositedAmountInLP,
                      4,
                    )}{' '}
                    {selectedFarmInfo.current?.name}
                  </Text>
                  <Box direction="row" justify="center">
                    <Text
                      textAlign="center"
                      weight="bold"
                      size="18px"
                      style={{ justifyContent: 'center' }}
                    >
                      earning {toExactFixed(interest.current, 2)}% APY{' '}
                    </Text>
                    <Tooltip
                      text={
                        <Text>
                          Current value:
                          <br />
                          {toExactFixed(
                            +selectedFarmInfo.current?.depositedAmount,
                            2,
                          )}{' '}
                          USD
                        </Text>
                      }
                    >
                      <img src={dollarInfo} alt="dollarInfo" />
                    </Tooltip>
                  </Box>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
