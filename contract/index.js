const {UsersContract} = require("./Users");
const {OffersContract}  =require("./Offer");
const {SamplesContract} = require("./Sample");
const {TransactionsContract} = require("./Transaction");
const {CategoryContract} = require("./Category");



module.exports.CategoryContract = CategoryContract;
module.exports.SamplesContract = SamplesContract;
module.exports.TransactionsContract = TransactionsContract;
module.exports.UsersContract = UsersContract;
module.exports.OffersContract = OffersContract;
module.exports.contracts = [UsersContract, OffersContract, TransactionsContract, SamplesContract, CategoryContract];
