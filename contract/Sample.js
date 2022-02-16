"use strict";

const { Contract, Context } = require("fabric-contract-api");
const { Transaction, TransactionList } = require("./Transaction");
const { UserList } = require("./Users");

class SampleList {
	constructor(ctx) {
		this.ctx = ctx;
		this.KEY = "samples";
	}
	async createSamples(samples) {
		const DataSamples = Buffer.from(JSON.stringify(samples));
		await this.ctx.stub.putState(this.KEY, DataSamples);
	}
	async addSample(sample) {
		const SamplesList = await this.ctx.stub.getState(this.KEY);
		const samples = JSON.parse(SamplesList);
		samples.push(sample);
		const DataSamples = Buffer.from(JSON.stringify(samples));
		await this.ctx.stub.putState(this.KEY, DataSamples);
	}
	async getSamples() {
		const SamplesList = await this.ctx.stub.getState(this.KEY);
		const samples = JSON.parse(SamplesList);
		return samples;
	}
	async getSample(sampleId) {
		const SamplesList = await this.ctx.stub.getState(this.KEY);
		const samples = JSON.parse(SamplesList);
		return samples[sampleId];
	}
}

class Sample {
	constructor(id, nameSample, categoryId, money) {
		this.id = id;
		this.nameSample = nameSample;
		this.categoryId = categoryId;
		this.money = money;
	}
}

class SampleCTX extends Context {
	constructor() {
		super();
		this.sampleList = new SampleList(this);
		this.userList = new UserList(this);
		this.transactionList = new TransactionList(this);
	}
}

class SamplesContract extends Contract {
	createContext() {
		return new SampleCTX();
	}
	async initializationContract(ctx) {
		const samples = {};
		samples["Present10"] = new Sample(0, "Present10", 0, 10);
		samples["Present30"] = new Sample(1, "Present30", 0, 30);
		samples["Present50"] = new Sample(2, "Present50", 0, 50);
		samples["RentPay70"] = new Sample(3, "RentPay70", 1, 70);
		samples["RentPay90"] = new Sample(4, "RentPay90", 1, 90);
		await ctx.sampleList.createSamples(samples);
	}
	async addSample(ctx, login, nameSample, categoryId, money) {
		const users = await ctx.userList.getUsers();
		if (!users[login].isAdmin) {
			return new Error("You are not admin");
		}
		const samples = await ctx.sampleList.getSamples();
		const sample = new Sample(samples.length, nameSample, categoryId, money);
		await ctx.sampleList.addSample(sample);
		return await ctx.sampleList.getSample(samples.length);
	}
	async getSamples(ctx) {
		return await ctx.sampleList.getSamples();
	}
	/* Нужно использовать туже функцию транзакции */
	async useSample(
		ctx,
		nameSample,
		loginSender,
		loginRecipient,
		keyword,
		description,
		comission
	) {
		const transactions = await ctx.transactionList.getAllTransactions();
		const users = await ctx.userList.getUsers();
		const samples = await ctx.sampleList.getSamples();
		const now = new Date().toISOString();
		/* Не используется */
		const transaction = new Transaction(
			(transactions.length,
			loginSender,
			loginRecipient,
			keyword,
			samples[nameSample].categoryId,
			description,
			samples[nameSample].money,
			now,
			comission)
		);
		if (comission === 1) {
			const comissionSum = 0;
			if (samples[nameSample].money < 10) {
				comissionSum = 0.1;
			} else {
				comissionSum = samples[nameSample].money / 100;
			}
			await ctx.userList.sendMoney(loginSender, comissionSum);
			const countAdmin = users.filter((user) => user.isAdmin).length;
			const userArray = Object.values(users);
			for (let i = 0; i < userArray.length; i++) {
				if (userArray[i].isAdmin) {
					await ctx.userList.recieveMoney(
						userArray[i].login,
						comissionSum / countAdmin
					);
				}
			}
		}
		return await ctx.transactionList.getTransaction(transactions.length);
	}
}

module.exports.SamplesContract = SamplesContract;
