import { FetchBalanceResult } from '@wagmi/core';
import { defineStore } from 'pinia';
import { Address } from 'viem';

export interface State {
    theme: string;
    loading: boolean;
    walletId: string;
    chainId: number;
    connected: boolean;
    account: Address;
    balance: FetchBalanceResult | null;
    ensName: string | null;
    displayName: string | null;
    chainName: string | undefined;
}

const state: State = {
    theme: 'light',
    loading: false,
    walletId: 'injected',
    chainId: import.meta.env.VITE_CHAIN_ID || 1,
    connected: false,
    account: '0x',
    balance: null,
    ensName: null,
    displayName: null,
    chainName: undefined,
};

export const useGlobalStore = defineStore('globalStore', {
    state: () => {
        return { ...state };
    },
    actions: {
        setTheme(dark: boolean) {
            if (dark) {
                this.theme = 'dark';
            } else {
                this.theme = 'light';
            }
        },
    },
});
