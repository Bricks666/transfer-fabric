const { verify, sign } = require("jsonwebtoken");
const { readFileSync } = require("fs");

const PUBLIC_KEY = readFileSync("./configs/public_key.pem");
const PRIVATE_KEY = readFileSync("./configs/private_key.pem");

module.exports = class Tokens {
	static verify(token) {
		try {
			return verify(token, PUBLIC_KEY);
		} catch {
			return null;
		}
	}
	static sign(payload, time = "10m") {
		try {
			return sign(payload, PRIVATE_KEY, {
				algorithm: "RS256",
				expiresIn: time,
			});
		} catch {
			return null;
		}
	}
};
