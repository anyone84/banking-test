import { Movement } from "./movement";
import { ClientModel } from "./client";

/**
 * Interface representing an account.
 */
export interface Account {
  id: number;                // Unique identifier for the account
  accountNumber: string;     // Account number
  balance: number;           // Account balance
  clientId: number;          // Identifier for the associated client
  movements?: Movement[];    // Optional list of movements related to the account
}

/**
 * Class responsible for managing accounts.
 */
export class AccountModel {
  private static accounts: Account[] = []; // In-memory storage for accounts

  /**
   * Validates the given account data.
   * 
   * @param account - Partial account object to validate.
   * @returns A boolean indicating whether the account data is valid.
   */
  static validate(account: Partial<Account>): boolean {
    if (!account.accountNumber || typeof account.accountNumber !== "string") {
      return false;
    }
    if (account.balance === undefined || typeof account.balance !== "number") {
      return false;
    }
    if (!account.clientId || typeof account.clientId !== "number" || !ClientModel.findById(account.clientId)) {
      return false;
    }
    return true;
  }

  /**
   * Finds all accounts associated with a specific client ID.
   * 
   * @param clientId - The ID of the client to find accounts for.
   * @returns An array of accounts associated with the given client ID.
   */
  static findByClientId(clientId: number): Account[] {
    return JSON.parse(JSON.stringify(
      this.accounts.filter(
        (account) => account.clientId === clientId
        )
    ));
  }

  /**
   * Finds an account by its unique identifier.
   * 
   * @param id - The ID of the account to find.
   * @returns The account with the given ID, or undefined if not found.
   */
  static findById(id: number): Account | undefined {
    const account: Account | undefined = this.accounts.find((account) => account.id === id);
    return account ? JSON.parse(JSON.stringify(account)) : undefined;
  }

  /**
   * Creates a new account with the provided data.
   * 
   * @param accountData - The data to create the new account.
   * @returns The newly created account, or undefined if validation fails.
   */
  static create(accountData: any): Account | undefined {
    if (!this.validate(accountData)) {
      return undefined;
    }
    const newAccount: Account = {
      id: this.accounts.length + 1,
      accountNumber: accountData.accountNumber,
      balance: accountData.balance,
      clientId: accountData.clientId,
    };
    this.accounts.push(newAccount);
    return JSON.parse(JSON.stringify(newAccount));
  }

  /**
   * Updates an existing account with the provided fields.
   * 
   * @param id - The ID of the account to update.
   * @param updateFields - Partial account data to update.
   * @returns The updated account, or undefined if the account is not found.
   */
  static update(id: number, updateFields: Partial<Account>): Account | undefined {
    const account: Account | undefined = this.accounts.find((account) => account.id === id);
    if (account) {
      Object.assign(account, updateFields);
      return JSON.parse(JSON.stringify(account));
    }
    return undefined;
  }

  /**
   * Updates the balance of an account by adding the given quantity.
   * 
   * @param id - The ID of the account to update.
   * @param quantity - The amount to add to the account balance.
   * @returns A boolean indicating whether the balance update was successful.
   */
  static updateBalance(id: number, quantity: number): boolean {
    const account: Account | undefined = this.findById(id);
    if (account) {
      const newBalance: number = account.balance + quantity;
      this.update(id, { balance: newBalance });
      return true;
    } else {
      return false;
    }
  }

  /**
   * Deletes an account by its unique identifier.
   * 
   * @param id - The ID of the account to delete.
   * @returns A boolean indicating whether the account was successfully deleted.
   */
  static delete(id: number): boolean {
    const index: number = this.accounts.findIndex(
      (account) => account.id === id
    );
    if (index !== -1) {
      this.accounts.splice(index, 1);
      return true;
    }
    return false;
  }
}
