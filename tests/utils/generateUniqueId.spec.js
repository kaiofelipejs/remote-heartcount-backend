const generateUniqueID = require("../../src/utils/generateUniqueId");

describe("Generate Unique ID", () => {
	it("generates unique values", () => {
		const values = new Set([]);

		for (let i = 0; i < 100; i++) {
			values.add(generateUniqueID());
		}

		expect(Array.from(values).length).toEqual(100);
	});

	it("generates values with exact 8 characters", () => {
		expect(generateUniqueID()).toHaveLength(8);
	});
});
