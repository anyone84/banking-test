import { Request, Response } from 'express';
import { getAccountsByClientId, createAccount, updateAccount, deleteAccount } from '../src/controllers/accountController';
import { AccountModel, Account } from '../src/models/account';
import { ClientModel, Client } from '../src/models/client';
import { HTTP_STATUS, ERROR_MESSAGES } from '../src/constants';

jest.mock('../src/models/account');
jest.mock('../src/models/client');

describe('AccountController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let status: jest.Mock;
  let json: jest.Mock;
  let send: jest.Mock;

  beforeEach(() => {
    json = jest.fn();
    send = jest.fn();
    status = jest.fn().mockReturnValue({ json, send });
    
    req = {};
    res = {
      status,
    } as Partial<Response>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAccountsByClientId', () => {
    it('should return client and their accounts when client exists', async () => {
      const clientId = 1;
      const client: Client = { id: clientId, name: 'Client1', email: 'client1@example.com', phone: '1234567890' };
      const accounts: Account[] = [{ id: 1, accountNumber: '123', balance: 1000, clientId }];

      (ClientModel.findById as jest.Mock).mockReturnValue(client);
      (AccountModel.findByClientId as jest.Mock).mockReturnValue(accounts);

      req.params = { clientId: clientId.toString() };

      await getAccountsByClientId(req as Request, res as Response);

      expect(json).toHaveBeenCalledWith({ ...client, accounts });
      expect(status).toHaveBeenCalledWith(HTTP_STATUS.OK);
    });

    it('should return error when client does not exist', async () => {
      (ClientModel.findById as jest.Mock).mockReturnValue(undefined);

      req.params = { clientId: '1' };

      await getAccountsByClientId(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
      expect(json).toHaveBeenCalledWith({ message: ERROR_MESSAGES.CLIENT_NOT_FOUND });
    });
  });

  describe('createAccount', () => {
    it('should create a new account when client exists', async () => {
      const clientId = 1;
      const client: Client = { id: clientId, name: 'Client1', email: 'client1@example.com', phone: '1234567890' };
      const newAccount: Account = { id: 1, accountNumber: '123', balance: 1000, clientId };
      const reqBody = { accountNumber: '123', balance: 1000 };

      (ClientModel.findById as jest.Mock).mockReturnValue(client);
      (AccountModel.create as jest.Mock).mockReturnValue(newAccount);

      req.params = { clientId: clientId.toString() };
      req.body = reqBody;

      await createAccount(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
      expect(json).toHaveBeenCalledWith(newAccount);
    });

    it('should return error when client does not exist', async () => {
      (ClientModel.findById as jest.Mock).mockReturnValue(undefined);

      req.params = { clientId: '1' };
      req.body = { accountNumber: '123', balance: 1000 };

      await createAccount(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
      expect(json).toHaveBeenCalledWith({ message: ERROR_MESSAGES.CLIENT_NOT_FOUND });
    });

    it('should return error when account creation fails', async () => {
      const clientId = 1;
      const client: Client = { id: clientId, name: 'Client1', email: 'client1@example.com', phone: '1234567890' };
      const reqBody = { accountNumber: '123', balance: 1000 };

      (ClientModel.findById as jest.Mock).mockReturnValue(client);
      (AccountModel.create as jest.Mock).mockReturnValue(undefined);

      req.params = { clientId: clientId.toString() };
      req.body = reqBody;

      await createAccount(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
      expect(json).toHaveBeenCalledWith({ message: ERROR_MESSAGES.VALIDATION_FAILED });
    });
  });

  describe('updateAccount', () => {
    it('should update account when account exists', async () => {
      const accountId = 1;
      const existingAccount: Account = { id: accountId, accountNumber: '123', balance: 1000, clientId: 1 };
      const updatedAccount: Account = { id: accountId, accountNumber: '456', balance: 2000, clientId: 1 };
      const reqBody = { accountNumber: '456', balance: 2000 };

      (AccountModel.findById as jest.Mock).mockReturnValue(existingAccount);
      (AccountModel.update as jest.Mock).mockReturnValue(updatedAccount);

      req.params = { accountId: accountId.toString() };
      req.body = reqBody;

      await updateAccount(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(json).toHaveBeenCalledWith(updatedAccount);
    });

    it('should return error when account does not exist', async () => {
      (AccountModel.findById as jest.Mock).mockReturnValue(undefined);

      req.params = { accountId: '1' };
      req.body = { accountNumber: '456', balance: 2000 };

      await updateAccount(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
      expect(json).toHaveBeenCalledWith({ message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND });
    });

    it('should return error when account update fails', async () => {
      const accountId = 1;
      const existingAccount: Account = { id: accountId, accountNumber: '123', balance: 1000, clientId: 1 };
      const reqBody = { accountNumber: '456', balance: 2000 };

      (AccountModel.findById as jest.Mock).mockReturnValue(existingAccount);
      (AccountModel.update as jest.Mock).mockReturnValue(undefined);

      req.params = { accountId: accountId.toString() };
      req.body = reqBody;

      await updateAccount(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
      expect(json).toHaveBeenCalledWith({ message: ERROR_MESSAGES.VALIDATION_FAILED });
    });
  });

  describe('deleteAccount', () => {
    it('should delete account when account exists', async () => {
      const accountId = 1;
      const existingAccount: Account = { id: accountId, accountNumber: '123', balance: 1000, clientId: 1 };

      (AccountModel.findById as jest.Mock).mockReturnValue(existingAccount);
      (AccountModel.delete as jest.Mock).mockReturnValue(true);

      req.params = { accountId: accountId.toString() };

      await deleteAccount(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.NO_CONTENT);
      expect(send).toHaveBeenCalledWith(null);
    });

    it('should return error when account does not exist', async () => {
      (AccountModel.findById as jest.Mock).mockReturnValue(undefined);

      req.params = { accountId: '1' };

      await deleteAccount(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
      expect(send).toHaveBeenCalledWith({ message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND });
    });

    it('should return error when account deletion fails', async () => {
      const accountId = 1;
      const existingAccount: Account = { id: accountId, accountNumber: '123', balance: 1000, clientId: 1 };

      (AccountModel.findById as jest.Mock).mockReturnValue(existingAccount);
      (AccountModel.delete as jest.Mock).mockReturnValue(false);

      req.params = { accountId: accountId.toString() };

      await deleteAccount(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      expect(send).toHaveBeenCalledWith({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
  });
});
