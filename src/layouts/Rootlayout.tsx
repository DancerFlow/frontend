import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './Navbar';
import BgmPlayer from './BgmPlayer';
import { BgmContextProvider } from '../context/BgmContext';
export default function Rootlayout() {
    const location = useLocation();
    const isModePage = location.pathname === '/mode';

    return (
        <>
            <NavBar />
            <BgmContextProvider>{!isModePage && <BgmPlayer />}</BgmContextProvider>
            <main>
                <Outlet />
            </main>
        </>
    );
}
