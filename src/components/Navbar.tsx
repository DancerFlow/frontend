import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function NavBar() {
    const [open, setOpen] = useState(false);
    const navRef = useRef(null);
    const toggleButtonRef = useRef(null);

    const handleToggle = () => {
        setOpen(!open);
    };

    // toggle button 아니거나, SideNavbar 바깥 영역 클릭 했을 때, SideNavbar 닫기
    const handleDocumentClick = (e) => {
        if (navRef.current && !navRef.current.contains(e.target) && e.target !== toggleButtonRef.current) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const navLinks = [
        { to: 'challenge', text: 'login' },
        { to: '', text: 'main' },
        { to: 'mode', text: 'select mode' },
        { to: 'musiclist', text: 'music list' },
        { to: 'user', text: 'my page' },
        { to: 'admin', text: 'admin' },
        { to: 'result', text: 'result' }
    ];

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
                            <ul>
                                {navLinks.map((navLink, index) => (
                                    <li key={index} onClick={() => setOpen(false)}>
                                        <NavLink to={navLink.to}>{navLink.text}</NavLink>
                                    </li>
                                ))}
                            </ul>
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
    background-color: ${(props) => props.theme.pink};
    padding: 0.5rem 0.6rem;
    border-radius: 5px;
    cursor: pointer;
`;

const SideNav = styled.aside`
    position: fixed;
    z-index: 2000;
    background-color: ${(props) => props.theme.pink};
    top: 0;
    left: 0;
    bottom: 0;
    width: 200px;

    button {
        border: none;
        background-color: none;
    }

    ul {
        list-style: none;
        text-align: start;

        li {
            margin: 1.5rem;
        }
    }

    a {
        text-decoration: none;
    }

    a.active {
        text-decoration: underline;
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
`;
const CloseFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: #ffffff;
    cursor: pointer;
`;
