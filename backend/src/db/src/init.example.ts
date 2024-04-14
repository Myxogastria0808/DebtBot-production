import { PrismaClient } from '@prisma/client';
import { UserDataType } from 'types';

const prisma = new PrismaClient();

//*ダミーの Discord ID と Discord Username を書く
const discordId: string = '';
const discordUsername: string = '';

const initialCreate = async () => {
    const initialUser: UserDataType = await prisma.user.create({
        data: { discordId, discordUsername },
    });
    const initialDebtRecordId = await prisma.debtRecordId.create({
        data: {
            id: 1,
            tag: 'LATEST',
        },
    });
    const initialDebt = await prisma.debt.create({
        data: {
            id: 1,
            money: 0,
            isPayOff: false,
            lendId: discordId,
            borrowId: discordId,
        },
    });
    console.log('-----Initial User------');
    console.log(initialUser);
    console.log('-----Initial Debt Record Id-----');
    console.log(initialDebtRecordId);
    console.log('-----Initial Debt-----');
    console.log(initialDebt);
};

//実行
initialCreate();
