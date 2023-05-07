import { Address, getAddress } from 'viem';

const shortAddress = (address: Address, length = 4) => {
    return [
        address.substring(0, 2 + length),
        address.substring(address.length - length),
    ].join('...');
};

const isAddress = (value: string): string | false => {
    try {
        return getAddress(value);
    } catch {
        return false;
    }
};

const isEqualAddress = (address1: string, address2: string) => {
    return (
        isAddress(address1) &&
        isAddress(address2) &&
        getAddress(address1) === getAddress(address2)
    );
};

const formatAmountFromNumber = (amount: number, length = 3) => {
    return parseFloat(amount.toFixed(length));
};

export { isAddress, isEqualAddress, shortAddress, formatAmountFromNumber };
