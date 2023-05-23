import '../index.css';
import Author from '../components/Author';
import { useState } from 'react';


function Authors() {
    const [authors,setAuthors] = useState([
        {
            id: 1,
            name: 'John Doe',
            age: 25,
            occupation: 'Developer',
            img: 'https://images.pexels.com/photos/3760583/pexels-photo-3760583.jpeg',
        },
        {
            id: 2,
            name: 'Jane Smith',
            age: 30,
            occupation: 'Designer',
            img: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
        },
        {
            id: 2,
            name: 'Jane Smith',
            age: 30,
            occupation: 'Designer',
            img: 'https://images.pexels.com/photos/2225298/pexels-photo-2225298.jpeg',
        },       
    ]);

    return (
        <div className="">
                <>
                    <div className="flex flex-wrap justify-center">
                        {authors.map((author) => {                            
                            return (
                                <Author
                                    id={author.id}
                                    name={author.name}
                                    age={author.age}
                                    occupation={author.occupation}
                                    img={author.img}                                    
                                />
                            );
                        })}
                    </div>                    
                </>            
        </div>
    );
}

export default Authors;
