import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import axios from "axios";
import { randomUUID } from "crypto";
import { youcan } from "@/lib/utils";

export const orderRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        amount: z.number(),
        transactionId: z.string(),
        orderId: z.string(),
        gigId: z.string(),
        packageId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {}),
});

/***
 * /tokenize

$ curl --location --request POST 'https://youcanpay.com/api/tokenize' \
--header 'Accept: application/json' \
--form 'amount="500"' \
--form 'currency="MAD"' \
--form 'pri_key="pri_key_for_test"' \
--form 'order_id="12"' \
--form 'metadata[cart.id]="uuid"' \
--form 'metadata[type]="checkout"'
{
  "token": {
    "id": "26010885-fb7b-41eb-baf8-3420213f1ed5"
  }
}
 */

export async function tokenizePayment(
  amount: number,
  currency: string,
  order_id: string,
) {
  let formData = new FormData();
  formData.append("amount", amount.toString());
  formData.append("currency", currency);
  formData.append("pri_key", process.env.PRIVATE_YOUCAN_KEY!);
  formData.append("order_id", order_id);
  formData.append("metadata[cart.id]", randomUUID().toString());
  try {
    let response = await youcan.post("/tokenize", formData);

    if (response.status === 200) {
      return response.data as {
        token: {
          id: string;
        };
      };
    }
  } catch (error) {
    console.log("error", error);
    return null;
  }

  return null;
}

/**
 * 
 * generator client {
    provider = "prisma-client-js"
}

datasource db {
    provider = "mysql"
    url      = env("DATABASE_URL")
}

// Necessary for Next auth
model Account {
    id                String  @id @default(cuid())
    userId            String  @map("user_id")
    type              String
    provider          String
    providerAccountId String  @map("provider_account_id")
    refresh_token     String? @db.Text
    access_token      String? @db.Text
    expires_at        Int?
    token_type        String?
    scope             String?
    id_token          String? @db.Text
    session_state     String?
    user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

    @@unique([provider, providerAccountId])
    @@map("accounts")
}

model VerificationToken {
    id      String   @id @default(cuid())
    email   String
    token   String   @unique
    expires DateTime

    @@unique([email, token])
    @@map("verification_tokens")
}

model PasswordResetToken {
    id      String   @id @default(cuid())
    email   String
    token   String   @unique
    expires DateTime

    @@unique([email, token])
    @@map("password_reset_tokens")
}

model TwoFactorToken {
    id      String   @id @default(cuid())
    email   String
    token   String   @unique
    expires DateTime

    @@unique([email, token])
    @@map("two_factor_tokens")
}

model TwoFactorConfirmation {
    id     String @id @default(cuid())
    userId String
    user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

    @@unique([userId])
    @@map("two_factor_confirmations")
}

model Session {
    id           String   @id @default(cuid())
    sessionToken String   @unique @map("session_token")
    userId       String   @map("user_id")
    expires      DateTime
    user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

    @@map("sessions")
}

model User {
    id            String    @id @default(cuid())
    name          String?
    firstName     String?   @map("first_name")
    lastName      String?   @map("last_name")
    username      String?   @unique
    email         String?   @unique
    emailVerified DateTime? @map("email_verified")
    image         String?
    password      String?   @db.Text
    role          role?

    // personal info will be used when applying to jobs etc...
    dob        DateTime? @map("date_of_birth")
    bio        String?   @db.Text
    country    String?   @default("Morocco")
    city       String?
    address    String?
    phone      String?
    website    String?
    resume     String?   @db.Text
    profilePic String?   @map("profile_pic")

    // feature flags
    isTwoFactorEnabled        Boolean                @default(false) @map("is_two_factor_enabled")
    inboxNotifications        Boolean                @default(true) @map("inbox_notifications")
    orderUpdatesNotifications Boolean                @default(true) @map("order_updates_notifications")
    twoFactorConfirmation     TwoFactorConfirmation?

    // freelancer, profile info
    description             String?         @db.Text
    languages               UserLanguages[]
    education               Education[]
    certifications          Certification[]
    skills                  Skill[]
    // extras
    sessions                Session[]
    accounts                Account[]
    conversationsAsSender   Conversation[]  @relation("SenderToConversation")
    conversationsAsReceiver Conversation[]  @relation("ReceiverToConversation")
    messages                Message[]
    attachements            Attachement[]
    gigs                    Gig[]
    reviews                 Review[]
    orders                  Order[]

    createdAt    DateTime      @default(now()) @map("created_at")
    updatedAt    DateTime      @updatedAt @map("updated_at")
    projects     Project[]
    applications Application[]
    companies    Company[]

    @@map("users")
}

model Company {
    id           String   @id @default(cuid())
    name         String
    logo         String   @db.Text
    industry     String
    location     String
    description  String   @db.Text
    contactEmail String   @map("contact_email")
    website      String?
    createdAt    DateTime @default(now()) @map("created_at")
    updatedAt    DateTime @updatedAt @map("updated_at")
    userId       String   @map("user_id")

    jobs Job[]
    user User  @relation(fields: [userId], references: [id])
}

model Job {
    id          String   @id @default(cuid())
    slug        String   @unique
    title       String
    description Json
    location    String
    salary      String?
    canBeRemote Boolean  @map("can_be_remote")
    companyId   String   @map("company_id")
    type        JobType
    createdAt   DateTime @default(now()) @map("created_at")
    updatedAt   DateTime @updatedAt @map("updated_at")

    applications Application[]
    company      Company       @relation(fields: [companyId], references: [id])
}

enum JobType {
    full_time
    part_time
    contract
    intern
}

model Application {
    id          String   @id @default(cuid())
    jobId       String   @map("job_id")
    userId      String   @map("user_id")
    coverLetter String   @map("cover_letter") @db.Text
    createdAt   DateTime @default(now()) @map("created_at")
    updatedAt   DateTime @updatedAt @map("updated_at")

    applicant User @relation(fields: [userId], references: [id])
    job       Job  @relation(fields: [jobId], references: [id])
}

model Project {
    id          String        @id @default(cuid())
    title       String        @db.VarChar(255)
    description String        @db.Text
    status      ProjectStatus @default(draft)
    gallery     Attachement[]
    createdAt   DateTime      @default(now()) @map("created_at")
    updatedAt   DateTime      @updatedAt @map("updated_at")
    user        User?         @relation(fields: [userId], references: [id])
    userId      String?       @map("user_id")

    @@map("projects")
}

enum ProjectStatus {
    draft
    published
}

enum role {
    client
    freelancer
    company
    admin
}

enum SkillStatus {
    active
    inactive
}

model Language {
    id         String          @id @default(cuid())
    name       String
    nativeName String?         @map("native_name")
    value      String          @unique
    createdAt  DateTime        @default(now()) @map("created_at")
    updatedAt  DateTime        @updatedAt @map("updated_at")
    users      UserLanguages[]

    @@map("languages")
}

model UserLanguages {
    userId     String   @map("user_id")
    user       User     @relation(fields: [userId], references: [id])
    languageId String   @map("language_id")
    language   Language @relation(fields: [languageId], references: [id])
    level      String

    @@id([userId, languageId])
    @@map("user_languages")
}

model Education {
    id               String   @id @default(cuid())
    country          String
    universityName   String   @map("university_name")
    title            String
    major            String
    yearOfGraduation DateTime @map("year_of_graduation")

    user   User?   @relation(fields: [userId], references: [id])
    userId String? @map("user_id")

    createdAt DateTime @default(now()) @map("created_at")
    updatedAt DateTime @updatedAt @map("updated_at")

    @@map("education")
}

model Certification {
    id            String   @id @default(cuid())
    name          String
    certifiedFrom String   @map("certified_from")
    createdAt     DateTime @default(now()) @map("created_at")
    updatedAt     DateTime @updatedAt @map("updated_at")
    user          User?    @relation(fields: [userId], references: [id])
    userId        String?  @map("user_id")

    @@map("certifications")
}

model Skill {
    id     String      @id @default(cuid())
    name   String
    value  String
    status SkillStatus @default(active)
    level  String

    createdAt DateTime @default(now()) @map("created_at")
    updatedAt DateTime @updatedAt @map("updated_at")

    userId String? @map("user_id")
    user   User?   @relation(fields: [userId], references: [id])

    @@map("skills")
}

model Message {
    id             String        @id @default(cuid())
    content        String        @db.Text
    conversationId String        @map("conversation_id")
    user           User          @relation(fields: [userId], references: [id])
    userId         String        @map("user_id")
    createdAt      DateTime      @default(now()) @map("created_at")
    updatedAt      DateTime      @updatedAt @map("updated_at")
    attachements   Attachement[]
    conversation   Conversation  @relation(fields: [conversationId], references: [id])

    @@map("messages")
}

model Conversation {
    id         String    @id @default(cuid())
    createdAt  DateTime  @default(now()) @map("created_at")
    updatedAt  DateTime  @updatedAt @map("updated_at")
    senderId   String    @map("sender_id")
    receiverId String    @map("receiver_id")
    sender     User      @relation("SenderToConversation", fields: [senderId], references: [id])
    receiver   User      @relation("ReceiverToConversation", fields: [receiverId], references: [id])
    messages   Message[]

    @@map("conversations")
}

model Attachement {
    id        String   @id @default(cuid())
    name      String
    url       String
    type      String
    userId    String?  @map("user_id")
    user      User?    @relation(fields: [userId], references: [id])
    messageId String?  @map("message_id")
    message   Message? @relation(fields: [messageId], references: [id])
    createdAt DateTime @default(now()) @map("created_at")
    updatedAt DateTime @updatedAt @map("updated_at")
    gig       Gig?     @relation(fields: [gigId], references: [id])
    gigId     String?  @map("gig_id")
    project   Project? @relation(fields: [projectId], references: [id])
    projectId String?  @map("project_id")

    @@map("attachements")
}

enum GigStatus {
    draft
    published
    paused
    deleted
}

model Gig {
    id                     String    @id @default(cuid())
    title                  String?
    slug                   String?
    description            Json?
    isPaused               Boolean   @default(false) @map("is_paused")
    status                 GigStatus @default(draft)
    offersMultiplePackages Boolean   @default(false) @map("offers_multiple_packages")
    ownerId                String    @map("owner_id")
    categoryId             String?   @map("category_id")
    createdAt              DateTime  @default(now()) @map("created_at")
    updatedAt              DateTime  @updatedAt @map("updated_at")

    packages    Package[]
    category    Category?     @relation(fields: [categoryId], references: [id])
    owner       User          @relation(fields: [ownerId], references: [id])
    attachments Attachement[]
    reviews     Review[]
    tags        GigTag[]
    faqs        GigFaq[]
    orders      Order[]

    @@map("gigs")
}

// payments
model Order {
    id          String      @id @default(cuid())
    userId      String      @map("user_id")
    gigId       String      @map("gig_id")
    status      OrderStatus @default(pending)
    totalAmount Float       @map("total_amount")
    createdAt   DateTime    @default(now()) @map("created_at")
    updatedAt   DateTime    @updatedAt @map("updated_at")
    packageId   String      @map("package_id")

    user    User     @relation(fields: [userId], references: [id])
    package Package  @relation(fields: [packageId], references: [id])
    gig     Gig      @relation(fields: [gigId], references: [id])
    payment Payment?

    @@map("orders")
}

model Payment {
    id            String        @id @default(cuid())
    orderId       String        @unique @map("order_id")
    status        PaymentStatus @default(pending)
    amount        Float
    paymentMethod String        @map("payment_method")
    transactionId String?       @map("transaction_id")
    createdAt     DateTime      @default(now()) @map("created_at")
    updatedAt     DateTime      @updatedAt @map("updated_at")
    order         Order         @relation(fields: [orderId], references: [id])

    @@map("payments")
}

enum OrderStatus {
    pending
    processing
    completed
    cancelled
}

enum PaymentStatus {
    pending
    success
    failed
}

model Review {
    id        String   @id @default(cuid())
    rating    Int
    comment   String
    createdAt DateTime @default(now()) @map("created_at")
    updatedAt DateTime @updatedAt @map("updated_at")
    gig       Gig?     @relation(fields: [gigId], references: [id])
    gigId     String?  @map("gig_id")
    user      User?    @relation(fields: [userId], references: [id])
    userId    String?  @map("user_id")
}

enum PackageType {
    basic
    standard
    premium
}

model Package {
    id          String      @id @default(cuid())
    name        String
    price       Float
    description String
    delivery    Int
    revisions   Int
    createdAt   DateTime    @default(now()) @map("created_at")
    updatedAt   DateTime    @updatedAt @map("updated_at")
    type        PackageType
    gig         Gig?        @relation(fields: [gigId], references: [id])
    gigId       String?     @map("gig_id")
    orders      Order[]

    @@unique([gigId, type])
    @@map("packages")
}

model Category {
    id             String     @id @default(cuid())
    name           String
    slug           String     @unique
    parentCategory Category?  @relation(name: "CategoryRelation", fields: [parentId], references: [id])
    subCategories  Category[] @relation(name: "CategoryRelation")
    parentId       String?    @map("parent_id")
    gigs           Gig[]

    @@map("categories")
}

model GigTag {
    id        String   @id @default(cuid())
    name      String
    createdAt DateTime @default(now()) @map("created_at")
    updatedAt DateTime @updatedAt @map("updated_at")
    gig       Gig?     @relation(fields: [gigId], references: [id])
    gigId     String?  @map("gig_id")

    @@map("gig_tags")
}

model GigFaq {
    id        String   @id @default(cuid())
    question  String   @db.Text
    answer    String   @db.Text
    createdAt DateTime @default(now()) @map("created_at")
    updatedAt DateTime @updatedAt @map("updated_at")
    gig       Gig?     @relation(fields: [gigId], references: [id])
    gigId     String?  @map("gig_id")

    @@map("gig_faqs")
}

 */
