import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./ui/breadcrumb";

export default function Breadcrumbs({ crumbs }) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {crumbs.map((crumb, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>
                            {crumb.currentPage ? (
                                <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink href={crumb.href}>{crumb.title}</BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {!crumb.currentPage && index < crumbs.length - 1 && (
                            <BreadcrumbSeparator />
                        )}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}