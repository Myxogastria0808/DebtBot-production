type UserDataType = {
    discordId: string;
    discordUsername: string;
    createdAt: Date;
    updatedAt: Date;
};

type DebtDataType = {
    cockroachdbId: bigint;
    money: number;
    isPayOff: boolean;
    createdAt: Date;
    updatedAt: Date;
    lendId: string;
    borrowId: string;
    id: bigint;
};

type DebtRecordIdType = {};

type AmountDataType = { lendId: string; amount: number }[];

type deleteUserResultType = 'success' | 'failed';

export { UserDataType, DebtDataType, AmountDataType, deleteUserResultType };
