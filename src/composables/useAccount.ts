import {
    configureChains,
    connect,
    Connector,
    createConfig,
    createStorage,
    disconnect,
    fetchBalance,
    fetchEnsName,
    getAccount,
    GetAccountResult,
    getNetwork,
    GetNetworkResult,
    signMessage,
    watchAccount,
    watchNetwork,
} from '@wagmi/core';

import {
    AlcheMyApiKey,
    CoinbaseAppName,
    WalletConnectProjectId,
} from '@/constants';
import { CoinbaseWalletConnector } from '@wagmi/core/connectors/coinbaseWallet';
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask';
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect';
import { alchemyProvider } from '@wagmi/core/providers/alchemy';
import { arbitrum, goerli, mainnet, polygon, polygonMumbai } from 'viem/chains';
import { globalStore } from '../store';
import { shortAddress } from './useWeb3';

const { chains, publicClient } = configureChains(
    [mainnet, goerli, polygon, polygonMumbai, arbitrum],
    [alchemyProvider({ apiKey: AlcheMyApiKey })],
);

const client = createConfig({
    connectors: [
        new MetaMaskConnector({ 
            chains, 
            options: { shimDisconnect: true } ,
        }),
        new WalletConnectConnector({
            chains,
            options: { projectId: WalletConnectProjectId },
        }),
        new CoinbaseWalletConnector({
            chains,
            options: { appName: CoinbaseAppName },
        }),
    ],
    publicClient,
    autoConnect: true,
    storage: createStorage({ storage: window.localStorage }),
});

const connectWallet = async (connector?: Connector) => {
    let account: GetAccountResult = getAccount();
    if (!account.address && !client.connector && !connector) return;

    globalStore.loading = true;

    if (connector && client.connector?.id !== connector?.id) {
        await disconnectWallet();
        await connect({ connector: connector });
        account = getAccount();
    }

    if (!client.data?.chain) return;
    globalStore.chainId = client.data.chain.id;

    
    if (!(account && account.address && account.isConnected)) return;

    globalStore.account = account.address;
    globalStore.connected = account.isConnected;

    await getBalance();
    await getENSName();
    getChainName();

    globalStore.walletId = client?.connector?.id as string;
    globalStore.loading = false;

    watchAccount(async (account: GetAccountResult) => {
        if (!(account && account.address)) return;

        globalStore.account = account.address;

        await getBalance();
        await getENSName();
    });

    watchNetwork(async (network: GetNetworkResult) => {
        if (!network?.chain) return;

        globalStore.chainName = network.chain.name;
        globalStore.chainId = network.chain.id;

        await getBalance();
        await getENSName();
    });
};

const disconnectWallet = async () => {
    if (client.connector) {
        await disconnect();
    }

    globalStore.account = '0x';
    globalStore.balance = null;
    globalStore.connected = false;
    globalStore.ensName = null;
    globalStore.displayName = null;
    globalStore.chainName = undefined;
};

const getBalance = async () => {
    const params = { address: globalStore.account };
    const balanceResult = await fetchBalance(params);
    globalStore.balance = balanceResult;
};

const getENSName = async () => {
    const params = {
        address: globalStore.account,
        chainId: globalStore.chainId,
    };

    if (globalStore.chainId === 1) {
        const ensName = await fetchEnsName(params);
        globalStore.ensName = ensName;
        globalStore.displayName = ensName;
    } else {
        globalStore.displayName = shortAddress(globalStore.account, 4);
    }
};

const getChainName = () => {
    const network = getNetwork();
    if (!network.chain) return;

    globalStore.chainName = network.chain.name;
};

const personalSignMessage = async (message: string) => {
    return await signMessage({ message });
};

export { client, connectWallet, disconnectWallet, personalSignMessage };
