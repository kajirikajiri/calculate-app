import { calculator } from "./calculator";

const testSetValueCases = [
    {
        testName: "not sanitizes input",
        input: "1234567890+-*/.()",
        expected: "1234567890+-*/.()",
    },
    {
        testName: "sanitizes input",
        input: "aiueo,[]{}=|\\~`#@$%^&\"'<>?!",
        expected: "",
    },
]

describe.each(testSetValueCases)(`calculator.setValue`, ({
    testName,
    input,
    expected,
}) => {
    test(testName, () => {
        calculator.setValue = input
        expect(calculator.value).toEqual(expected);
    });
})

const testCalculateCases = [
    {
        testName: "calculates valid input",
        input: "(1 + 3 - 2) * 4 / 2.5",
        expected: { isErr: false, isOk: true, value: 3.2 },
    },
    {
        testName: "calculates invalid input",
        input: "1 +",
        expected: {isErr: true, isOk: false, value: "Invalid input"},
    },
]

describe.each(testCalculateCases)(`calculator.calculate`, ({
    testName,
    input,
    expected,
}) => {
    test(testName, () => {
        calculator.setValue = input
        const result = calculator.calculate()
        expect(result).toEqual(expected);
    });
})

