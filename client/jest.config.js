module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 
      '<rootDir>/__mocks__/fileMock.js',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^@/env$': '<rootDir>/src/env.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  roots: ['<rootDir>'],
  moduleDirectories: ['node_modules', 'src'],
};