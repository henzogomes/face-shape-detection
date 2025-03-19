import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="text-sm breadcrumbs mb-6" aria-label="breadcrumbs">
      {items.map((item, index) => (
        <React.Fragment key={item.path || index}>
          {index > 0 && " / "}
          {item.path ? (
            <Link to={item.path} className="text-gray-500 hover:text-gray-700">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
