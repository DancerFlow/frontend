import { Outlet } from 'react-router-dom';
import { useState, useRef } from 'react';
import NavBar from '../components/Navbar';
import BgmPlayer from '../components/BgmPlayer';

export default function Rootlayout() {
    return (
        <>
            <NavBar></NavBar>
            <BgmPlayer></BgmPlayer>
            <main>
                <Outlet />
            </main>
        </>
    );
}
