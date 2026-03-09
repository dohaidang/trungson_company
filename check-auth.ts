import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.findUnique({ where: { email: 'admin@trungson.vn' } });
    console.log('User found:', !!user);
    if (user) {
        if (user.password) {
            const match = await bcrypt.compare('Admin@123', user.password);
            console.log('Password match:', match);
        } else {
            console.log('User has no password (OAuth)');
        }
    } else {
        console.log('User admin@trungson.vn not found in the DB.');
    }
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
