import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.account.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      firebaseAuthUid: 'account-1',
      email: 'alice@prisma.io',
      user: {
        create: {
          name: 'Alice',
          tasks: {
            create: [
              {
                title: 'Follow Prisma on Twitter',
                description: 'https://twitter.com/prisma',
                status: 'DONE',
              },
              {
                title: 'Follow Nexus on Twitter',
                description: 'https://twitter.com/nexusgql',
                status: 'DOING',
              },
            ],
          },
        },
      },
    },
  });
  const bob = await prisma.account.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      firebaseAuthUid: randomUUID(),
      email: 'bob@prisma.io',
      user: {
        create: {
          name: 'Alice',
          tasks: {
            create: [
              {
                title: 'Follow Prisma on Twitter',
                description: 'https://twitter.com/prisma',
                status: 'DOING',
              },
              {
                title: 'Follow Nexus on Twitter',
                description: 'https://twitter.com/nexusgql',
                status: 'TODO',
              },
            ],
          },
        },
      },
    },
  });
  console.log({ alice, bob });
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
