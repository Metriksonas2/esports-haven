import React, {Fragment, useState} from 'react';
import Sidebar from "@/Components/Page/Sidebar/Sidebar";
import Main from "@/Components/Page/Main/Main";

const Page = ({ pageIndex, children }) => {
    const [open, setOpen] = useState(true);

    const minimizeHandler = (value) => {
        setOpen(value);
    }

    return (
        <div className='h-full flex'>
            <Sidebar pageIndex={pageIndex} minimizeHandler={minimizeHandler}/>
            <Main open={open}>
                {children}
            </Main>
        </div>
    );
}

export default Page;