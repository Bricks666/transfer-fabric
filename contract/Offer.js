"use strict";

const { Contract, Context } = require("fabric-contract-api");
const { UserList } = require("./Users");

class OfferList {
	constructor(ctx) {
		this.ctx = ctx;
		this.KEY = "offers";
	}
	async createOffers(offers) {
		const DataOffers = Buffer.from(JSON.stringify(offers));
		await this.ctx.stub.putState(this.KEY, DataOffers);
	}
	async addOffer(offer) {
		const ListOffers = await this.ctx.stub.getState(this.KEY);
		const offers = JSON.parse(ListOffers.toString());
		offers.push(offer);
		const DataOffers = Buffer.from(JSON.stringify(offers));
		await this.ctx.stub.putState(this.KEY, DataOffers);
	}
	async getOffers() {
		const ListOffers = await this.ctx.stub.getState(this.KEY);
		const offers = JSON.parse(ListOffers.toString());
		return offers;
	}
	async getOffer(offerId) {
		const ListOffers = await this.ctx.stub.getState(this.KEY);
		const offers = JSON.parse(ListOffers.toString());
		return offers[offerId];
	}
	async voteFor(offerId, login) {
		// логин - кто голосует
		const ListOffers = await this.ctx.stub.getState(this.KEY);
		const offers = JSON.parse(ListOffers.toString());
		offers[offerId].listVoteFor.push(login);
		const DataOffers = Buffer.from(JSON.stringify(offers));
		await this.ctx.stub.putState(this.KEY, DataOffers);
	}
	async voteAgainst(offerId, login) {
		//login - кто голосует
		const ListOffers = await this.ctx.stub.getState(this.KEY);
		const offers = JSON.parse(ListOffers.toString());
		offers[offerId].VoteAgainst = login;
		const DataOffers = Buffer.from(JSON.stringify(offers));
		await this.ctx.stub.putState(this.KEY, DataOffers);
	}
	async finishOffer(offerId) {
		const ListOffers = await this.ctx.stub.getState(this.KEY);
		const offers = JSON.parse(ListOffers.toString());
		offers[offerId].finished = true;
		const DataOffers = Buffer.from(JSON.stringify(offers));
		await this.ctx.stub.putState(this.KEY, DataOffers);
	}
}

class Offer {
	constructor(id, loginToOffer) {
		this.id = id;
		this.loginToOffer = loginToOffer;
		this.listVoteFor = []; //проголосовали "За"
		this.VoteAgainst = ""; //проголосовал "Против"
		this.finished = false;
	}
}

class OfferCTX extends Context {
	constructor() {
		super();
		this.offerList = new OfferList(this);
		this.userList = new UserList(this);
	}
}

class OffersContract extends Contract {
	createContext() {
		return new OfferCTX();
	}
	async initializationContract(ctx) {
		const offers = [];
		await ctx.offerList.createOffers(offers);
		return offers;
	}
	async addOffer(ctx, login, loginToOffer) {
		//login - логин админа, который добавляет. loginToOffer - логин пользователя, которого добавляют
		const users = await ctx.userList.getUsers();
		if (users[login].isAdmin !== true) {
			return new Error("You are not admin");
		}
		if (users[loginToOffer].onOffer === true) {
			return new Error("The User is on offer");
		}
		const offers = await ctx.offerList.getOffers();
		const offer = new Offer(offers.length, loginToOffer);
		await ctx.userList.addOffer(loginToOffer);
		await ctx.offerList.addOffer(offer);
		return offer;
	}
	async voteFor(ctx, login, offerId) {
		// login - кто голосует
		const users = await ctx.userList.getUsers();
		const offers = await ctx.offerList.getOffers();
		if (users[login].isAdmin === false) {
			return new Error("You are not admin");
		}
		if (offers[offerId].finished === true) {
			return new Error("The offer is finished");
		}
    if (offers[offerId].listVoteFor.includes(login)) {
			return new Error("You are already vote");
		}
		const countAdmin = Object.values(users).filter(
			(user) => user.isAdmin
		).length;
		await ctx.offerList.voteFor(offerId, login);
		const offer = await ctx.offerList.getOffer(offerId);
		if (countAdmin === offer.listVoteFor.length) {
			await ctx.offerList.finishOffer(offerId);
			await ctx.userList.addAdmin(offer.loginToOffer);
		}
		return offer;
	}
	async voteAgainst(ctx, login, offerId) {
		// login - кто голосует
		const users = await ctx.userList.getUsers();
		const offers = await ctx.offerList.getOffers();
		if (users[login].isAdmin === false) {
			return new Error("You are not admin");
		}
		if (offers[offerId].listVoteFor.includes(login)) {
			return new Error("You are already vote");
		}
		if (offers[offerId].finished === true) {
			return new Error("The offer is finished");
		}
		await ctx.offerList.voteAgainst(offerId, login);
		await ctx.userList.removeOffer(offers[offerId].loginToOffer);
		await ctx.offerList.finishOffer(offerId);
		return offers[offerId];
	}
	async getOffers(ctx) {
		return await ctx.offerList.getOffers();
	}
}

module.exports.OffersContract = OffersContract;
