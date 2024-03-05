import { PrismaClient } from "@prisma/client";
import categories from "./categories.json";

type SubCategory = {
  name: string;
  slug: string;
  subCategories?: SubCategory[];
};

type Category = {
  name: string;
  slug: string;
  subCategories: SubCategory[];  // Make subCategories a required property
};

type Tcategories = Category[];
const prisma = new PrismaClient();
async function main() {
  // languages.forEach(async (lang) => {
  //   let row = await prisma.language.upsert({
  //     where: { value: lang.value },
  //     update: {
  //       name: lang.name,
  //     },
  //     create: {
  //       name: lang.name,
  //       value: lang.value,
  //       nativeName: lang?.nativeName,
  //     },
  //   });
  //   console.log(`language inserted with id: ${row.id}`);
  // });
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
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

