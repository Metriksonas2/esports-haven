import React, {useState} from 'react';

import Page from "@/Components/Page/Page";
import Heading from "@/Components/Page/Heading/Heading";
import PieChart from "@/Components/Charts/PieChart/PieChart";
import VerticalBarChart from "@/Components/Charts/VerticalBarChart/VerticalBarChart";
import {usePage} from "@inertiajs/inertia-react";

const Dashboard = () => {
    const tournamentCountForEachGame = usePage().props.tournamentCountForEachGame;

    return (
        <Page pageIndex='dashboard'>
            <section className="bg-[#F0F4F9]">
                <div className="pb-8 px-4 mx-auto max-w-screen-xl lg:pb-16 lg:px-6">
                    <Heading title='Dashboard' subtitle='Effortlessly manage and monitor your e-sports tournaments and activities from a centralized and intuitive dashboard.' />
                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="flex-none w-2/3 max-w-full px-3">
                            <div
                                className="p-4 relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                                <div className="flex flex-row gap-3 p-6 pb-6 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                                    <h6 className='font-semibold'>Created tournaments</h6>
                                </div>
                                <VerticalBarChart />
                            </div>
                        </div>
                        <div className="flex-none w-1/3 max-w-full px-3">
                            <div
                                className="p-4 relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                                <div className="flex flex-row gap-3 p-6 pb-6 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                                    <h6 className='font-semibold'>Total tournaments</h6>
                                </div>
                                <PieChart dataArray={tournamentCountForEachGame} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Page>
    );
}

export default Dashboard;
