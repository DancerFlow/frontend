import { Outlet } from 'react-router-dom';
import NavBar from './Navbar';

export default function Rootlayout() {
    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
        </>
    );
}
