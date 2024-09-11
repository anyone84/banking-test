import { Request, Response } from 'express';
import { getMovementsByAccountId, getMovementsForClientAccount, createMovement, deleteMovement } from '../src/controllers/movementController';
import { MovementModel, Movement } from '../src/models/movement';
import { AccountModel, Account } from '../src/models/account';
import { ClientModel, Client } from '../src/models/client';
import { HTTP_STATUS, ERROR_MESSAGES } from '../src/constants';

jest.mock('../src/models/movement');
jest.mock('../src/models/account');
jest.mock('../src/models/client');

describe('MovementController', () => {
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

  describe('getMovementsByAccountId', () => {
    it('should return movements when account exists', async () => {
      const accountId = 1;
      const account: Account = { id: accountId, accountNumber: '123', balance: 1000, clientId: 1 };
      const movements: Movement[] = [{ id: 1, quantity: 500, date: Date.now(), accountId }];
      account.movements = movements;

      (AccountModel.findById as jest.Mock).mockReturnValue(account);
      (MovementModel.findByAccountId as jest.Mock).mockReturnValue(movements);

      req.params = { accountId: accountId.toString() };

      await getMovementsByAccountId(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(json).toHaveBeenCalledWith(account);
    });

    it('should return error when account does not exist', async () => {
      (AccountModel.findById as jest.Mock).mockReturnValue(undefined);

      req.params = { accountId: '1' };

      await getMovementsByAccountId(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
      expect(json).toHaveBeenCalledWith({ message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND });
    });
  });

  describe('getMovementsForClientAccount', () => {
    it('should return movements for client\'s account when both client and account exist', async () => {
      const clientId = 1;
      const accountId = 2;
      const client: Client = { id: clientId, name: 'Client1', email: 'client1@example.com', phone: '1234567890' };
      const account: Account = { id: accountId, accountNumber: '123', balance: 1000, clientId };
      const movements: Movement[] = [{ id: 1, quantity: 300, date: Date.now(), accountId }];

      (ClientModel.findById as jest.Mock).mockReturnValue(client);
      (AccountModel.findById as jest.Mock).mockReturnValue(account);
      (MovementModel.findByAccountId as jest.Mock).mockReturnValue(movements);

      req.params = { clientId: clientId.toString(), accountId: accountId.toString() };
      account.movements = movements;
      client.accounts = [account];

      await getMovementsForClientAccount(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(json).toHaveBeenCalledWith(client);
    });

    it('should return error when client does not exist', async () => {
      (ClientModel.findById as jest.Mock).mockReturnValue(undefined);

      req.params = { clientId: '1', accountId: '2' };

      await getMovementsForClientAccount(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
      expect(json).toHaveBeenCalledWith({ message: ERROR_MESSAGES.CLIENT_NOT_FOUND });
    });

    it('should return error when account does not exist for the client', async () => {
      const clientId = 1;
      (ClientModel.findById as jest.Mock).mockReturnValue({ id: clientId } as Client);
      (AccountModel.findById as jest.Mock).mockReturnValue(undefined);

      req.params = { clientId: clientId.toString(), accountId: '2' };

      await getMovementsForClientAccount(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
      expect(json).toHaveBeenCalledWith({ message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND });
    });
  });

  describe('createMovement', () => {
    it('should create a new movement when account exists', async () => {
      const accountId = 1;
      const account: Account = { id: accountId, accountNumber: '123', balance: 1000, clientId: 1 };
      const newMovement: Movement = { id: 1, quantity: 500, date: Date.now(), accountId };
      const reqBody = { quantity: 500, date: Date.now() };

      (AccountModel.findById as jest.Mock).mockReturnValue(account);
      (AccountModel.updateBalance as jest.Mock).mockReturnValue(true);
      (MovementModel.create as jest.Mock).mockReturnValue(newMovement);

      req.params = { accountId: accountId.toString() };
      req.body = reqBody;

      account.movements?.push(newMovement);
      await createMovement(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
      expect(json).toHaveBeenCalledWith(account);
    });

    it('should return error when account does not exist', async () => {
      (AccountModel.findById as jest.Mock).mockReturnValue(undefined);

      req.params = { accountId: '1' };
      req.body = { quantity: 500, date: Date.now() };

      await createMovement(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
      expect(json).toHaveBeenCalledWith({ message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND });
    });

    it('should return error when movement creation fails', async () => {
      const accountId = 1;
      const account: Account = { id: accountId, accountNumber: '123', balance: 1000, clientId: 1 };
      const reqBody = { quantity: 500, date: Date.now() };

      (AccountModel.findById as jest.Mock).mockReturnValue(account);
      (MovementModel.create as jest.Mock).mockReturnValue(undefined);

      req.params = { accountId: accountId.toString() };
      req.body = reqBody;

      await createMovement(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
      expect(json).toHaveBeenCalledWith({ message: ERROR_MESSAGES.VALIDATION_FAILED });
    });
  });

  describe('deleteMovement', () => {
    it('should delete movement when movement exists', async () => {
      const movementId = 1;
      const existingMovement: Movement = { id: movementId, quantity: 300, date: Date.now(), accountId: 1 };

      (MovementModel.findById as jest.Mock).mockReturnValue(existingMovement);
      (MovementModel.delete as jest.Mock).mockReturnValue(true);

      req.params = { movementId: movementId.toString() };

      await deleteMovement(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.NO_CONTENT);
      expect(send).toHaveBeenCalledWith(null);
    });

    it('should return error when movement does not exist', async () => {
      (MovementModel.findById as jest.Mock).mockReturnValue(undefined);

      req.params = { movementId: '1' };

      await deleteMovement(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
      expect(send).toHaveBeenCalledWith({ message: ERROR_MESSAGES.MOVEMENT_NOT_FOUND });
    });

    it('should return error when movement deletion fails', async () => {
      const movementId = 1;
      const existingMovement: Movement = { id: movementId, quantity: 300, date: Date.now(), accountId: 1 };

      (MovementModel.findById as jest.Mock).mockReturnValue(existingMovement);
      (MovementModel.delete as jest.Mock).mockReturnValue(false);

      req.params = { movementId: movementId.toString() };

      await deleteMovement(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      expect(send).toHaveBeenCalledWith({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
  });
});
