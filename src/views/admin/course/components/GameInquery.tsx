import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
	Avatar,
	Box,
	Flex,
	Text,
	useColorModeValue,
	Button,
	SimpleGrid,
	Progress,
	TableContainer,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useToast,
	Input
} from '@chakra-ui/react';
import Card from '../../../../components/card/Card';

interface Flashcard {
	question: string;
	answer: string;
}

const TIME_SEC = 5;

// Fake flashcards data
const fakeFlashcards: Flashcard[] = [
	{ question: 'What is the capital of Germany?', answer: 'Berlin' },
	{ question: 'Which planet is known as the Red Planet?', answer: 'Mars' },
	{ question: 'Who wrote "To Kill a Mockingbird"?', answer: 'Harper Lee' },
	{ question: 'What is the largest ocean on Earth?', answer: 'Pacific Ocean' }
];

const GameInquiry = (props: {
	banner: string;
	avatar: string;
	name: string;
	job: string;
	posts: number | string;
	followers: number | string;
	following: number | string;
	[x: string]: any;
}) => {
	const { banner, avatar, name, job, posts, followers, following, ...rest } = props;
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'gray.400';
	const borderColor = useColorModeValue('white !important', '#111C44 !important');
	const toast = useToast();

	const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
	const [userInput, setUserInput] = useState<string>('');
	const [isAnswerShown, setIsAnswerShown] = useState<boolean>(false);
	const [answeredCount, setAnsweredCount] = useState(0);
	const [showResult, setShowResult] = useState(false);
	const [timer, setTimer] = useState(TIME_SEC);
	const [results, setResults] = useState<{ question: string; input: string; answer: string }[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);

	const currentFlashcard = fakeFlashcards[currentFlashcardIndex] || { question: '', answer: '' };

	// Focus the input field when the flashcard or answer state changes
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [currentFlashcardIndex, isAnswerShown]);

	// Function to move to the next flashcard
	const handleNextFlashcard = useCallback(() => {
		if (currentFlashcardIndex === fakeFlashcards.length - 1) {
			setShowResult(true);
		} else {
			setCurrentFlashcardIndex(prevIndex => prevIndex + 1);
			setTimer(TIME_SEC);
			setIsAnswerShown(false);
			setUserInput('');
		}
	}, [currentFlashcardIndex]);

	// Handle the timer countdown and auto move to the next flashcard
	useEffect(() => {
		if (timer > 0 && !isAnswerShown && !showResult) {
			const countdown = setInterval(() => {
				setTimer(prevTimer => prevTimer - 1);
			}, 1000);

			return () => clearInterval(countdown);
		} else if (timer === 0 && !isAnswerShown && !showResult) {
			handleNextFlashcard();
		}
	}, [timer, isAnswerShown, showResult, handleNextFlashcard]);

	// Handle input field changes
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserInput(event.target.value);
	};

	// Function to handle flashcard submission
	const handleSubmit = useCallback(() => {
		const isCorrect = userInput.trim().toLowerCase() === currentFlashcard.answer.toLowerCase();
		if (isCorrect) {
			setAnsweredCount(prevCount => prevCount + 1);
		}

		setResults(prevResults => [
			...prevResults,
			{ question: currentFlashcard.question, input: userInput, answer: currentFlashcard.answer }
		]);

		handleNextFlashcard();
	}, [userInput, currentFlashcard, handleNextFlashcard]);

	// Start a new game
	const handlePlayClick = () => {
		setCurrentFlashcardIndex(0);
		setUserInput('');
		setShowResult(false);
		setAnsweredCount(0);
		setTimer(TIME_SEC);
		setResults([]);
	};

	// Add event listener for Enter key press
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				handleSubmit();
			}
		};

		document.addEventListener('keydown', handleKeyPress);
		return () => document.removeEventListener('keydown', handleKeyPress);
	}, [handleSubmit]);

	// Show result toast when the game ends
	useEffect(() => {
		if (showResult) {
			toast({
				title: `Game Over!`,
				description: `You answered ${answeredCount} out of ${fakeFlashcards.length} questions correctly.`,
				status: 'success',
				duration: 5000,
				isClosable: true,
				position: 'top',
			});
		}
	}, [showResult, answeredCount, fakeFlashcards.length, toast]);

	return (
		<Flex direction="row" width="100%" gap="20px" {...rest}>
			<Box width={{ base: '100%', md: '33.33%' }} mb="20px">
				<SimpleGrid columns={{ base: 1, md: 1 }} spacing="20px" mb="20px">
					<Card mb="10px" alignItems="center" width="100%">
						<Flex direction="row" justify="space-between" align="center" width="100%" p="20px">
							<Flex direction="column" align="center">
								<Avatar
									src={avatar}
									h="60px"
									w="60px"
									mt="-40px"
									border="4px solid"
									borderColor={borderColor}
								/>
								<Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
									{name}
								</Text>
								<Text color={textColorSecondary} fontSize="sm">
									{job}
								</Text>
							</Flex>
							<Flex direction="row" justify="space-between" align="center">
								<Flex direction="column" align="center" p="10px">
									<Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
										{answeredCount} /
									</Text>
								</Flex>
								<Flex direction="column" align="center" p="10px">
									<Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
										{fakeFlashcards.length}
									</Text>
								</Flex>
							</Flex>
						</Flex>
					</Card>
					{showResult && (
						<TableContainer>
							<Table size='sm'>
								<Thead>
									<Tr>
										<Th>Question</Th>
										<Th>Input</Th>
										<Th>Answer</Th>
									</Tr>
								</Thead>
								<Tbody>
									{results.map((result, index) => {
										const isCorrect = result.input.trim().toLowerCase() === result.answer.toLowerCase();
										return (
											<Tr key={index}>
												<Td>{result.question}</Td>
												<Td color={!isCorrect ? 'red.400' : undefined}>{result.input}</Td>
												<Td color={!isCorrect ? 'red.400' : undefined}>{result.answer}</Td>
											</Tr>
										);
									})}
								</Tbody>
							</Table>
						</TableContainer>
					)}
				</SimpleGrid>
			</Box>

			<Box width={{ base: '100%', md: '66.67%' }} mb="20px">
				<Card mb={{ base: '10px', lg: '20px' }} p='20px' width='100%'>
					{showResult ? (
						<Box textAlign='center'>
							<Text fontSize='xl' mb='10px'>Game Over!</Text>
							<Button ml='10px' colorScheme='blue' onClick={handlePlayClick}>
								Play Again
							</Button>
						</Box>
					) : (
						<>
							{currentFlashcard && (
								<>
									<Box mb='10px'>
										<Text fontSize='lg' fontWeight='bold' mt='25px' mb='25px'>
											{currentFlashcard.question}
										</Text>
										<Progress value={(timer / TIME_SEC) * 100} size='sm' colorScheme='blue' width={500} height={5} />
										<Text mt='10px' color='gray.500'>
											Left: {timer}s
										</Text>
									</Box>
									<Input
										mt='25px' mb='25px'
										height="50px"
										ref={inputRef}
										placeholder='Type your answer here...'
										value={userInput}
										onChange={handleInputChange}
										fontSize={15}
										color="white"
									/>
								</>
							)}
						</>
					)}
				</Card>
			</Box>
		</Flex>
	);
};

export default GameInquiry;
