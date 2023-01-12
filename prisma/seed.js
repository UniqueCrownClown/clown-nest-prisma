// import { PrismaClient } from '@prisma/client';
// import * as argon from 'argon2';
const { PrismaClient } = require('@prisma/client');
const argon = require('argon2');

const prisma = new PrismaClient();

const userData = (hash) => [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    hash: hash,
    isAdmin: true,
    posts: {
      create: [
        {
          title: 'Join the Prisma Slack',
          content: 'https://slack.prisma.io',
          published: true,
        },
      ],
    },
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    hash: hash,
    isAdmin: true,
    posts: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          content: 'https://www.twitter.com/prisma',
          published: true,
          viewCount: 42,
        },
      ],
    },
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    hash: hash,
    isAdmin: true,
    posts: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          content: 'https://www.github.com/prisma/prisma/discussions',
          published: true,
          viewCount: 128,
        },
        {
          title: 'Prisma on YouTube',
          content: 'https://pris.ly/youtube',
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  const hash = await argon.hash('123');
  for (const u of userData(hash)) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  await addProduct();
  console.log(`Seeding finished.`);
}

async function addProduct() {
  try {
    const post = await prisma.product.createMany({
      data: [
        {
          name: 'lolipop',
          description: 'lolipop',
          image:
            'https://www.xdsucai.cn/wp-content/uploads/2021/01/1610431690-e5a15b51be1b488.png',
          count: 10,
          price: 10,
        },
        {
          name: 'cookies',
          description: 'cookies',
          image:
            'https://bkimg.cdn.bcebos.com/pic/1f178a82b9014a908ebaf67cae773912b21bee6f',
          count: 5,
          price: 20,
        },
        {
          name: 'donut',
          description: 'donut',
          image: 'https://pic.616pic.com/ys_bnew_img/00/08/01/7JjnTzjPsr.jpg',
          count: 20,
          price: 30,
        },
      ],
    });
    return post;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw error;
    }
  }
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
