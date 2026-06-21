export default {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['@testing-library/jest-dom'],
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.test.json',
		},
	},
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/fileMock.ts',
	},
};