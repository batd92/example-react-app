import React from 'react';
import { Icon } from '@chakra-ui/react';
import { MdPerson, MdLock, MdOutlineShoppingCart } from 'react-icons/md';

// Admin Imports
import NFTMarketplace from './views/admin/marketplace';
import Profile from './views/admin/profile';
import SignInCentered from './views/auth/signIn';

const routes = [
    {
        name: 'NFT Marketplace',
        layout: '/admin',
        path: '/nft-marketplace',
        icon: (
            <Icon
                as={MdOutlineShoppingCart}
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
];

export default routes;
