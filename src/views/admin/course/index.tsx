import { Box, Flex, Grid, Icon, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

// Assets
import banner from '../../../assets/img/auth/banner.png';
import avatar from '../../../assets/img/avatars/avatar4.png';
import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import GameOption from './components/GameOption';
import GameInquery from './components/GameInquery';

export default function Overview() {
    const navigate = useNavigate();
	const { courseId } = useParams(); 
    return (
        <>
            <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
                <Flex
                    align='center'
                    ps={{ base: '25px', lg: '0px' }}
                    pt={{ lg: '0px', xl: '0px' }}
                    w='fit-content'
                    mb='20px'
                >
                    <Icon
                        as={FaChevronLeft}
                        me='12px'
                        h='13px'
                        w='8px'
                        color='secondaryGray.600'
                        onClick={() => navigate(-1)}
                    />
                    <Text ms='0px' fontSize='sm' color='secondaryGray.600'>
                        Back
                    </Text>
                </Flex>
                <Grid
                    templateColumns='1fr'
                    templateRows='1fr'
                    gap='20px'
                >
                    <GameInquery
                        gridColumn='1 / -1'
                        banner={banner}
                        avatar={avatar}
                        name='Adela Parkson'
                        job='Product Designer'
                        posts='17'
                        followers='9.7k'
                        following='274'
                    />
                </Grid>
            </Box>
        </>
    );
}
