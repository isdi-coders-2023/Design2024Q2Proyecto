import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.upsert({
        where: { email: 'alice@prisma.io' },
        update: {},
        create: {
            email: 'alice@prisma.io',
            name: 'Alice',
            password: 'IamAlice',
            surname: 'Smith',
            documentId: '75533442Q',
            birthday: new Date('12/10/2012'),
            phoneNumber: '+44625021454',
            address: 'pink road, 45',
            city: 'London',
            postalCode: '08014',
            iban: 'ES6301880528345815513946',
            occupationTarget: null,
            employeePosition: null,
        },
    });

    await prisma.user.upsert({
        where: { email: 'bob@prisma.io' },
        update: {},
        create: {
            email: 'bob@prisma.io',
            name: 'Bob',
            password: 'IamBob',
            surname: 'Dylan',
            documentId: '53335928D',
            birthday: new Date('12/10/2012'),
            phoneNumber: '+44625021454',
            address: 'pink road, 45',
            city: 'London',
            postalCode: '08015',
            iban: 'ES0200197220964581614246',
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
