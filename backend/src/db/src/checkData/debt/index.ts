import { PrismaClient } from '@prisma/client/edge';

const prisma = new PrismaClient();

const findAllDebt = async () => {
    const debt = await prisma.debt.findMany({
        where: {
            isPayOff: false,
        },
    });
    console.log(debt);
};

const findAllDebtRecordId = async () => {
    const debtRecordId = await prisma.debtRecordId.findMany();
    console.log(debtRecordId);
};

const changePayOff = async (id: number) => {
    const debt = await prisma.debt.update({
        where: {
            id,
        },
        data: {
            isPayOff: true,
        },
    });
    console.log(debt);
};

export { findAllDebt, findAllDebtRecordId, changePayOff };
