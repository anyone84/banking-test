import { Request, Response } from 'express';
import { getClients, getClientById, createClient, updateClient, deleteClient } from '../src/controllers/clientController';
import { ClientModel, Client } from '../src/models/client';
import { HTTP_STATUS, ERROR_MESSAGES } from '../src/constants';

jest.mock('../src/models/client');

describe('ClientController', () => {
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

  describe('getClients', () => {
    it('should return all clients', async () => {
      const clients: Client[] = [
        { id: 1, name: 'Client1', email: 'client1@example.com', phone: '1234567890' },
        { id: 2, name: 'Client2', email: 'client2@example.com', phone: '0987654321' }
      ];

      (ClientModel.findAll as jest.Mock).mockReturnValue(clients);

      await getClients(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(json).toHaveBeenCalledWith(clients);
    });
  });

  describe('getClientById', () => {
    it('should return client when client exists', async () => {
      const id = 1;
      const client: Client = { id, name: 'Client1', email: 'client1@example.com', phone: '1234567890' };

      (ClientModel.findById as jest.Mock).mockReturnValue(client);

      req.params = { id: id.toString() };

      await getClientById(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(json).toHaveBeenCalledWith(client);
    });

    it('should return error when client does not exist', async () => {
      (ClientModel.findById as jest.Mock).mockReturnValue(undefined);

      req.params = { id: '1' };

      await getClientById(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
      expect(json).toHaveBeenCalledWith({ message: ERROR_MESSAGES.CLIENT_NOT_FOUND });
    });
  });

  describe('createClient', () => {
    it('should create a new client', async () => {
      const newClient: Client = { id: 1, name: 'Client1', email: 'client1@example.com', phone: '1234567890' };
      const reqBody = { name: 'Client1', email: 'client1@example.com', phone: '1234567890' };

      (ClientModel.create as jest.Mock).mockReturnValue(newClient);

      req.body = reqBody;

      await createClient(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
      expect(json).toHaveBeenCalledWith(newClient);
    });

    it('should return error when client creation fails', async () => {
      const reqBody = { name: 'Client1', email: 'client1@example.com', phone: '1234567890' };

      (ClientModel.create as jest.Mock).mockReturnValue(undefined);

      req.body = reqBody;

      await createClient(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
      expect(json).toHaveBeenCalledWith({ message: ERROR_MESSAGES.VALIDATION_FAILED });
    });
  });

  describe('updateClient', () => {
    it('should update client when client exists', async () => {
      const id = 1;
      const existingClient: Client = { id, name: 'Client1', email: 'client1@example.com', phone: '1234567890' };
      const updatedClient: Client = { id, name: 'UpdatedClient', email: 'updated@example.com', phone: '1111111111' };
      const reqBody = { name: 'UpdatedClient', email: 'updated@example.com', phone: '1111111111' };

      (ClientModel.findById as jest.Mock).mockReturnValue(existingClient);
      (ClientModel.update as jest.Mock).mockReturnValue(updatedClient);

      req.params = { id: id.toString() };
      req.body = reqBody;

      await updateClient(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(json).toHaveBeenCalledWith(updatedClient);
    });

    it('should return error when client does not exist', async () => {
      (ClientModel.findById as jest.Mock).mockReturnValue(undefined);

      req.params = { id: '1' };
      req.body = { name: 'UpdatedClient', email: 'updated@example.com', phone: '1111111111' };

      await updateClient(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
      expect(json).toHaveBeenCalledWith({ message: ERROR_MESSAGES.CLIENT_NOT_FOUND });
    });

    it('should return error when client update fails', async () => {
      const id = 1;
      const existingClient: Client = { id, name: 'Client1', email: 'client1@example.com', phone: '1234567890' };
      const reqBody = { name: 'UpdatedClient', email: 'updated@example.com', phone: '1111111111' };

      (ClientModel.findById as jest.Mock).mockReturnValue(existingClient);
      (ClientModel.update as jest.Mock).mockReturnValue(undefined);

      req.params = { id: id.toString() };
      req.body = reqBody;

      await updateClient(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
      expect(json).toHaveBeenCalledWith({ message: ERROR_MESSAGES.VALIDATION_FAILED });
    });
  });

  describe('deleteClient', () => {
    it('should delete client when client exists', async () => {
      const id = 1;
      const existingClient: Client = { id, name: 'Client1', email: 'client1@example.com', phone: '1234567890' };

      (ClientModel.findById as jest.Mock).mockReturnValue(existingClient);
      (ClientModel.delete as jest.Mock).mockReturnValue(true);

      req.params = { id: id.toString() };

      await deleteClient(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.NO_CONTENT);
      expect(send).toHaveBeenCalledWith(null);
    });

    it('should return error when client does not exist', async () => {
      (ClientModel.findById as jest.Mock).mockReturnValue(undefined);

      req.params = { id: '1' };

      await deleteClient(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
      expect(send).toHaveBeenCalledWith({ message: ERROR_MESSAGES.CLIENT_NOT_FOUND });
    });

    it('should return error when client deletion fails', async () => {
      const id = 1;
      const existingClient: Client = { id, name: 'Client1', email: 'client1@example.com', phone: '1234567890' };

      (ClientModel.findById as jest.Mock).mockReturnValue(existingClient);
      (ClientModel.delete as jest.Mock).mockReturnValue(false);

      req.params = { id: id.toString() };

      await deleteClient(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      expect(send).toHaveBeenCalledWith({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
  });
});
