import { apiLastVersion } from './api';

export function sum(a: number, b: number): number {
    return a + b;
}

export async function getLastVersion(): Promise<number> {
    try {
        const data = await apiLastVersion();
        return data * 2;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
}