import supertest from "supertest";
import createServer from "../utils/app";
import User from "../model/user.model";

const app = createServer();

const user = {
	first_name: "lake",
	last_name: "combse",
	email: "lakecombs@gmail.com",
	password: "password123455",
};

beforeEach(async () => {
	await User.deleteMany({});
	await User.create(user);
});

beforeAll(async () => {
	await User.deleteMany({});
	console.log("hey i am before the test");
});

describe("User", () => {
	afterAll(() => {
		console.log("hey i am after the test");
	});

	describe("user login route", () => {
		describe("given no email or password", () => {
			// it("should return a 400", async () => {
			// 	await supertest(app)
			// 		.post("/api/v1/user/login")
			// 		.send({
			// 			email: "",
			// 			password: "",
			// 		})
			// 		.expect(400);
			// });

			it("should sign up for a user", async () => {
				await supertest(app)
					.post("/api/v1/user/signup")
					.send({
						first_name: "lake",
						last_name: "combs",
						password: "password1234",
						email: "lakecombs@gmail.com",
					})
					.expect(201);
			});
		});
	});

	describe("user login route", () => {
		describe("given email and password", () => {
			it("should return a 400", async () => {
				await supertest(app)
					.post("/api/v1/user/login")
					.send({
						email: "lakecombs@gmail.com",
						password: "password123456",
					})
					.expect(200);
			});
		});
	});
});
