const { generateKeyPairSync } = require("crypto");
const { writeFileSync } = require("fs");

const generateKeysPair = () => {
	const pair = generateKeyPairSync("rsa", {
		modulusLength: 4096,
		publicKeyEncoding: {
			type: "pkcs1",
			format: "pem",
		},
		privateKeyEncoding: {
			type: "pkcs1",
			format: "pem",
		},
	});

	writeFileSync("./configs/public_key.pem", pair.publicKey);
	writeFileSync("./configs/private_key.pem", pair.privateKey);
};

generateKeysPair()
