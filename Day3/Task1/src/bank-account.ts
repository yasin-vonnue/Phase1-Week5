class BankAccount {
  public readonly accountNumber: string;

  #hashPrivate = "secret";

  constructor(
    private balance: number,
    public readonly owner: string,
    accountNumber: string,
  ) {
    this.accountNumber = accountNumber;
  }

  public getBalance(): number {
    return this.balance;
  }

  protected transfer(amount: number): void {
    this.balance -= amount;
  }

  public makeTransfer(amount: number): void {
    this.transfer(amount);
  }
}

class SavingsAccount extends BankAccount {
  public withdraw(amount: number): void {
    this.transfer(amount);
  }
}

const account = new SavingsAccount(1000, "Arthur", "ACC-001");

console.log("Owner:", account.owner);
console.log("Account:", account.accountNumber);
console.log("Balance:", account.getBalance());

account.withdraw(200);

console.log("Balance after withdrawal:", account.getBalance());

// TypeScript private:
// account.balance; // Error

// readonly:
// account.owner = "Dutch"; // Error
// account.accountNumber = "ACC-002"; // Error

// protected:
// account.transfer(100); // Error

// JavaScript #private:
// account.#hashPrivate; // Error
