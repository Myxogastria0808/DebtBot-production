import { PrismaClient } from '@prisma/client/edge';

const prisma = new PrismaClient();

const findAllUser = async () => {
    const users = await prisma.user.findMany();
    console.log(users);
};

export { findAllUser };
