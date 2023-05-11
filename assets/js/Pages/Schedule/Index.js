import React from 'react';
import Page from "@/Components/Page/Page";
import Calendar from "@/Components/Schedule/Calendar/Calendar";
import {usePage} from "@inertiajs/inertia-react";

const Index = () => {
    const tournamentsForEachDay = usePage().props.tournamentsForEachDay;
    return (
        <Page pageIndex='schedule' breadcrumbsPathArray={['Schedule']}>
            <Calendar tournamentsForEachDay={tournamentsForEachDay}/>
        </Page>
    );
}

export default Index;