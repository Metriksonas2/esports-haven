import React, {useEffect} from 'react';
import {generateMonthlyCalendar, getFirstDayOfTheCurrentMonth, getEmptyCalendarCellsCount} from "@/Services/functions";
import Cell from "@/Components/Schedule/Calendar/Cell/Cell";

const Calendar = () => {
    const calendar = generateMonthlyCalendar();
    const monthStartsAfterFriday = getFirstDayOfTheCurrentMonth() > 5;
    const emptyCellsCount = getEmptyCalendarCellsCount();
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const currentYear = currentDate.getFullYear();

    return (
        <React.Fragment>
            <div className="text-gray-700 -z-10">
                <div className="flex flex-grow w-full h-screen overflow-auto">

                    <div className="flex flex-col flex-grow">
                        <div className="flex items-center mt-4">
                            <div className="flex ml-6">
                                <button>
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M15 19l-7-7 7-7"/>
                                    </svg>
                                </button>
                                <button>
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M9 5l7 7-7 7"/>
                                    </svg>
                                </button>
                            </div>
                            <h2 className="ml-2 text-xl font-bold leading-none">{currentMonth}, {currentYear}</h2>
                        </div>
                        <div className="grid grid-cols-7 mt-4">
                            <div className="pl-1 text-sm">Mon</div>
                            <div className="pl-1 text-sm">Tue</div>
                            <div className="pl-1 text-sm">Wed</div>
                            <div className="pl-1 text-sm">Thu</div>
                            <div className="pl-1 text-sm">Fri</div>
                            <div className="pl-1 text-sm">Sat</div>
                            <div className="pl-1 text-sm">Sun</div>
                        </div>
                        <div className={
                            `grid flex-grow w-full h-auto grid-cols-7 
                            ${monthStartsAfterFriday ? 'grid-rows-6' : 'grid-rows-5'} gap-px pt-px mt-1 bg-gray-200`
                        }>
                            {[...Array(emptyCellsCount)].map((e) => (
                                <Cell isEmpty={true} />
                            ))}
                            {calendar.map(day => (
                                <Cell day={day} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Calendar;