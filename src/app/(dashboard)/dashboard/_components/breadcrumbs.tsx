import React from "react";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => (
  <nav aria-label="Breadcrumb">
    <ol className="flex items-center gap-1 text-sm text-gray-600">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <li>
            <a
              href={item.href}
              className="block font-medium transition hover:text-neutral-800"
            >
              {item.name}
            </a>
          </li>
          {index < items.length - 1 && <li className="px-0.5">/</li>}
        </React.Fragment>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
