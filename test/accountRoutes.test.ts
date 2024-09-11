import request from 'supertest';
import express from 'express';
import accountRoutes from '../src/routes/accountRoutes';
import { Account, AccountModel } from '../src/models/account';
import { MovementModel, Movement } from '../src/models/movement';
import { HTTP_STATUS, ERROR_MESSAGES } from '../src/constants';

// Configuración del servidor Express para las pruebas
const app = express();
app.use(express.json());
app.use('/api', accountRoutes);

describe('Account Routes', () => {
  beforeEach(() => {
    // Limpiar la base de datos simulada antes de cada prueba
    (AccountModel as any).accounts = [];
    (MovementModel as any).movements = [];
  });

  describe('PUT /accounts/:accountId', () => {
    it('should update an account when it exists', async () => {
      const accountId = 1;
      const initialAccount = { id: accountId, accountNumber: '123456', balance: 1000, clientId: 1 };
      (AccountModel as any).accounts.push(initialAccount);

      const updateData = { balance: 1500 };

      const response = await request(app)
        .put(`/api/accounts/${accountId}`)
        .send(updateData);

      expect(response.status).toBe(HTTP_STATUS.OK);
      expect(response.body).toMatchObject({ id: accountId, ...updateData });
    });

    it('should return an error when the account does not exist', async () => {
      const accountId = 999;
      const updateData = { balance: 1500 };

      const response = await request(app)
        .put(`/api/accounts/${accountId}`)
        .send(updateData);

      expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
      expect(response.body).toEqual({ message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND });
    });
  });

  describe('DELETE /accounts/:accountId', () => {
    it('should delete an account when it exists', async () => {
      const accountId = 1;
      const account = { id: accountId, accountNumber: '123456', balance: 1000, clientId: 1 };
      (AccountModel as any).accounts.push(account);

      const response = await request(app)
        .delete(`/api/accounts/${accountId}`);

      expect(response.status).toBe(HTTP_STATUS.NO_CONTENT);
      expect(response.body).toEqual({});
    });

    it('should return an error when the account does not exist', async () => {
      const accountId = 999;

      const response = await request(app)
        .delete(`/api/accounts/${accountId}`);

      expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
      expect(response.body).toEqual({ message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND });
    });
  });

  describe('GET /accounts/:accountId/movements', () => {
    it('should return all movements of an account when the account exists', async () => {
      const accountId = 1;
      const account = { id: accountId, accountNumber: '123456', balance: 1000, clientId: 1 };
      const movements = [
        { id: 1, quantity: 100, date: Date.now(), accountId },
        { id: 2, quantity: -50, date: Date.now(), accountId }
      ];
      (AccountModel as any).accounts.push(account);
      (MovementModel as any).movements = movements;

      const response = await request(app)
        .get(`/api/accounts/${accountId}/movements`);

      expect(response.status).toBe(HTTP_STATUS.OK);
      expect(response.body).toMatchObject({ id: accountId });
      expect(response.body.movements).toEqual(movements);
    });

    it('should return an error when the account does not exist', async () => {
      const accountId = 999;

      const response = await request(app)
        .get(`/api/accounts/${accountId}/movements`);

      expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
      expect(response.body).toEqual({ message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND });
    });
  });

  describe('POST /accounts/:accountId/movements', () => {
    it('should create a new movement when the account exists', async () => {
      const accountId = 1;
      const account: Account = { id: accountId, accountNumber: '123456', balance: 1000, clientId: 1, movements: [] };
      (AccountModel as any).accounts.push(account);
      const date:number = Date.now();
      const movementData = { quantity: 200, date};
      const validMovement: Movement = { id: 1, ...movementData, accountId, date };

      const createMovementMock = jest.spyOn(MovementModel, 'create').mockImplementation((data) => {
        return { id: 1, ...data, accountId };
      });
      const findByAccountIdMock = jest.spyOn(MovementModel, 'findByAccountId').mockImplementation((_data) => {
        return [validMovement];
      });
      const updateAccountBalanceMock = jest.spyOn(AccountModel, 'updateBalance').mockImplementation((data) => {
        account.balance += movementData.quantity;
        account.movements?.push(validMovement);
        return true;
      });
      const findAccountMock = jest.spyOn(AccountModel, 'findById').mockImplementation((data) => {
        return account;
      });

      
      const response = await request(app)
        .post(`/api/accounts/${accountId}/movements`)
        .send(movementData);

      expect(response.status).toBe(HTTP_STATUS.CREATED);
      expect(response.body).toMatchObject(account);
      expect(Array.isArray(response.body.movements)).toBe(true);

      createMovementMock.mockRestore();
      findByAccountIdMock.mockRestore();
      updateAccountBalanceMock.mockRestore();
      findAccountMock.mockRestore();
    });

    it('should return an error when the account does not exist', async () => {
      const accountId = 999;
      const movementData = { quantity: 200 };

      const response = await request(app)
        .post(`/api/accounts/${accountId}/movements`)
        .send(movementData);

      expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
      expect(response.body).toEqual({ message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND });
    });

    it('should return an error when creating a movement fails', async () => {
      const accountId = 1;
      const account = { id: accountId, accountNumber: '123456', balance: 1000, clientId: 1 };
      (AccountModel as any).accounts.push(account);

      jest.spyOn(MovementModel, 'create').mockImplementation(() => {
        return undefined;
      });

      const movementData = { quantity: 200 };

      const response = await request(app)
        .post(`/api/accounts/${accountId}/movements`)
        .send(movementData);

      expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
      expect(response.body).toEqual({ message: ERROR_MESSAGES.VALIDATION_FAILED });
    });
  });
});
