import React from 'react';
import Page from "@/Components/Page/Page";
import Heading from "@/Components/Page/Heading/Heading";

const Index = () => {
    return (
        <Page pageIndex='achievements' breadcrumbsPathArray={['Achievements']}>
            <Heading title='Achievements' subtitle='Your hardly earned achievements'/>
        </Page>
    );
}

export default Index;