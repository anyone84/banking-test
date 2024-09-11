import { Movement } from "./movement";
import { ClientModel } from "./client";

export interface Account {
  id: number;
  accountNumber: string;
  balance: number;
  clientId: number;
  movements?: Movement[]; // Relación con movimientos
}

export class AccountModel {
  private static accounts: Account[] = [];

  static validate(account: Partial<Account>): boolean {
    if (!account.accountNumber || typeof account.accountNumber !== "string") {
      return false;
    }
    if (account.balance === undefined || typeof account.balance !== "number") {
      return false;
    }
    if (
      !account.clientId ||
      typeof account.clientId !== "number" ||
      !ClientModel.findById(account.clientId)
    ) {
      return false;
    }
    return true;
  }

  static findByClientId(clientId: number): Account[] {
    return JSON.parse(JSON.stringify(
      AccountModel.accounts.filter(
        (account) => account.clientId === clientId
        )
    ));
  }

  static findById(id: number): Account | undefined {
    const account: Account | undefined = AccountModel.accounts.find((account) => account.id === id)
    return account ? JSON.parse(JSON.stringify(account)) : undefined;
  }

  static create(accountData: any): Account | undefined {
    if (!this.validate(accountData)) {
      return undefined;
    }
    const newAccount: Account = {
      id: AccountModel.accounts.length + 1,
      accountNumber: accountData.accountNumber,
      balance: accountData.balance,
      clientId: accountData.clientId,
    };
    AccountModel.accounts.push(newAccount);
    return JSON.parse(JSON.stringify(newAccount));
  }

  static update(
    id: number,
    updateFields: Partial<Account>
  ): Account | undefined {
    const account = AccountModel.accounts.find((account) => account.id === id);
    if (account) {
      Object.assign(account, updateFields);
      return JSON.parse(JSON.stringify(account));
    }
    return undefined;
  }

  static updateBalance(id: number, quantity: number): boolean {
    const account = this.findById(id);
    if (account) {
      const newBalance = account.balance + quantity;
      this.update(id, {balance: newBalance});
      return true;
    } else {
      return false;
    }
  }

  static delete(id: number): boolean {
    const index = AccountModel.accounts.findIndex(
      (account) => account.id === id
    );
    if (index !== -1) {
      AccountModel.accounts.splice(index, 1);
      return true;
    }
    return false;
  }
}
