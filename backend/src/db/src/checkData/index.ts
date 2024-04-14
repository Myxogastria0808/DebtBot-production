import { PrismaClient } from '@prisma/client/edge';
import { findAllDebt, findAllDebtRecordId } from './debt/index';
import { findAllUser } from './user/index';

const prisma = new PrismaClient();

const main = async () => {
    // findAllUser();
    // findAllDebt();
    findAllDebtRecordId();
};

main();
