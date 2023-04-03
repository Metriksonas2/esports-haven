import React from 'react';
import Page from "@/Components/Page/Page";
import FriendsListSmall from "@/Components/Friends/FriendsList/FriendsListSmall";
import FriendsList from "@/Components/Friends/FriendsList/FriendsList";
import Heading from "@/Components/Page/Heading/Heading";

const Index = () => {
    return (
        <Page pageIndex='friends' breadcrumbsPathArray={['Friends']}>
            <Heading title='Friends' />
            <FriendsList friends={[]}/>
        </Page>
    );
}

export default Index;
