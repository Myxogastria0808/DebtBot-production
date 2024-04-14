import { PrismaClient } from '@prisma/client/edge';
import { AmountDataType, DebtDataType } from 'types';

const prisma = new PrismaClient();

const createDebt = async (money: number, lendId: string, borrowId: string): Promise<number> => {
    const debtRecordId = await prisma.debtRecordId.findMany({
        where: {
            tag: 'LATEST',
        },
    });
    if (debtRecordId.length === 1) {
        await prisma.debtRecordId.update({
            where: {
                cockroachdbId: debtRecordId[0].cockroachdbId,
            },
            data: {
                tag: 'OLD',
            },
        });
        await prisma.debtRecordId.create({
            data: {
                id: Number(debtRecordId[0].id) + 1,
                tag: 'LATEST',
            },
        });
        await prisma.debt.create({
            data: {
                id: Number(debtRecordId[0].id) + 1,
                money,
                isPayOff: false,
                lendId,
                borrowId,
            },
        });
        return Number(debtRecordId[0].id) + 1;
    } else {
        throw '`tag: LATEST` have to exits only one.';
    }
};

const changePayOff = async (id: number): Promise<void> => {
    const debtRecordId = await prisma.debtRecordId.findMany({
        where: {
            tag: 'LATEST',
        },
    });
    if (debtRecordId.length === 1) {
        await prisma.debt.update({
            where: {
                id,
            },
            data: {
                isPayOff: true,
            },
        });
    } else {
        throw '`tag: LATEST` have to exits only one.';
    }
};

// const cancelPayOff = async (id: number) => {
//     await prisma.debt.update({
//         where: {
//             id,
//         },
//         data: {
//             isPayOff: false,
//         },
//     });
// };

const checkDebtAmount = async (discordId: string): Promise<AmountDataType> => {
    const debt: DebtDataType[] = await prisma.debt.findMany({
        where: {
            borrowId: discordId,
            isPayOff: false,
        },
    });
    let amount: AmountDataType = [{ lendId: discordId, amount: 0 }];
    debt.forEach((debtData) => {
        let isHit: boolean = false;
        amount.forEach((eachAmount) => {
            if (eachAmount.lendId === debtData.lendId) {
                eachAmount.amount += debtData.money;
                isHit = true;
            }
        });
        if (!isHit) {
            amount.push({ lendId: debtData.lendId, amount: debtData.money });
        }
    });
    return amount;
};

// const deleteDebt = async (id: number) => {
//     await prisma.debt.delete({
//         where: {
//             id,
//         },
//     });
// };

export { createDebt, changePayOff, checkDebtAmount };
