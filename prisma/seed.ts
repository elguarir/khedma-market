import { PrismaClient } from "@prisma/client";
import languages from "./languages.json";
const prisma = new PrismaClient();
async function main() {
  languages.forEach(async (lang) => {
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
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
