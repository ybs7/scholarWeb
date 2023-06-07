import React from 'react';

function ResultByID() {
    const profiles = [
        {
            id: 1,
            name: 'John Doe',
            age: 25,
            occupation: 'Developer',
        },
        {
            id: 2,
            name: 'Jane Smith',
            age: 30,
            occupation: 'Designer',
        },
        {
            id: 2,
            name: 'Jane Smith',
            age: 30,
            occupation: 'Designer',
        },
        {
            id: 2,
            name: 'Jane Smith',
            age: 30,
            occupation: 'Designer',
        },
        {
            id: 2,
            name: 'Jane Smith',
            age: 30,
            occupation: 'Designer',
        },
        {
            id: 2,
            name: 'Jane Smith',
            age: 30,
            occupation: 'Designer',
        },
        {
            id: 2,
            name: 'Jane Smith',
            age: 30,
            occupation: 'Designer',
        },
        {
            id: 2,
            name: 'Jane Smith',
            age: 30,
            occupation: 'Designer',
        },
        {
            id: 2,
            name: 'Jane Smith',
            age: 30,
            occupation: 'Designer',
        },
        {
            id: 2,
            name: 'Jane Smith',
            age: 30,
            occupation: 'Designer',
        },
        {
            id: 2,
            name: 'Jane Smith',
            age: 30,
            occupation: 'Designer',
        },
        {
            id: 2,
            name: 'Jane Smith',
            age: 30,
            occupation: 'Designer',
        },
        {
            id: 2,
            name: 'Jane Smith',
            age: 30,
            occupation: 'Designer',
        },
        {
            id: 2,
            name: 'Jane Smith',
            age: 30,
            occupation: 'Designer',
        },
        {
            id: 2,
            name: 'Jane Smith',
            age: 30,
            occupation: 'Designer',
        },
        {
            id: 2,
            name: 'Jane Smith',
            age: 30,
            occupation: 'Designer',
        },
        {
            id: 2,
            name: 'Jane Smith',
            age: 30,
            occupation: 'Designer',
        },{
            id: 2,
            name: 'Jane Smith',
            age: 30,
            occupation: 'Designer',
        },

        // Add more profiles here
    ];

    return (
        <div>
            <h1>Profiles</h1>

            <div className="card-container ">
                {profiles.map((profile) => (
                    <div key={profile.id} className="card">
                        <h2>{profile.name}</h2>
                        <p>Age: {profile.age}</p>
                        <p>Occupation: {profile.occupation}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ResultByID;
