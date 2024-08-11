import React, { useState, useEffect, useMemo } from 'react';
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
	useToast
} from '@chakra-ui/react';
import Card from '../../../../components/card/Card';

interface Flashcard {
	question: string;
	answer: string;
}

const TIME_SEC = 5;
// Fake flashcards data
const fakeFlashcards: Flashcard[] = [
	{
		question: 'What is the capital of Germany?',
		answer: 'Berlin',
	},
	{
		question: 'Which planet is known as the Red Planet?',
		answer: 'Mars',
	},
	{
		question: 'Who wrote "To Kill a Mockingbird"?',
		answer: 'Harper Lee',
	},
	{
		question: '"To Kill a Mockingbird"?',
		answer: 'Harper',
	}
];

const generateOptions = (answer: string, allAnswers: string[]): string[] => {
	const options = new Set<string>([answer]);

	while (options.size < 4) {
		const randomAnswer = allAnswers[Math.floor(Math.random() * allAnswers.length)];
		options.add(randomAnswer);
	}

	const optionsArray = Array.from(options);

	for (let i = optionsArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[optionsArray[i], optionsArray[j]] = [optionsArray[j], optionsArray[i]];
	}

	return optionsArray;
};

const getAllAnswers = (flashcards: Flashcard[]): string[] => {
	return flashcards.map(card => card.answer);
};

// Component chính
export default function GameOption(props: {
	banner: string;
	avatar: string;
	name: string;
	job: string;
	posts: number | string;
	followers: number | string;
	following: number | string;
	[x: string]: any;
}) {
	const { banner, avatar, name, job, posts, followers, following, ...rest } = props;
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'gray.400';
	const borderColor = useColorModeValue('white !important', '#111C44 !important');
	const toast = useToast();

	const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
	const [selectedOption, setSelectedOption] = useState<string>('');
	const [isAnswerShown, setIsAnswerShown] = useState<boolean>(false);
	const [answeredCount, setAnsweredCount] = useState(0);
	const [showResult, setShowResult] = useState(false);
	const [timer, setTimer] = useState(TIME_SEC);
	const [results, setResults] = useState<{ question: string; selected: string; answer: string }[]>([]);


	const currentFlashcard = fakeFlashcards[currentFlashcardIndex] || { question: '', answer: '' };
	const allAnswers = useMemo(() => getAllAnswers(fakeFlashcards), []);
	const options = useMemo(() => {
		if (currentFlashcard) {
			return generateOptions(currentFlashcard.answer, allAnswers);
		}
		return [];
	}, [currentFlashcardIndex, currentFlashcard, allAnswers]);

	useEffect(() => {
		if (timer > 0 && !isAnswerShown) {
			const countdown = setInterval(() => {
				setTimer(prevTimer => prevTimer - 1);
			}, 1000);

			return () => clearInterval(countdown);
		} else if (timer === 0 && !isAnswerShown) {
			handleNextClick();
		}
	}, [timer, isAnswerShown]);

	const handleOptionClick = (option: string) => {
		if (isAnswerShown) return;

		setSelectedOption(option);
		setIsAnswerShown(true);

		if (option === currentFlashcard.answer) {
			setAnsweredCount(prevCount => prevCount + 1);
		}

		setResults(prevResults => [
			...prevResults,
			{ question: currentFlashcard.question, selected: option, answer: currentFlashcard.answer }
		]);

		setTimeout(() => {
			handleNextClick();
		}, 1000);
	};

	const handleNextClick = () => {
		if (currentFlashcardIndex === fakeFlashcards.length - 1) {
			setShowResult(true);
		} else {
			setSelectedOption('');
			setCurrentFlashcardIndex(prevIndex => prevIndex + 1);
			setTimer(TIME_SEC);
			setIsAnswerShown(false);
		}
	};

	const handlePlayClick = () => {
		setCurrentFlashcardIndex(0);
		setSelectedOption('');
		setShowResult(false);
		setAnsweredCount(0);
		setTimer(TIME_SEC);
	};

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				handleNextClick();
			}
		};

		document.addEventListener('keydown', handleKeyPress);
		return () => document.removeEventListener('keydown', handleKeyPress);
	}, []);

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
										<Th>Selected</Th>
										<Th>Answer</Th>
									</Tr>
								</Thead>
								<Tbody>
									{results.map((result, index) => {
										const isCorrect = result.selected === result.answer;
										return (
											<Tr key={index}>
												<Td>{result.question}</Td>
												<Td color={!isCorrect ? 'red.400' : undefined}>{result.selected}</Td>
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
					{currentFlashcard && currentFlashcard.question && (
						<>
							<Box mb='25px' textAlign='center'>
								<Text fontSize='xl' fontWeight='bold'>
									{currentFlashcard.question}
								</Text>
							</Box>
							<Box mb='30px' width='100%' textAlign='center'>
								<Progress colorScheme='green' size='md' value={(timer / TIME_SEC) * 100} width='100%' />
								<Text mt='10px' fontSize='sm'>
									Time remaining: {timer}s
								</Text>
							</Box>
							<SimpleGrid columns={{ base: 1, md: 2 }} gap="20px" mb='25px'>
								{options.map((option, index) => {
									const isCorrectAnswer = option === currentFlashcard.answer;
									const isSelectedWrongAnswer = option === selectedOption && !isCorrectAnswer;
									return (
										<Button
											key={index}
											width='100%'
											height='100px'
											fontWeight="bold"
											fontSize="xl"
											mt="10px"
											_hover={{ bg: useColorModeValue('gray.100', 'gray.800') }}
											_active={{ bg: useColorModeValue('gray.200', 'gray.600') }}
											_focus={{ boxShadow: 'none' }}
											bg={isAnswerShown && isCorrectAnswer ? 'green.400' : isSelectedWrongAnswer ? 'red.400' : undefined}
											onClick={() => handleOptionClick(option)}
										>
											<Text color={textColorPrimary} fontWeight="bold" fontSize="xl">
												{option}
											</Text>
										</Button>
									);
								})}
							</SimpleGrid>
							<Flex direction="row" justify="flex-start" gap="20px">
								<Button
									colorScheme="blue"
									onClick={handleNextClick}
									size="lg"
									width='50%'
									height='100px'
									fontWeight="bold"
									fontSize="xl"
									mt="10px"
									isDisabled={showResult || currentFlashcardIndex === fakeFlashcards.length - 1}
								>
									Next
								</Button>
								<Button
									colorScheme="teal"
									onClick={handlePlayClick}
									size="lg"
									width='50%'
									height='100px'
									fontWeight="bold"
									fontSize="xl"
									mt="10px"
									isDisabled={!showResult}
								>
									Play Again
								</Button>
							</Flex>
						</>
					)}
				</Card>
			</Box>
		</Flex>
	);

}

