import Link from "next/link";

export interface CategoryCardProps {
  title: string;
  href: string;
  image: string;
}
export const CategoryCard = (props: CategoryCardProps) => (
  <div className="w-full overflow-hidden rounded-lg border shadow-sm">
    <img src={props.image} className="w-full object-cover" alt="" />
    <div className="px-4 py-4">
      <Link
        href={props.href}
        className="text-lg font-semibold transition-colors hover:text-primary-dark"
      >
        {props.title}
      </Link>
    </div>
  </div>
);
