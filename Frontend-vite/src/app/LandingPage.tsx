import { NavLink } from 'react-router';
import { fetchProtectedData } from '../lib/auth';
import { useEffect, useState } from 'react';

function LandingPage() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const fetchedData = await fetchProtectedData();
            setData(fetchedData);
        }
        getData();
    }, []);

    return (
        <div className='h-screen'>
            <nav className='flex text-black gap-8  p-6 px-20   '>
                <div className='flex px-6 '>
                    <NavLink to="/" >
                        Home
                    </NavLink>
                </div>
                <div className='flex justify-end tracking-wider gap-4 ml-auto '>
                    <NavLink to='/login'>Login</NavLink>
                    <NavLink to='/signup'>signup</NavLink>
                </div>
            </nav>
            {data && <div>{JSON.stringify(data)}</div>}
        </div>
    )
}

export default LandingPage
