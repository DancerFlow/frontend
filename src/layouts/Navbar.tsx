import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import NavUserInfo from './NavUserInfo';
import { useContext } from 'react';

import { GlobalContext } from '../context/Context';
import { useDeleteLogoutMutation } from '../api/useDeleteLogoutMutation';

export default function NavBar() {
    const [open, setOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const toggleButtonRef = useRef(null);
    const { state, logOut } = useContext(GlobalContext);

    const navigate = useNavigate();
    const { mutate } = useDeleteLogoutMutation();

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    // 토글보다 handleDocumentClick이 먼저 실행되서 바로 닫히는 오류 떄문에 setTimeout 넣어줌.
    const handleToggle = () => {
        setTimeout(() => {
            setOpen(!open);
        }, 0);
    };

    // toggle button 아니거나, SideNavbar 바깥 영역 클릭 했을 때, SideNavbar 닫기
    const handleDocumentClick = (e: MouseEvent) => {
        if (navRef.current && !navRef.current.contains(e.target as Node) && e.target !== toggleButtonRef.current) {
            setOpen(false);
        }
    };

    const handleLogout = () => {
        mutate();
        logOut();
        setOpen(false);
        navigate('/');
    };

    const navLinks = [
        { to: '', text: 'Home' },
        { to: 'mode', text: 'Select Mode' },
        { to: 'musiclist/challenge', text: 'Challenge' },
        { to: 'musiclist/practice', text: 'Practice' },
        { to: 'user', text: 'My Page' }
    ];

    if (!state.userState.login) {
        navLinks.pop();
    }

    return (
        <>
            <Nav>
                <Button ref={toggleButtonRef} onClick={handleToggle}>
                    <FontAwesomeIcon icon={faBars} style={{ color: '#ffffff' }} />
                </Button>
            </Nav>
            <TransitionGroup>
                {open && (
                    <CSSTransition in={open} classNames="sidenav" timeout={200} unmountOnExit={true}>
                        <SideNav ref={navRef}>
                            <IconWrapper>
                                <CloseFontAwesomeIcon icon={faXmark} size="2xl" onClick={handleToggle} />
                            </IconWrapper>
                            <NavUserInfo onLogout={handleLogout} isLogin={state.userState.login} />
                            <ul>
                                {navLinks.map((navLink, index) => (
                                    <li key={index} onClick={() => setOpen(false)}>
                                        <NavLink to={navLink.to}>
                                            <span>{navLink.text}</span>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                            <ul className="contact us"></ul>
                        </SideNav>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </>
    );
}

const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 1rem;
`;

const Button = styled.button`
    position: fixed;
    top: 1rem;
    left: 1.5rem;
    border: 0;
    background-color: ${(props) => props.theme.green};
    padding: 0.5rem 0.6rem;
    border-radius: 5px;
    cursor: pointer;
`;

const SideNav = styled.aside`
    position: fixed;
    z-index: 2000;
    background-color: ${(props) => props.theme.blue};
    top: 0;
    left: 0;
    bottom: 0;
    width: 310px;
    border-right: 1.5px solid ${(props) => props.theme.green};
    button {
        border: none;
        background-color: none;
    }

    ul {
        list-style: none;
        text-align: start;
    }

    a {
        span {
            font-size: 36px;
            font-family: 'NanumSquareNeoHeavy';
            color: ${(props) => props.theme.green};
            transition: letter-spacing 0.3s ease-in-out;
        }
        span:hover {
            letter-spacing: 1.5px;
        }
        transform: skew(-6deg);
        display: block;
        text-decoration: none;
        padding: 1rem 1.5rem;
    }

    a.active {
        span {
            -webkit-text-stroke: 1.5px #27fd1c;
            color: transparent;
            text-decoration-line: underline;
            text-underline-offset: 7px;
        }
    }

    &.sidenav-enter {
        transform: translateX(-100%);
    }

    &.sidenav-enter-active {
        transform: translateX(0);
        transition: transform 300ms ease-in-out;
    }

    &.sidenav-exit {
        transform: translateX(0);
    }

    &.sidenav-exit-active {
        transform: translateX(-100%);
        transition: transform 300ms ease-in-out;
    }
`;

const IconWrapper = styled.div`
    text-align: start;
    margin: 1rem 1.5rem;
    padding-bottom: 10px;
`;
const CloseFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.green};
    cursor: pointer;
`;
