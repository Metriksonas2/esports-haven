import React, {useState} from 'react';
import Page from "@/Components/Page/Page";
import FriendsListSmall from "@/Components/Friends/FriendsList/FriendsListSmall";
import FriendsList from "@/Components/Friends/FriendsList/FriendsList";
import Heading from "@/Components/Page/Heading/Heading";
import {usePage} from "@inertiajs/inertia-react";

const Index = () => {
    const friends = usePage().props.friends;
    console.log(friends)
    return (
        <Page pageIndex='friends' breadcrumbsPathArray={['Friends']}>
            <Heading title='Friends' />
            <FriendsList friends={friends}/>
        </Page>
    );
}

export default Index;
