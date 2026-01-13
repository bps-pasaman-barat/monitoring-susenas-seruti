import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  const hashedPassword = await bcrypt.hash("useradmin", 10);

  await prisma.user.createMany({
    data: {
      username: "useradmin",
      password: hashedPassword,
    },
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
