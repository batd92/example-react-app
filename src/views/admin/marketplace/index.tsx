import React, { useState } from 'react';
import {
    Box,
    Flex,
    Grid,
    Link,
    Text,
    useColorModeValue,
    SimpleGrid,
} from '@chakra-ui/react';
import NFT from '../../../components/card/NFT';

// Assets
import Nft1 from '../../../assets/img/nfts/Nft1.png';
import Nft2 from '../../../assets/img/nfts/Nft2.png';
import Nft3 from '../../../assets/img/nfts/Nft3.png';
import Nft4 from '../../../assets/img/nfts/Nft4.png';
import Nft5 from '../../../assets/img/nfts/Nft5.png';
import Nft6 from '../../../assets/img/nfts/Nft6.png';

export default function Marketplace() {
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const textColorBrand = useColorModeValue('brand.500', 'white');

    const [selectedCategory, setSelectedCategory] = useState("All");

    const nftData = [
        {
            name: "Abstract Colors",
            author: "By Esthera Jackson",
            image: Nft1,
            download: "#",
            category: "Art",
        },
        {
            name: "ETH AI Brain",
            author: "By Nick Wilson",
            image: Nft2,
            download: "#",
            category: "Art",
        },
        {
            name: "Mesh Gradients",
            author: "By Will Smith",
            image: Nft3,
            download: "#",
            category: "Music",
        },
        {
            name: "Swipe Circles",
            author: "By Peter Will",
            image: Nft4,
            download: "#",
            category: "Collectibles",
        },
        {
            name: "Colorful Heaven",
            author: "By Mark Benjamin",
            image: Nft5,
            currentbid: "0.91 ETH",
            download: "#",
            category: "Sports",
        },
        {
            name: "3D Cubes Art",
            author: "By Manny Gates",
            image: Nft6,
            download: "#",
            category: "Art",
        },
    ];

    const linkData = [
        { text: "All", href: "#all" },
        { text: "Art", href: "#art" },
        { text: "Music", href: "#music" },
        { text: "Collectibles", href: "#collectibles" },
        { text: "Sports", href: "#sports" },
    ];

    const filteredNftData = selectedCategory === "All" 
        ? nftData 
        : nftData.filter(nft => nft.category === selectedCategory);

    return (
        <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
            <Grid
                mb="20px"
                gridTemplateColumns={{ xl: '1fr' }}
                gap={{ base: '20px', xl: '20px' }}
                display="block"
            >
                <Flex flexDirection="column">
                    <Flex direction="column">
                        <Flex
                            mt="45px"
                            mb="20px"
                            justifyContent="space-between"
                            direction={{ base: 'column', md: 'row' }}
                            align={{ base: 'start', md: 'center' }}
                        >
                            <Text
                                color={textColor}
                                fontSize="2xl"
                                ms="24px"
                                fontWeight="700"
                            >
                                Knowledge
                            </Text>
                            <Flex
                                align="center"
                                me="20px"
                                ms={{ base: '24px', md: '0px' }}
                                mt={{ base: '20px', md: '0px' }}
                            >
                                {linkData.map((link, index) => (
                                    <Link
                                        key={index}
                                        color={textColorBrand}
                                        fontWeight="500"
                                        me={{ base: '34px', md: '44px' }}
                                        href={link.href}
                                        onClick={() => setSelectedCategory(link.text)}
                                    >
                                        {link.text}
                                    </Link>
                                ))}
                            </Flex>
                        </Flex>
                        <SimpleGrid columns={{ base: 1, md: 5 }} gap="20px">
                            {filteredNftData.map((nft, index) => (
                                <NFT
                                    key={index}
                                    name={nft.name}
                                    author={nft.author}
                                    image={nft.image}
                                    download={nft.download}
                                />
                            ))}
                        </SimpleGrid>
                    </Flex>
                </Flex>
            </Grid>
        </Box>
    );
}
