try {
  const account1 = new BankAccount("ACC123", "Alice", 1000);
  const account2 = new BankAccount("ACC456", "Bob", 500);

  account1.deposit(200);
  account1.withdraw(100);
  BankAccount.transfer(account1, account2, 300);

  console.log("Alice's balance:", account1.getBalance());
  console.log("Bob's balance:", account2.getBalance());   

  account1.getStatement();
  account2.getStatement();

} catch (error) {
  console.error("Error:", error.message);
}