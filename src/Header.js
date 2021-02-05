import { AppBar, Toolbar } from "@material-ui/core";
import React from "react"
import './App.css'

export default function Header() {
  const displayDesktop = () => {
    return <Toolbar className='header'>MyReads</Toolbar>;
  };

  return <header>
      <AppBar>{displayDesktop()}</AppBar>
    </header>;
}
