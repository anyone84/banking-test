import { AccountModel, Account } from '../src/models/account';
import { ClientModel, Client } from '../src/models/client';
import { MovementModel } from '../src/models/movement';


describe('AccountModel', () => {
  afterEach(() => {
    //ClientModel.delete(1);
    AccountModel.delete(1);
    MovementModel.delete(1);
    ClientModel.delete(1);
  });

  describe('validate', () => {
    it('should return true for valid account data', () => {
      const validClient: Client | undefined = ClientModel.create({ name: 'Client', email: 'client@example.com', phone: '1234567890' });
      const validAccount: Partial<Account> = {
        accountNumber: '123456',
        balance: 1000,
        clientId: 1,
      };
      expect(AccountModel.validate(validAccount)).toBe(true);
    });

    it('should return false for invalid account data', () => {
      const invalidAccount: Partial<Account> = {
        accountNumber: '',
        balance: -1000,
        clientId: 999, // Non-existent client
      };

      expect(AccountModel.validate(invalidAccount)).toBe(false);
    });
  });

  describe('create', () => {
    it('should create and return a new account', () => {
      const validClient: Client | undefined = ClientModel.create({ name: 'Client', email: 'client@example.com', phone: '1234567890' });
      const accountData = { accountNumber: '123456', balance: 1000, clientId: 1 };
      const newAccount: Account | undefined = AccountModel.create(accountData);
      
      expect(newAccount).toBeDefined();
      expect(newAccount).toMatchObject(accountData);
      expect(newAccount).toHaveProperty('id', 1);
      expect(AccountModel.findByClientId(1)).toHaveLength(1);
    });

    it('should return undefined for invalid account data', () => {
      const invalidData = { accountNumber: '', balance: -1000, clientId: 999 };
      const result = AccountModel.create(invalidData);

      expect(result).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update and return an existing account', () => {
      const validClient: Client | undefined = ClientModel.create({ name: 'Client', email: 'client@example.com', phone: '1234567890' });
      const account: Account = { id: 1, accountNumber: '123456', balance: 1000, clientId: 1 };
      AccountModel.create(account);

      const updatedData = { balance: 1500 };
      const updatedAccount = AccountModel.update(1, updatedData);

      expect(updatedAccount).toBeDefined();
      expect(updatedAccount).toHaveProperty('balance', 1500);
    });

    it('should return undefined if account does not exist', () => {
      const updatedAccount = AccountModel.update(999, { balance: 1500 });
      expect(updatedAccount).toBeUndefined();
    });
  });

  describe('updateBalance', () => {
    it('should update the balance and return true', () => {
      const validClient: Client | undefined = ClientModel.create({ name: 'Client', email: 'client@example.com', phone: '1234567890' });
      let account: Account | undefined = { id: 1, accountNumber: '123456', balance: 1000, clientId: 1 };
      AccountModel.create(account);

      const quantity: number = -200;
      const updatedBalance = AccountModel.updateBalance(1, quantity);
      account = AccountModel.findById(1);

      expect(updatedBalance).toBe(true);
      expect(account).toHaveProperty('balance', 800);
    });

    it('should return false if account does not exist', () => {
      const quantity: number = -200;
      const updatedBalance = AccountModel.updateBalance(999, quantity);

      expect(updatedBalance).toBe(false);
    });
  });

  describe('delete', () => {
    it('should delete an existing account', () => {
      const validClient: Client | undefined = ClientModel.create({ name: 'Client', email: 'client@example.com', phone: '1234567890' });
      const account: Account = { id: 1, accountNumber: '123456', balance: 1000, clientId: 1 };

      AccountModel.create(account);

      const result = AccountModel.delete(1);
      expect(result).toBe(true);
      expect(AccountModel.findById(1)).toBeUndefined();
    });

    it('should return false if account does not exist', () => {
      const result = AccountModel.delete(999);
      expect(result).toBe(false);
    });
  });
});
