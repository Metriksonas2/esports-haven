import React from 'react';
import Topbar from "@/Components/Page/Topbar/Topbar";
import Content from "@/Components/Page/Content/Content";

const Main = ({ children, open }) => {


    return (
        <div className={`${open ? 'ml-72' : 'ml-20'} h-full flex flex-col flex-1 pb-7 bg-[#F0F4F9] duration-300`}>
            <Topbar open={open} />
            <Content>
                {children}
            </Content>
        </div>
    );
}

export default Main;
