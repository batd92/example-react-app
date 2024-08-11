import { Box, useDisclosure } from '@chakra-ui/react';
import Navbar from '../../components/navbar/NavbarAdmin';
import Sidebar from '../../components/sidebar/Sidebar';
import { SidebarContext } from '../../contexts/SidebarContext';
import { useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import routes from '../../routes';
import React from 'react';

export default function AdminLayout(props: { [x: string]: any }) {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const { onOpen } = useDisclosure();
    const location = useLocation();

    const getRoutes = () => {
        return routes.map((route, key) => {
            if (route.layout === '/admin') {
                return <Route path={route.path} element={route.component} key={key} />;
            }
            return null;
        });
    };

    const getActiveRouteName = () => {
        const activeRoute = routes.find(
            (route) => location.pathname.includes(route.layout + route.path)
        );
        return activeRoute ? activeRoute.name : '';
    };

    return (
        <SidebarContext.Provider value={{ toggleSidebar, setToggleSidebar }}>
            <Sidebar routes={routes} {...props} />
            <Box
                float="right"
                minHeight="100vh"
                w={{ base: '100%', xl: 'calc(100% - 250px)' }}
                transition="all 0.33s ease"
            >
                <Navbar
                    secondary={false} message={''} logoText={''} fixed={false} onOpen={onOpen}
                    brandText={getActiveRouteName()}
                    {...props}
                />
                <Box p={{ base: '20px', md: '30px' }} pt="50px">
                    <Routes>
                        {getRoutes()}
                        <Route path="/" element={<Navigate to="/admin/nft-marketplace" replace />} />
                    </Routes>
                </Box>
            </Box>
        </SidebarContext.Provider>
    );
}
