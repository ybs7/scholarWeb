import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import colors from "tailwindcss/colors";
import {Navigate, useNavigate} from 'react-router-dom';


function SearchPopUp(props) {

    const [authorName, setAuthorName] = useState('');
    const [showSearchPopUp, setShowSearchPopUp] = useState(true);
    const navigate = useNavigate();
    const handleSearchByName = () => {
        // Perform search by name logic
        // Update the main page with the search results
    };

    const handleSearchById = () => {

        // Perform search by ID logic
        // Update the main page with the search results

        setShowSearchPopUp(false);
        navigate('/resultbyid');
    };

    if (!showSearchPopUp) {
        return <Navigate to="/resultbyid" replace />;
    }

    return (
        <div className="flex justify-center items-center h-screen grid place-items-center">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSearchByName();
                }}
                className="w-full max-w-sm"
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
                            // value={name}
                            // onChange={(e) => {
                            //     setName(e.target.value);
                            // }}
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
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
                </div>
                <div className="flex justify-center">
                    <Button variant="secondary" onClick={handleSearchById}>
                        Search By ID
                    </Button>
                    <Button type="submit" variant="primary">
                        Search By Name
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SearchPopUp;
