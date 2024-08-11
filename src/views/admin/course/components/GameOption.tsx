import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
		question: 'What is the largest mammal?',
		answer: 'Blue Whale',
	}
];

const generateOptions = (answer: string, allAnswers: string[]): string[] => {
	const options = new Set<string>([answer]);

	while (options.size < 4) {
		const randomAnswer = allAnswers[Math.floor(Math.random() * allAnswers.length)];
		options.add(randomAnswer);
	}

	return Array.from(options).sort(() => Math.random() - 0.5);
};

const getAllAnswers = (flashcards: Flashcard[]): string[] =>
	flashcards.map(card => card.answer);

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
	const [optionCorrect, setOptionCorrect] = useState<string>('');
	const [isAnswerShown, setIsAnswerShown] = useState<boolean>(false);
	const [answeredCount, setAnsweredCount] = useState(0);
	const [showResult, setShowResult] = useState(false);
	const [timer, setTimer] = useState(TIME_SEC);
	const [results, setResults] = useState<{ question: string; selected: string; answer: string }[]>([]);

	const currentFlashcard = fakeFlashcards[currentFlashcardIndex];
	const allAnswers = useMemo(() => getAllAnswers(fakeFlashcards), []);
	const options = useMemo(() => generateOptions(currentFlashcard.answer, allAnswers), [currentFlashcardIndex, allAnswers]);

	useEffect(() => {
		let countdown: NodeJS.Timeout;
		if (timer > 0 && !isAnswerShown) {
			countdown = setInterval(() => setTimer(prevTimer => prevTimer - 1), 1000);
		} else if (timer === 0 && !isAnswerShown) {
			handleNextClick();
		}

		return () => clearInterval(countdown);
	}, [timer, isAnswerShown]);

	const handleOptionClick = useCallback((option: string) => {
		if (isAnswerShown) return;

		setIsAnswerShown(true);
		setOptionCorrect(currentFlashcard.answer);

		if (option === currentFlashcard.answer) {
			setAnsweredCount(prevCount => prevCount + 1);
		}

		setSelectedOption(option);

		setResults(prevResults => [
			...prevResults,
			{ question: currentFlashcard.question, selected: option, answer: currentFlashcard.answer }
		]);

	}, [currentFlashcard, isAnswerShown]);

	const handleNextClick = useCallback(() => {
		if (currentFlashcardIndex === fakeFlashcards.length - 1) {
			setShowResult(true);
		} else {
			setSelectedOption('');
			setCurrentFlashcardIndex(prevIndex => prevIndex + 1);
			setTimer(TIME_SEC);
			setIsAnswerShown(false);
		}
	}, [currentFlashcardIndex]);

	const handlePlayClick = useCallback(() => {
		setCurrentFlashcardIndex(0);
		setSelectedOption('');
		setShowResult(false);
		setAnsweredCount(0);
		setTimer(TIME_SEC);
		setResults([]);
		setIsAnswerShown(false);
	}, []);

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'Enter' && !showResult) {
				handleNextClick();
			}
		};

		document.addEventListener('keydown', handleKeyPress);
		return () => document.removeEventListener('keydown', handleKeyPress);
	}, [handleNextClick, showResult]);

	useEffect(() => {
		if (showResult) {
			toast({
				title: 'Game Over!',
				description: `You answered ${answeredCount} out of ${fakeFlashcards.length} questions correctly.`,
				status: 'success',
				duration: 5000,
				isClosable: true,
				position: 'top',
			});
		}
	}, [showResult, answeredCount, toast]);

	return (
		<Flex direction="row" width="100%" gap="20px" {...rest}>
			<Box width={{ base: '100%', md: '33.33%' }} mb="20px">
				<SimpleGrid columns={1} spacing="20px" mb="20px">
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
					{showResult ? (
						<Box textAlign='center'>
							<Text fontSize='xl' mb='10px'>Game Over!</Text>
							<Text fontSize='lg' mb='10px'>
								You answered {answeredCount} out of {fakeFlashcards.length} questions correctly.
							</Text>
							<Button onClick={handlePlayClick} colorScheme='teal'>Play Again</Button>
						</Box>
					) : (
						<>
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
											const isCorrectAnswer = option === optionCorrect;
											const isSelectedWrongAnswer = option === selectedOption && !isCorrectAnswer;
											return (
												<Button
													key={index}
													width='100%'
													height='100px'
													fontWeight="bold"
													fontSize="xl"
													mt="10px"
													bg={isAnswerShown ? (isCorrectAnswer ? 'green.400' : isSelectedWrongAnswer ? 'red.400' : undefined) : undefined}
													onClick={() => handleOptionClick(option)}
												>
													<Text color={textColorPrimary} fontWeight="bold" fontSize="xl">
														{option}
													</Text>
												</Button>
											);
										})}
									</SimpleGrid>
								</>
							)}
						</>
					)}
				</Card>
			</Box>
		</Flex>
	);
}
