import { ClientModel, Client } from '../src/models/client';

describe('ClientModel', () => {
  beforeEach(() => {
    ClientModel.delete(1)
  });

  describe('validate', () => {
    it('should return true for valid client data', () => {
      const validClient: Partial<Client> = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
      };

      expect(ClientModel.validate(validClient)).toBe(true);
    });

    it('should return false for invalid client data', () => {
      const invalidClient: Partial<Client> = {
        name: 'John Doe',
        email: 'invalid-email',
        phone: 'short',
      };

      expect(ClientModel.validate(invalidClient)).toBe(false);
    });
  });

  describe('create', () => {
    it('should create and return a new client', () => {
      const clientData = { name: 'Jane Doe', email: 'jane@example.com', phone: '0987654321' };
      const newClient = ClientModel.create(clientData);

      expect(newClient).toBeDefined();
      expect(newClient).toMatchObject(clientData);
      expect(newClient).toHaveProperty('id', 1);
      expect(ClientModel.findAll()).toHaveLength(1);
    });

    it('should return undefined for invalid client data', () => {
      const invalidData = { name: 'Invalid', email: '', phone: 'short' };
      const result = ClientModel.create(invalidData);

      expect(result).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update and return an existing client', () => {
      const client: Client = { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890' };
      (ClientModel as any).clients.push(client);

      const updatedData = { name: 'John Updated' };
      const updatedClient = ClientModel.update(1, updatedData);

      expect(updatedClient).toBeDefined();
      expect(updatedClient).toHaveProperty('name', 'John Updated');
    });

    it('should return undefined if client does not exist', () => {
      const updatedClient = ClientModel.update(999, { name: 'Nonexistent' });
      expect(updatedClient).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('should delete an existing client', () => {
      const client: Client = { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890' };
      (ClientModel as any).clients.push(client);

      const result = ClientModel.delete(1);
      expect(result).toBe(true);
      expect(ClientModel.findAll()).toHaveLength(0);
    });

    it('should return false if client does not exist', () => {
      const result = ClientModel.delete(999);
      expect(result).toBe(false);
    });
  });
});
