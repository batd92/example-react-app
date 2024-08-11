import React from 'react';
import { Icon } from '@chakra-ui/react';
import { MdPerson, MdLock, MdOutlineFreeBreakfast, MdOutlineHighlight } from 'react-icons/md';

// Admin Imports
import NFTMarketplace from './views/admin/marketplace';
import Profile from './views/admin/profile';
import SignInCentered from './views/auth/signIn';
import Course from './views/admin/course';

const routes = [
    {
        name: 'NFT Vocabulary',
        layout: '/admin',
        path: '/nft-marketplace',
        icon: (
            <Icon
                as={MdOutlineFreeBreakfast}
                width="20px"
                height="20px"
                color="inherit"
            />
        ),
        component: <NFTMarketplace />,
        secondary: true,
    },
    {
        name: 'Profile',
        layout: '/admin',
        path: '/profile',
        icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
        component: <Profile />,
    },
    {
        name: 'Sign In',
        layout: '/auth',
        path: '/sign-in',
        icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
        component: <SignInCentered />,
    },
    {
        name: 'Course',
        layout: '/admin',
        path: '/course/:courseId',
        icon: <Icon as={MdOutlineHighlight} width="20px" height="20px" color="inherit" />,
        component: <Course />,
    },
];

export default routes;
