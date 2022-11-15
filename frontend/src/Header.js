import React, { useContext } from "react";
import { ThemeContext } from "./contexts";
import {Link} from 'react-router-dom';

const Header = ({ title }) => {
  const { primaryColor } = useContext(ThemeContext);
  return <Link href="/"><h1 style={{ color: primaryColor }}>{title}</h1></Link>;
};

export default Header;
