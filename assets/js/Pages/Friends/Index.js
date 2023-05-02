import React, {useState} from 'react';
import Page from "@/Components/Page/Page";
import FriendsList from "@/Components/Friends/FriendsList/FriendsList";
import {usePage} from "@inertiajs/inertia-react";
import {Tab} from "@headlessui/react";
import {classNames} from "@/Services/functions";
import FriendRequestsList from "@/Components/Friends/FriendRequestsList/FriendRequestsList";

const Index = () => {
    const [friends, setFriends] = useState(usePage().props.friends);
    const [friendRequests, setFriendRequests] = useState(usePage().props.friendRequests);
    const friendsSelectedGames = usePage().props.friendsSelectedGames;
    const friendRequestsSelectedGames = usePage().props.friendRequestsSelectedGames;

    console.log(friendRequestsSelectedGames)
    const removeFriendHandler = (id) => {
        setFriends((prevFriends) => {
            return prevFriends.filter(x => x.id !== id);
        });
    }

    const acceptFriendRequestHandler = (friend) => {
        setFriends((prevFriends) => {
            return [friend, ...prevFriends];
        });

        setFriendRequests((prevFriendRequests) => {
            return prevFriendRequests.filter(x => x.id !== friend.id);
        });
    }

    const removeFriendRequestHandler = (id) => {
        setFriendRequests((prevFriendRequests) => {
            return prevFriendRequests.filter(x => x.id !== id);
        });
    }

    const friendsTabs = {
        "Friends List": <FriendsList friends={friends} selectedGames={friendsSelectedGames} removeFriendHandler={removeFriendHandler}/>,
        "Friend Requests": <FriendRequestsList
            friendRequests={friendRequests}
            selectedGames={friendRequestsSelectedGames}
            acceptHandler={acceptFriendRequestHandler}
            declineHandler={removeFriendRequestHandler}
        />,
    };

    const friendsData = [
        friends,
        friendRequests,
    ]

    return (
        <Page pageIndex='friends' breadcrumbsPathArray={['Friends']}>
            <Tab.Group>
                <div className="w-full max-w-md px-2 sm:px-0 mb-6">
                    <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                        {Object.keys(friendsTabs).map((category, index) => (
                            <Tab
                                key={category}
                                className={({ selected }) =>
                                    classNames(
                                        'w-full rounded-lg py-2.5 text-sm font-semibold leading-5 text-blue-700',
                                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 relative',
                                        selected
                                            ? 'bg-white shadow'
                                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                    )
                                }
                            >
                                {category}
                                {(category === 'Friend Requests' && friendRequests.length !== 0) && (
                                    <div className='h-6 w-6 rounded-full max-w-6 min-h-6 flex items-center justify-center absolute -top-2.5 -right-2.5 text-[12px] font-semibold bg-indigo-700 text-white'>
                                        {friendRequests.length}
                                    </div>
                                )}
                            </Tab>
                        ))}
                    </Tab.List>
                </div>
                <Tab.Panels>
                    {Object.values(friendsTabs).map((data, index) => (
                        <Tab.Panel>
                            <div className="flex flex-wrap -mx-3 mb-4">
                                <div className="flex-none w-full max-w-full px-3">
                                    <div
                                        className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                                        <div className="flex flex-row gap-3 p-6 pb-6 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                                            <h6 className='font-semibold'>{Object.keys(friendsTabs)[index]}</h6>
                                            <div className='rounded-full border border-indigo-700 text-indigo-700 font-semibold px-2'>{friendsData[index].length}</div>
                                        </div>
                                        {data}
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </Page>
    );
}

export default Index;
