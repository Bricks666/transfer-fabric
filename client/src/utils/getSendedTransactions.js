export const getSendedTransactions = (address, transactions) => {
  return transactions.filter(transaction => transaction.sender === address)
}
