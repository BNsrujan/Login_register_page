import { NavLink } from 'react-router';
function Dashboard() {
    return (
        <div className='h-screen  '>
            <nav className='flex text-black gap-8  p-6 px-20   '>
                <div className='flex px-6 '>
                    <NavLink to="/" >
                        Home
                    </NavLink>
                </div>
                <div className='flex justify-end tracking-wider gap-4 ml-auto '>
                    <NavLink to='/login'>Login</NavLink>
                    <NavLink to='/signUp'>signup</NavLink>
                </div>
            </nav>
        </div>
    )
}

export default Dashboard
