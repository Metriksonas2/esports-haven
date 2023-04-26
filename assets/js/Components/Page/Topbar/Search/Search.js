import React, {useEffect, useState} from 'react';
import SearchResult from "@/Components/Page/Topbar/Search/SearchResult";
import axios from "axios";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchBarFocus, setSearchBarFocus] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const onQueryChangeHandler = (e) => {
        setSearchQuery(e.target.value);
    }

    useEffect(() => {
        (async () => {
            await axios.get('/api/users/')
                .then(response => {
                    const usersData = response.data;
                    setUsers(response.data.users);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                });
        })()
    }, []);

    return (
        <React.Fragment>
            <label htmlFor="default-search"
                   className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none"
                         stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <input type="search" id="default-search"
                       autoComplete='off'
                       value={searchQuery}
                       onChange={onQueryChangeHandler}
                       onFocus={() => setSearchBarFocus(true)}
                       onBlur={() => setTimeout(() => {
                           setSearchBarFocus(false);
                       }, 160)}
                       className="block w-full p-4 pl-10 text-sm text-gray-900 border border-indigo-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-indigo-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Search users" required />
                <div className='absolute left-0 top-[54px] w-full z-50'>
                    {!loading &&
                        users.filter((user) => {
                                const searchQueryValue = searchQuery.toLowerCase();
                                const fullName = user.firstName + ' ' + user.lastName;

                                return searchQueryValue && searchBarFocus && fullName.toLowerCase().includes(searchQueryValue);
                        }).slice(0, 5).map((user) => (
                            <SearchResult user={user} />
                        ))
                    }
                    {(loading && searchBarFocus && searchQuery) && (
                        <SearchResult loading={true} />
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Search;
