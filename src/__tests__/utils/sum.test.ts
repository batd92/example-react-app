import { sum } from '../../utils/example';

describe('sum', () => {
    test('should correctly add two positive numbers', () => {
        expect(sum(1, 2)).toBe(3);
    });

    test('should correctly add two negative numbers', () => {
        expect(sum(-1, -2)).toBe(-3);
    });

    test('should correctly add a positive number and a negative number', () => {
        expect(sum(1, -2)).toBe(-1);
    });

    test('should correctly add zero and a number', () => {
        expect(sum(0, 5)).toBe(5);
    });
});