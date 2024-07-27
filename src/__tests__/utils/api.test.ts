import { getLastVersion } from '../../utils/example';
import { apiLastVersion } from '../../utils/api';

jest.mock('../../utils/api');

describe('getValue function', () => {
    test('should correctly process value from API', async () => {
        (apiLastVersion as jest.Mock).mockResolvedValue(10);

        const result = await getLastVersion();
        expect(result).toBe(20);
    });

    test('should handle API failure gracefully', async () => {
        (apiLastVersion as jest.Mock).mockRejectedValue(new Error('API failed'));

        await expect(getLastVersion()).rejects.toThrow('Failed to fetch data');
    });
});