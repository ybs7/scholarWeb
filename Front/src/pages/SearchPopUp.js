import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import colors from "tailwindcss/colors";
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';

function SearchPopUp(props) {

    const [authorName, setAuthorName] = useState('');
    const [authorID, setAuthorID] = useState('');
    const [showSearchPopUp, setShowSearchPopUp] = useState(true);
    const navigate = useNavigate();
    const handleSearchByName = () => {
        // Perform search by name logic
        // Update the main page with the search results
    };

    function SearchId(){
        const newSearch = {
            engine: 'google_scholar_author',
            authorParam:'author_id',
            authorInfo:authorID
        }
        axios.post("http://localhost:9999/serpapi",{
            engine: 'google_scholar_author',
            authorParam:'author_id',
            authorInfo:authorID
        }).then(function (response) {
            console.log(response);
        })
    }
    function SearchName(){
        const newSearch = {
            engine: 'google_scholar_author',
            authorParam:'author_id',
            authorInfo:authorID
        }
        axios.post("http://localhost:9999/serpapi",{
            engine: 'google_scholar_profiles',
            authorParam:'mauthors',
            authorInfo:authorName
        }).then(function (response) {
            console.log(response);
        })
    }

    console.log(authorID);
    console.log(authorName);




    return (
        <div className="flex justify-center items-center h-screen grid place-items-center">
            <div className=''>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    SearchId();
                }}
                className="w-full max-w-sm"
                id='idForm'
            >
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="name"
                        >
                            Author ID
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="name"
                            type="text"
                            value={authorID}
                            onChange={(e) => {
                                setAuthorID(e.target.value);
                            }}
                        />
                    </div>
                </div>
                
                <div className="flex justify-center">
                    {/* <Button variant="secondary" onClick={handleSearchById}>
                        Search By ID
                    </Button> */}
                    <Button type="submit" variant="primary" form='idForm'>
                        Search By ID
                    </Button>
                </div>
            </form>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    SearchName();
                }}
                className="w-full max-w-sm mt-10"
                id='nameForm'
            >
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="name"
                        >
                            Author Name
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="name"
                            type="text"
                            value={authorName}
                            onChange={(e) => {
                                setAuthorName(e.target.value);
                            }}
                        />
                    </div>
                </div>
                
                <div className="flex justify-center">
                    {/* <Button variant="secondary" onClick={handleSearchById}>
                        Search By ID
                    </Button> */}
                    <Button type="submit" variant="primary" form='nameForm'>
                        Search By Name
                    </Button>
                </div>
            </form>
            </div>
        </div>
    );
}

export default SearchPopUp;


{/* <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="role"
                        >
                            Author Name
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="role"
                            type="text"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                        />
                    </div>
                </div> */}
