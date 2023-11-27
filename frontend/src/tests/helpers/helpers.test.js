import { normaliseData } from "../../helpers/helpers";

describe("Helpers Tests", () => {
    it("should trim, lowerCase and capitalize the data's strings", () => {
        const dataMock = {
            first_name: "    JeAn  ",
            last_name: "  PIerRe  ",
            password: "  HeLLo  ",
            age: 30,
        };
        const validMock = {
            first_name: "Jean",
            last_name: "Pierre",
            password: "  HeLLo  ",
            age: 30,
        };
        expect(normaliseData(dataMock)).toEqual(validMock)
    });
});