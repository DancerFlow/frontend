import { Outlet } from 'react-router-dom';
<<<<<<< HEAD
import { useState, useRef } from 'react';
import NavBar from '../components/Navbar';
import BgmPlayer from '../components/BgmPlayer';
=======
import NavBar from './Navbar';
>>>>>>> upstream/dev

export default function Rootlayout() {
    return (
        <>
<<<<<<< HEAD
            <NavBar></NavBar>
            <BgmPlayer></BgmPlayer>
=======
            <NavBar />
>>>>>>> upstream/dev
            <main>
                <Outlet />
            </main>
        </>
    );
}
