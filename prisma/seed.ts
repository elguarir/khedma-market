import { PrismaClient } from "@prisma/client";
import categories from "./categories.json";
import lanaguages from "./languages.json";
type SubCategory = {
  name: string;
  slug: string;
  subCategories?: SubCategory[];
};

type Category = {
  name: string;
  slug: string;
  subCategories: SubCategory[]; // Make subCategories a required property
};

type Tcategories = Category[];

async function createConversation(senderId: string, receiverId: string) {
  const conversation = await prisma.conversation.create({
    data: {
      sender: {
        connect: {
          id: senderId,
        },
      },
      receiver: {
        connect: {
          id: receiverId,
        },
      },
    },
  });
  return conversation;
}

async function seedCategories() {
  const createCategories = async (categories: Tcategories, parentId = null) => {
    for (const categoryData of categories) {
      const category = await prisma.category.create({
        data: {
          name: categoryData.name,
          slug: categoryData.slug,
          parentId: parentId,
        },
      });
      console.log(`category inserted with id: ${category.id}`);

      if (categoryData.subCategories && categoryData.subCategories.length > 0) {
        // @ts-ignore
        await createCategories(categoryData.subCategories, category.id);
      }
    }
  };

  await createCategories(categories);
}

async function seedLanguages() {
  lanaguages.forEach(async (lang) => {
    let row = await prisma.language.upsert({
      where: { value: lang.value },
      update: {
        name: lang.name,
      },
      create: {
        name: lang.name,
        value: lang.value,
        nativeName: lang?.nativeName,
      },
    });
    console.log(`language inserted with id: ${row.id}`);
  });
}

async function seedConversations() {
  let user1Id = "cltbkt0m1000012zwmsks7cng";
  let user2Id = "cltuns0ns000011aex0gzuusc";

  const conversation = await createConversation(user1Id, user2Id);
  const messages = [
    {
      content: "Hello, how are you?",
      userId: user1Id,
      conversationId: conversation.id,
    },
    {
      content: "I am doing well, thank you!",
      userId: user2Id,
      conversationId: conversation.id,
    },
    {
      content: "That's great to hear!",
      userId: user1Id,
      conversationId: conversation.id,
    },
  ];

  for (const message of messages) {
    await prisma.message.create({
      data: message,
    });
  }
  console.log(`conversation inserted with id: ${conversation.id}`);
}
const prisma = new PrismaClient();
async function main() {
  // languages
  // await seedLanguages();
  // categories
  await seedCategories();
  // await seedConversations()
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
