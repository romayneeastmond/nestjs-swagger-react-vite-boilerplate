import { renderHook } from '@testing-library/react';
import usePageTitle from './usePageTitle';

describe('usePageTitle', () => {
	it('should set the document title', () => {
		renderHook(() => usePageTitle('Items'));
		expect(document.title).toBe('Items | My App');
	});

	it('should update the title when it changes', () => {
		const { rerender } = renderHook(({ title }) => usePageTitle(title), {
			initialProps: { title: 'Items' },
		});
		expect(document.title).toBe('Items | My App');

		rerender({ title: 'Edit Item' });
		expect(document.title).toBe('Edit Item | My App');
	});
});