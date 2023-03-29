import React from 'react';
import FirstBreadcrumb from "@/Components/Page/Breadcrumbs/Types/FirstBreadcrumb";
import MiddleBreadcrumb from "@/Components/Page/Breadcrumbs/Types/MiddleBreadcrumb";
import LastBreadcrumb from "@/Components/Page/Breadcrumbs/Types/LastBreadcrumb";

const Breadcrumbs = ({ pathArray }) => {
    return (
        <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <FirstBreadcrumb />
                {pathArray.map((page, index) => {
                    if (index !== pathArray.length - 1) {
                        return (
                            <MiddleBreadcrumb page={page}/>
                        );
                    } else {
                        return (
                            <LastBreadcrumb page={page}/>
                        );
                    }
                })}
            </ol>
        </nav>
    );
}

export default Breadcrumbs;
