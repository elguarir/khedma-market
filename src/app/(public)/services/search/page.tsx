import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import { HomeIcon, SlashIcon } from "@radix-ui/react-icons";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SearchResults from "../_components/search-results";
import { db } from "@/server/db";
type Props = {
  searchParams?: {
    q?: string;
    price_range?: string;
    delivery_time?: string;
  };
};

const SearchPage = async (props: Props) => {
  let query = props.searchParams?.q;
  let price_range = props.searchParams?.price_range;
  let delivery_time = props.searchParams?.delivery_time;
  let services = await getServices({ query, delivery_time, price_range });
  return (
    <main className="flex w-full flex-col py-6 md:py-16">
      <div className="flex w-full items-center pb-4">
        <Breadcrumb>
          <BreadcrumbList className="sm:gap-1.5">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <HomeIcon className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink className="hover:underline" href="/components">
                Services
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <form method="get" className="flex items-center lg:w-1/3">
        <div className="relative flex h-10 w-full items-center py-0.5">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 transform">
            <Search className="h-4 w-4" />
          </div>
          <Input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search services"
            className="h-full w-full border border-border pl-9"
          />
        </div>
      </form>

      <SearchResults
        delivery_time={delivery_time}
        price_range={price_range}
        query={query}
        services={services}
      />
    </main>
  );
};

export default SearchPage;

interface getServicesProps {
  query?: string;
  price_range?: string;
  delivery_time?: string;
}
async function getServices({
  query,
  price_range,
  delivery_time,
}: getServicesProps) {
  let services = await db.gig.findMany({
    where: {
      title: {
        contains: query,
      },
      status: "published",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      offersMultiplePackages: true,
      createdAt: true,
      attachments: {
        select: {
          url: true,
        },
        where: {
          type: "image",
        },
      },
      packages: {
        select: {
          id: true,
          type: true,
          price: true,
          delivery: true,
        },
      },
      reviews: {
        select: {
          rating: true,
        },
      },
      owner: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
    },
  });

  let formattedServices = services.map((service) => {
    let totalRatings = service.reviews.reduce((acc, review) => {
      return acc + review.rating;
    }, 0);

    let avgRating = totalRatings / service.reviews.length;
    let basicBundle = service.packages.find((pkg) => pkg.type === "basic");

    let startingPrice = basicBundle?.price;
    let deliveryTime = basicBundle?.delivery;
    return {
      author: {
        avatar: service.owner.image,
        id: service.owner.id,
        name: service.owner.name,
        username: service.owner.username,
      },
      service: {
        id: service.id,
        title: service.title,
        slug: service.slug,
        createdAt: service.createdAt,
        price: startingPrice,
        deliveryTime,
        images: service.attachments.map((attachment) => attachment.url),
      },
      numberOfReviews: service.reviews.length,
      rating: avgRating,
    };
  });
  return formattedServices;
}

/**
 * example service formatted!
 * {
      author: {
        avatar:
          "https://fiverr-res.cloudinary.com/image/upload/v1/attachments/profile/photo/fbab78f482a1b26348e956cb132afd5a-1659973799034/d50ef9e4-9102-4d6a-872f-899dbb8a1757.jpg",
        id: "1",
        name: "Ahmed Maz",
        username: "ahmedmaz",
      },
      service: {
        id: "1",
        title:
          "I will make web apps using react, nextjs, nodejs or any other backend",
        createdAt: "2021-09-01T00:00:00.000Z",
        price: 80,
        images: [
          "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/282410535/original/92179208da509fd438e7baf36d659e3936f96179/make-web-apps-using-react-nextjs-nodejs-or-any-other-backend.png",
        ],
      },
      numberOfReviews: 39,
      rating: 4.5,
    },
 * 
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
 */
