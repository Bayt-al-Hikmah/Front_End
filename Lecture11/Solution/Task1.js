class BankAccount {
  #accountNumber;
  #ownerName;
  #balance;
  #transactions;

  constructor(accountNumber, ownerName, initialBalance = 0) {
    if (initialBalance < 0) {
      throw new Error("Initial balance cannot be negative.");
    }
    this.#accountNumber = accountNumber;
    this.#ownerName = ownerName;
    this.#balance = initialBalance;
    this.#transactions = [];
  }

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive.");
    }
    this.#balance += amount;
    this.#transactions.push({
      type: "deposit",
      amount,
      balance: this.#balance,
      timestamp: new Date().toISOString()
    });
  }

  withdraw(amount) {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be positive.");
    }
    if (amount > this.#balance) {
      throw new Error("Insufficient funds.");
    }
    this.#balance -= amount;
    this.#transactions.push({
      type: "withdrawal",
      amount,
      balance: this.#balance,
      timestamp: new Date().toISOString()
    });
  }

  getBalance() {
    return this.#balance;
  }

  getStatement() {
    console.log(`Transaction History (${this.#accountNumber} - ${this.#ownerName}):`);
    this.#transactions.forEach(transaction => {
      const sign = transaction.type === "deposit" ? "+" : "-";
      console.log(
        `- ${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}: ` +
        `${sign}${transaction.amount} (Balance: ${transaction.balance}) ` +
        `[${transaction.timestamp}]`
      );
    });
  }

  static transfer(sourceAccount, targetAccount, amount) {
    if (!(sourceAccount instanceof BankAccount) || !(targetAccount instanceof BankAccount)) {
      throw new Error("Both accounts must be BankAccount instances.");
    }
    if (amount <= 0) {
      throw new Error("Transfer amount must be positive.");
    }
    try {
      sourceAccount.withdraw(amount);
      targetAccount.deposit(amount);
      sourceAccount.#transactions.push({
        type: "transfer-out",
        amount,
        balance: sourceAccount.#balance,
        timestamp: new Date().toISOString()
      });
      targetAccount.#transactions.push({
        type: "transfer-in",
        amount,
        balance: targetAccount.#balance,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      throw new Error(`Transfer failed: ${error.message}`);
    }
  }
}