"use strict";

const {Contract, Context} = require("fabric-contract-api");
const { UserList } = require("./Users");

class CategoryList {
    constructor(ctx) {
        this.ctx = ctx;
        this.KEY = "categories";
    }
    async createCategories(categories) {
        const DataCategory = Buffer.from(JSON.stringify(categories));
        await this.ctx.stub.putState(this.KEY, DataCategory);
    }
    async addCategory(category) {
        const CategoriesList = await this.ctx.stub.getState(this.KEY);
        const categories = JSON.parse(CategoriesList.toString());
        categories.push(category);
        const DataCategory = Buffer.from(JSON.stringify(categories));
        await this.ctx.stub.putState(this.KEY, DataCategory);
    }
    async getCategories() {
        const CategoriesList = await this.ctx.stub.getState(this.KEY);
        const categories = JSON.parse(CategoriesList.toString());
        return categories;
    }
    async getCategory(categoryId) {
        const CategoriesList = await this.ctx.stub.getState(this.KEY);
        const categories = JSON.parse(CategoriesList.toString());
        return categories[categoryId];
    }
}

class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class CategoryCTX extends Context {
    constructor() {
        super();
        this.categoryList = new CategoryList(this);
        this.userList = new UserList(this);
    }
}

class CategoryContract extends Contract {
    createContext() {
        return new CategoryCTX()
    }
    async initializationContract(ctx) {
        const categories = [];
        categories.push(new Category(0, "PersonalPay"));
        categories.push(new Category(1, "RentPay"));
        await ctx.categoryList.createCategories(categories);
    }
    async addCategory(ctx, login, name) {//name - название категории
        const users = await ctx.userList.getUsers();
        if (!users[login].isAdmin) {
            return new Error("You are not admin");
        }
        const categories = await ctx.categoryList.getCategories();
        const category = new Category(categories.length, name);
        await ctx.categoryList.addCategory(category);
        return await ctx.categoryList.getCategory(categories.length);
    }
    async getCategories(ctx) {
        return await ctx.categoryList.getCategories();
    }
}


module.exports.CategoryContract = CategoryContract;
