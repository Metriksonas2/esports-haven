import React from 'react';
import Page from "@/Components/Page/Page";
import Heading from "@/Components/Page/Heading/Heading";
import Achievement from "@/Components/Achievements/Achievement";
import {usePage} from "@inertiajs/inertia-react";

const Index = () => {
    const achievements = usePage().props.achievements;

    return (
        <Page pageIndex='achievements' breadcrumbsPathArray={['Achievements']}>
            <Heading title='Achievements' subtitle='Your hardly earned achievements'/>
            <div className='flex flex-col justify-center items-center gap-y-4'>
                {achievements.map(achievement => (
                    <Achievement achievement={achievement} />
                ))}
            </div>
        </Page>
    );
}

export default Index;