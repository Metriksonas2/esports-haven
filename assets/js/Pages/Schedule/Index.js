import React from 'react';
import Page from "@/Components/Page/Page";
import Calendar from "@/Components/Schedule/Calendar/Calendar";

const Index = () => {
    return (
        <Page pageIndex='schedule' breadcrumbsPathArray={['Schedule']}>
            <Calendar />
        </Page>
    );
}

export default Index;