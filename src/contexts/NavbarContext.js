import React, { createContext, useContext, useState } from 'react';
const NavbarContext = createContext();

// This function shares the context between the Navbar and the Kanban Board
export const NavbarProvider = ({ children }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isGroupingMenuVisible, setIsGroupingMenuVisible] = useState(false);
    const [isOrderingMenuVisible, setIsOrderingMenuVisible] = useState(false);
    const [groupingOption, setGroupingOption] = useState("Status");
    const [orderingOption, setOrderingOption] = useState("Priority");
  
    const toggleMenu = () => setIsMenuVisible(prev => !prev);
    const toggleGroupingMenu = () => setIsGroupingMenuVisible(prev => !prev);
    const toggleOrderingMenu = () => setIsOrderingMenuVisible(prev => !prev);
    
    const changeGroupingOption = (option) => {
      setGroupingOption(option);
      toggleGroupingMenu();
    };
    
    const changeOrderingOption = (option) => {
      setOrderingOption(option);
      toggleOrderingMenu();
    };
  
    return (
      <NavbarContext.Provider value={{
        isMenuVisible, toggleMenu,
        isGroupingMenuVisible, toggleGroupingMenu, changeGroupingOption, groupingOption,
        isOrderingMenuVisible, toggleOrderingMenu, changeOrderingOption, orderingOption
      }}>
        {children}
      </NavbarContext.Provider>
    );
  };

  export const useNavbarContext = () => useContext(NavbarContext);