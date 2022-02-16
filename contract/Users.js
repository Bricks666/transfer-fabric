"use strict";

const {Contract, Context} = require("fabric-contract-api");

class UserList {
    constructor(ctx) {
        this.ctx = ctx;
        this.KEY = "users";
    }
    async createUsers(users) {
        const DataUsers = Buffer.from(JSON.stringify(users));
        await this.ctx.stub.putState(this.KEY, DataUsers);
    }
    async addUser(login, user) {
        const ListUsers = await this.ctx.stub.getState(this.KEY);
        const users = JSON.parse(ListUsers.toString());
        users[login] = user;
        const DataUsers = Buffer.from(JSON.stringify(users));
        await this.ctx.stub.putState(this.KEY, DataUsers);    
    }
    async getUsers() {
        const ListUsers = await this.ctx.stub.getState(this.KEY);
        const users = JSON.parse(ListUsers.toString());
        return users;
    }
    async getUser(login) {
        const ListUsers = await this.ctx.stub.getState(this.KEY);
        const users = JSON.parse(ListUsers.toString());
        return users[login];
    }
    async addOffer(login) {
        const ListUsers = await this.ctx.stub.getState(this.KEY);
        const users = JSON.parse(ListUsers.toString());
        users[login].onOffer = true;
        const DataUsers = Buffer.from(JSON.stringify(users));
        await this.ctx.stub.putState(this.KEY, DataUsers);  
    }
    async removeOffer(login) {
        const ListUsers = await this.ctx.stub.getState(this.KEY);
        const users = JSON.parse(ListUsers.toString());
        users[login].onOffer = false;
        const DataUsers = Buffer.from(JSON.stringify(users));
        await this.ctx.stub.putState(this.KEY, DataUsers); 
    }
    async addAdmin(login) {
        const ListUsers = await this.ctx.stub.getState(this.KEY);
        const users = JSON.parse(ListUsers.toString());
        users[login].isAdmin = true;
        const DataUsers = Buffer.from(JSON.stringify(users));
        await this.ctx.stub.putState(this.KEY, DataUsers);
    }
    async sendMoney(login, money) {
        const ListUsers = await this.ctx.stub.getState(this.KEY);
        const users = JSON.parse(ListUsers.toString());
        users[login].balance -= money;
        const DataUsers = Buffer.from(JSON.stringify(users));
        await this.ctx.stub.putState(this.KEY, DataUsers);
    }
    async recieveMoney(loginRecipient, money) {
        const ListUsers = await this.ctx.stub.getState(this.KEY);
        const users = JSON.parse(ListUsers.toString());
        users[loginRecipient].balance += +money;
        const DataUsers = Buffer.from(JSON.stringify(users));
        await this.ctx.stub.putState(this.KEY, DataUsers);
    }
}

class User {
    constructor(id, login, isAdmin, onOffer) {
        this.id = id;
        this.login = login;
        this.isAdmin = isAdmin;
        this.balance = 1000;
        this.onOffer = onOffer;
    } 
}

class UserCTX extends Context {
    constructor() {
        super();
        this.userList = new UserList(this);
    }
}

class UsersContract extends Contract {
    createContext() {
        return new UserCTX();
    }
    async initializationContract(ctx) {
        const users = {};
        users["Admin1"] = new User(0, "Admin1", true, true);
        users["Admin2"] = new User(1, "Admin2", true, true);
        users["User1"] = new User(2, "User1", false, false);
        users["User2"] = new User(3, "User2", false, false);
        users["User3"] = new User(4, "User3", false, false);
        users["User4"] = new User(5, "User4", false, false);
        await ctx.userList.createUsers(users);
    }
    async registration(ctx, login) {
        const users = await ctx.userList.getUsers();
        if (users[login]) {
            return new Error("You are already registered")
        }
        const user = new User(Object.keys(users).length, login, false, false);
        await ctx.userList.addUser(user);
        return await ctx.userList.getUser(login);
    }
    async getUser(ctx, login) {
        return await ctx.userList.getUser(login);
    }
    async getUsers(ctx) {
        return await ctx.userList.getUsers();
    }

}

module.exports.UserList = UserList;
module.exports.UsersContract = UsersContract;