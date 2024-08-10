import {
	Box,
	Button,
	Flex,
	Icon,
	Image,
	Link,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import Card from './Card';
import { useState } from 'react';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import React from 'react';

export default function NFT(props: {
	image: string;
	name: string;
	author: string;
	download: string;
}) {
	const { image, name, author, download } = props;
	const [like, setLike] = useState(false);
	const textColor = useColorModeValue('navy.700', 'white');

	return (
		<Card p='20px'>
			<Flex direction='column' justify='center'>
				<Box mb='20px' position='relative'>
					<Image
						src={image}
						w='100%'
						h='100%'
						borderRadius='20px'
					/>
					<Button
						position='absolute'
						bg='white'
						_hover={{ bg: 'whiteAlpha.900' }}
						_active={{ bg: 'white' }}
						_focus={{ bg: 'white' }}
						p='0px !important'
						top='14px'
						right='14px'
						borderRadius='50%'
						minW='36px'
						h='36px'
						onClick={() => {
							setLike(!like);
						}}
					>
						<Icon
							transition='0.2s linear'
							w='20px'
							h='20px'
							as={like ? IoHeart : IoHeartOutline}
							color='brand.500'
						/>
					</Button>
				</Box>

				<Flex flexDirection='column' justify='space-between' h='100%'>
					<Flex
						justify='space-between'
						direction='column'
						mb='auto'
					>
						<Flex direction='column' textAlign='center'>
							<Text
								color={textColor}
								fontSize='lg'
								mb='5px'
								fontWeight='bold'
							>
								{name}
							</Text>
							<Text
								color='secondaryGray.600'
								fontSize='sm'
								fontWeight='400'
							>
								{author}
							</Text>
						</Flex>
					</Flex>

					<Flex
						alignItems='center'
						justifyContent='center'
						mt='25px'
					>
						<Link href={download}>
							<Button
								variant='darkBrand'
								color='white'
								fontSize='sm'
								fontWeight='500'
								borderRadius='70px'
								px='24px'
								py='5px'
							>
								Place Bid
							</Button>
						</Link>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
}
