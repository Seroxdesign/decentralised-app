import { walletAccount } from 'app/common/state/atoms';
import { Box, Text } from 'grommet';
import Skeleton from 'react-loading-skeleton';
import { useRecoilState } from 'recoil';

export const HeadingText = ({
  isLoading,
  numberOfAssets,
  numberOfChainsWithAssets,
  isFarming,
}) => {
  const [walletAccountAtom] = useRecoilState(walletAccount);

  const headingText = (
    <>
      {numberOfAssets == 0 ? (
        <>
          {walletAccountAtom && isFarming
            ? 'Add more assets to your wallet to farm more.'
            : 'You don’t have any available assets to farm in your wallet.'}{' '}
        </>
      ) : (
        <span>
          You have {numberOfAssets} {numberOfAssets > 1 ? 'assets' : 'asset'}{' '}
          across {numberOfChainsWithAssets}{' '}
          {numberOfChainsWithAssets > 1 ? 'networks' : 'network'} available to
          farm.
        </span>
      )}
    </>
  );

  return (
    <>
      {isLoading ? (
        <Skeleton count={1} height="50px" borderRadius="20px" />
      ) : (
        <Text size="36px" weight="bold">
          {!walletAccountAtom
            ? 'Connect your wallet to see your available assets to farm.'
            : headingText}
        </Text>
      )}
      <Box margin={{ top: '35px' }}>
        {isLoading && walletAccountAtom ? (
          <Skeleton count={1} borderRadius="20px" height="22px" />
        ) : (
          <Text size="18px">
            Fund your wallet using crypto or fiat currency to start investing.
            Withdraw at any time with no cost and no lock-in period.
          </Text>
        )}
      </Box>
    </>
  );
};
