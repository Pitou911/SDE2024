import React, { useEffect, useRef, useState } from "react";
import "./Nav.css";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "./../assets/imgs/logo.png";
import { Link } from "react-router-dom";
import user from "./../assets/imgs/user.png"
export default function Nav({ isAuthenticated }) {
  
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const navRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        handleCloseNav();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const navBarHandler = () => {
    setIsButtonClicked(!isButtonClicked);
  };
  const handleCloseNav = () => {
    setIsButtonClicked(false);
  };
  return (
    <header className='navbar--header'>
      <div className='navbar'>
        <div className='navbar__logo'>
          <div className='navbar__logo--img'>
            <Link to='/'>
              <img src={logo} alt="logo-img"></img>
            </Link>
          </div>
          <div className='navbar__logo--title title'>
            <Link to='/'>
              <h2>CareNest</h2>
            </Link>
          </div>
        </div>
        <ul className='navbar__lists'>
          <li className='navbar__list title'>
            <Link to='/'>Home</Link>
          </li>
          <li className='navbar__list title'>
            <Link to='/cases'>Cases</Link>
          </li>
          <li className='navbar__list title'>
            <Link to='/about'>About us</Link>
          </li>
          {
            isAuthenticated ? (
              <li className='navbar__list'>
                <Link to='/profile'><img alt="user-img" src={user}></img></Link>
              </li>
            ) : (
              <li className='navbar__list title'>
                <Link to='/login'>Log in</Link>
              </li>
            )
          }
          
        </ul>
        <div className='toggle_btn'>
          {!isButtonClicked ? (
            <FontAwesomeIcon icon={faBars} onClick={navBarHandler} />
          ) : (
            <FontAwesomeIcon icon={faXmark} onClick={navBarHandler} />
          )}
        </div>
        <div className={`dropdown_menu ${isButtonClicked ? "open" : ""}`}>
            <li className='navbar__list title'>
              <Link to='/' onClick={() => {
              navBarHandler();
            }}>Home</Link>
            </li>
            <li className='navbar__list title'>
              <Link to='/cases' onClick={() => {
              navBarHandler();
            }}>Cases</Link>
            </li>
            <li className='navbar__list title'>
              <Link to='/about' onClick={() => {
              navBarHandler();
            }}>About us</Link>
            </li>
            {
            isAuthenticated ? (
              <li className='navbar__list'>
                <Link to='/profile' onClick={() => {
              navBarHandler();
            }}><img alt="user-img" src={user}></img></Link>
              </li>
            ) : (
              <li className='navbar__list title'>
                <Link to='/login' onClick={() => {
              navBarHandler();
            }}>Log in</Link>
              </li>
            )
          }
        </div>
      </div>
    </header>
  );
}
