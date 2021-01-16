module.exports = {
    roots: ["<rootDir>/src"],
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(spec))\\.ts?$",
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "js"],
    moduleDirectories: ["node_modules", "src"],
};