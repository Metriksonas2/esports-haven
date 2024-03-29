import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import DatePicker from "@/Components/UI/DatePicker/DatePicker";
import {getCorrectDateFormatFromDateObject} from "@/Services/functions";
import {logPlugin} from "@babel/preset-env/lib/debug";

const General = ({ tournament, onGeneralEdit }) => {
    const [name, setName] = useState(tournament.name);
    const [description, setDescription] = useState(tournament.description);
    const [startDate, setStartDate] = useState(getCorrectDateFormatFromDateObject(new Date(tournament.startDate)))
    const [rules, setRules] = useState(tournament.rules);

    const handleDateChange = (date) => {
        setStartDate(date);
    }

    const onEditClickHandler = () => {
        onGeneralEdit({
            name,
            description,
            startDate,
            rules
        });
    }

    return (
        <React.Fragment>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           htmlFor="">
                        Tournament name
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="" type="text" placeholder="Baltic LoL Cup #2" defaultValue={name} onChange={(e) => setName(e.target.value) } />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           htmlFor="">
                        Start Date
                    </label>
                    <DatePicker initialDate={startDate} setDate={handleDateChange}/>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           htmlFor="">
                        Description
                    </label>
                    <textarea id="" rows="4"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-200 focus:bg-white focus:outline-none focus:border-gray-500"
                              placeholder="Write your thoughts here..."
                              defaultValue={description}
                              onChange={(e) => setDescription(e.target.value) }>
                    </textarea>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           htmlFor="">
                        Rules
                    </label>
                    <textarea id="" rows="4"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-200 focus:bg-white focus:outline-none focus:border-gray-500"
                              placeholder="Write your tournament rules here..."
                              defaultValue={rules}
                              onChange={(e) => setRules(e.target.value) }>
                    </textarea>
                </div>
            </div>
            <button type="button"
                    onClick={onEditClickHandler}
                    className="align-end mt-2 w-24 focus:outline-none text-white bg-indigo-900 hover:bg-indigo-600 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
                Edit
            </button>
        </React.Fragment>
    );
};

export default General;