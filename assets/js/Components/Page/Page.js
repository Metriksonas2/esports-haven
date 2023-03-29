import React, {Fragment, useEffect, useState} from 'react';
import Sidebar from "@/Components/Page/Sidebar/Sidebar";
import Main from "@/Components/Page/Main/Main";
import toast, {Toaster} from "react-hot-toast";
import {isSidebarOpen} from "@/Services/functions";
import Breadcrumbs from "@/Components/Page/Breadcrumbs/Breadcrumbs";

const Page = ({ pageIndex, breadcrumbsPathArray = [], children }) => {
    let socket = new WebSocket('ws://localhost:8080');
    const [open, setOpen] = useState(isSidebarOpen());

    const minimizeHandler = (value) => {
        setOpen(value);
        window.localStorage.setItem('sidebar-open', value ? 'true' : 'false');
    }

    useEffect(() => {
        socket.addEventListener('open', function (event) {
            console.log('WebSocket connection opened');
        });

        socket.addEventListener('message', function (event) {
            const dataObject = JSON.parse(event.data);
            if ('message' in dataObject) {
                toast.success(dataObject.message)
            }
        });

        return () => {
            socket.close();
        };
    }, []);

    const notificationHandler = async () => {
        if (socket.readyState === 3) {
            socket.close();
            socket = new WebSocket('ws://localhost:8080');

            // wait until new connection is open
            while (socket.readyState !== 1) {
                await new Promise(r => setTimeout(r, 250));
            }
        }

        socket.send(JSON.stringify({
            message: 'New follower request!'
        }));
    }

    return (
        <div className='h-full flex'>
            <Sidebar pageIndex={pageIndex} minimizeHandler={minimizeHandler}/>
            <Main open={open}>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
                {/*<button className='btn-indigo mb-2' onClick={notificationHandler}>Follow</button>*/}
                {breadcrumbsPathArray.length !== 0 && <Breadcrumbs pathArray={breadcrumbsPathArray} /> }
                {children}
            </Main>
        </div>
    );
}

export default Page;