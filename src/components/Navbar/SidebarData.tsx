import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as Feather from "react-icons/fi"
import { FiUsers } from "react-icons/fi"

export const SidebarData = [
    {
        title: 'Home',
        path: '/dashboard',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Users',
        path: '/users',
        icon: <Feather.FiUsers />,
        cName: 'nav-text'
    },
    {
        title: 'Posts',
        path: '/posts',
        icon: <FaIcons.FaNewspaper />,
        cName: 'nav-text'
    }
]