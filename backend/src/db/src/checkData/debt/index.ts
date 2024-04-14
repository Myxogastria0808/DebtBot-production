import { PrismaClient } from '@prisma/client/edge';

const prisma = new PrismaClient();

const findAllDebt = async () => {
    const debt = await prisma.debt.findMany();
    console.log(debt);
};

const findAllDebtRecordId = async () => {
    const debtRecordId = await prisma.debtRecordId.findMany();
    console.log(debtRecordId);
};

export { findAllDebt, findAllDebtRecordId };
