import React, {useState} from 'react';
import '../styles/Navbar.css';
import icon from '../assets/Display.svg';
import arrow from '../assets/down.svg';
import { useNavbarContext } from '../contexts/NavbarContext';
import '../styles/Menu.css'

export default function Navbar() {
  const {
    isMenuVisible, toggleMenu,
    isGroupingMenuVisible, toggleGroupingMenu, changeGroupingOption, groupingOption,
    isOrderingMenuVisible, toggleOrderingMenu, changeOrderingOption, orderingOption
  } = useNavbarContext();
  return (
    <div className="navbar">
      <button className="display-button" onClick={toggleMenu}>
        <img src={icon} alt="icon" className="display-button-icon" />
        Display 
        <img src={arrow} alt="dropdown" className="display-button-arrow" /> 
      </button>
      <div className={`menu ${isMenuVisible ? 'menu-visible' : 'menu-hidden'}`}>
        <div className="menu-row">
          <span className="menu-row-label">Grouping</span>
          <div className="menu-dropdown-container">
            <span className="menu-dropdown-text" onClick={toggleGroupingMenu}>{groupingOption}</span>
            <img src={arrow} alt="dropdown" className="menu-arrow" onClick={toggleGroupingMenu}/>
          </div>
          <div className={`grouping-menu ${isGroupingMenuVisible ? 'grouping-menu-visible' : 'grouping-menu-hidden'}`}>
            <div className="inner-item" onClick={() => {changeGroupingOption("Status")}}>Status</div>
            <div className="inner-separator"></div>
            <div className="inner-item" onClick={() => {changeGroupingOption("User")}}>User</div>
            <div className="inner-separator"></div>
            <div className="inner-item" onClick={() => {changeGroupingOption("Priority")}}>Priority</div>
          </div>
        </div>
        <div className="menu-row">
          <span className="menu-row-label">Ordering</span>
          <div className="menu-dropdown-container">
            <span className="menu-dropdown-text" onClick={toggleOrderingMenu}>{orderingOption }</span>
            <img src={arrow} alt="dropdown" className="menu-arrow" onClick={toggleOrderingMenu}/>
          </div>
          <div className={`ordering-menu ${isOrderingMenuVisible ? 'ordering-menu-visible' : 'ordering-menu-hidden'}`}>
            <div className="inner-item" onClick={() => {changeOrderingOption("Title")}}>Title</div>
            <div className="inner-separator"></div>
            <div className="inner-item" onClick={() => {changeOrderingOption("Priority")}}>Priority</div>
          </div>
        </div>
      </div>
    </div>
  );
}
