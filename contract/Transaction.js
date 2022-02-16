"use strict";

const { Contract, Context } = require("fabric-contract-api");
const { UserList } = require("./Users");

class TransactionList {
	constructor(ctx) {
		this.ctx = ctx;
		this.KEY = "transactions";
	}
	async createTransactions(transactions) {
		const DataTransactions = Buffer.from(JSON.stringify(transactions));
		await this.ctx.stub.putState(this.KEY, DataTransactions);
	}
	async addTransactions(transaction) {
		const TransactionsList = await this.ctx.stub.getState(this.KEY);
		const transactions = JSON.parse(TransactionsList.toString());
		transactions.push(transaction);
		const DataTransactions = Buffer.from(JSON.stringify(transactions));
		await this.ctx.stub.putState(this.KEY, DataTransactions);
	}
	async getAllTransactions() {
		const TransactionsList = await this.ctx.stub.getState(this.KEY);
		const transactions = JSON.parse(TransactionsList.toString());
		return transactions;
	}
	async getTransaction(transactionId) {
		const TransactionsList = await this.ctx.stub.getState(this.KEY);
		const transactions = JSON.parse(TransactionsList.toString());
		return transactions[transactionId];
	}
	async getTransactionsLogin(login) {
		const TransactionsList = await this.ctx.stub.getState(this.KEY);
		const transactions = JSON.parse(TransactionsList.toString());
		return transactions.filter(
			(transaction) =>
				transaction.loginSender === login ||
				transaction.loginRecipient === login
		);
	}
	async finishTransaction(transactionId) {
		const TransactionsList = await this.ctx.stub.getState(this.KEY);
		const transactions = JSON.parse(TransactionsList.toString());
		transactions[transactionId].finished = true;
		const DataTransactions = Buffer.from(JSON.stringify(transactions));
		await this.ctx.stub.putState(this.KEY, DataTransactions);
	}
}

class Transaction {
	constructor(
		id,
		loginSender,
		loginRecipient,
		keyword,
		categoryId,
		description,
		money,
		date,
		comission
	) {
		//loginSender - логин отправителя, loginRecipient - логин получателя, description - описание, money - количество денег, date - дата, comission - кто платит комиссию за перевод: 1 - отправитель, 2 - получатель
		this.id = id;
		this.loginSender = loginSender;
		this.loginRecipient = loginRecipient;
		this.keyword = keyword;
		this.categoryId = categoryId;
		this.description = description;
		this.money = money;
		this.date = date;
		this.comission = comission;
		this.finished = false;
	}
}

class TransactionCTX extends Context {
	constructor() {
		super();
		this.transactionList = new TransactionList(this);
		this.userList = new UserList(this);
	}
}

class TransactionsContract extends Contract {
	createContext() {
		return new TransactionCTX();
	}
	async initializationContract(ctx) {
		const transactions = [];
		await ctx.transactionList.createTransactions(transactions);
	}
	async addTransaction(
		ctx,
		loginSender,
		loginRecipient,
		keyword,
		categoryId,
		description,
		money
	) {
		const transactions = await ctx.transactionList.getAllTransactions();
		const now = new Date().toISOString();
		const transaction = new Transaction(
			(transactions.length,
			loginSender,
			loginRecipient,
			keyword,
			categoryId,
			description,
			money,
			now,
			0)
		);
		await ctx.transactionList.addTransaction(transaction, loginSender);
		await ctx.userList.sendMoney(loginSender, money);
		return await ctx.transactionList.getTransaction(transactions.length);
	}
	async acceptTransactions(ctx, login, transactionId, keyword) {
		const transactions = await ctx.transactionList.getAllTransactions();
		if (transactions[transactionId].finished === true) {
			return new Error("The transaction is finished");
		}
		if (transactions[transactionId].keyword !== keyword) {
			await ctx.userList.recieveMoney(
				transactions[transactionId].loginSender,
				transactions[transactionId].money
			);
		} else {
			await ctx.userList.recieveMoney(login, transactions[transactionId].money);
			if (transactions[transactionId].comission === 2) {
				const comissionSum = 0;
				if (samples[nameSample].money < 10) {
					comissionSum = 0.1;
				} else {
					comissionSum = samples[nameSample].money / 100;
				}
				await ctx.userList.sendMoney(login, comissionSum);
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
		}
		await ctx.transactionList.finishTransaction(transactionId);
	}
	async cancelTransaction(ctx, login, transactionId) {
		const transactions = await ctx.transactionList.getAllTransactions();
		if (login !== transactions[transactionId].loginSender) {
			return new Error("You are not sender");
		}
		if (transactions[transactionId].finished === true) {
			return new Error("The transaction is finished");
		}
		await ctx.transactionList.finishTransaction(transactionId);
		await ctx.userList.recieveMoney(login, transactions[transactionId].money);
		return await ctx.transactionList.getTransaction(transactionId);
	}
	async getTransactionsLogin(ctx, login) {
		return await ctx.transactionList.getTransactionsLogin(login);
	}
}

module.exports.Transaction = Transaction;
module.exports.TransactionList = TransactionList;
module.exports.TransactionsContract = TransactionsContract;