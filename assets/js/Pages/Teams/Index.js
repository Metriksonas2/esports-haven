import React from 'react';
import Page from "@/Components/Page/Page";
import Heading from "@/Components/Page/Heading/Heading";

const Index = () => {
    return (
        <Page pageIndex='teams' breadcrumbsPathArray={['Teams']}>
            <Heading title='Teams' />
        </Page>
    );
}

export default Index;