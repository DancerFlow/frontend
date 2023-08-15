import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './Navbar';
import BgmPlayer from './BgmPlayer';

export default function Rootlayout() {
    const location = useLocation();
    const isModePage = location.pathname === '/mode';

    return (
        <>
            <NavBar />
            {!isModePage && <BgmPlayer />}
            <main>
                <Outlet />
            </main>
        </>
    );
}
