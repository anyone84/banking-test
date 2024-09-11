import request from 'supertest';
import express, { Application } from 'express';
import clientRoutes from '../src/routes/clientRoutes';
import { ClientModel, Client } from '../src/models/client';
import { HTTP_STATUS, ERROR_MESSAGES } from '../src/constants';

// Configuración del servidor Express para las pruebas
const app: Application = express();
app.use(express.json());
app.use('/api', clientRoutes);

describe('Client Routes', () => {
  beforeEach(() => {
    // Limpiar la base de datos simulada antes de cada prueba
    (ClientModel as any).clients = [];
  });

  describe('GET /api/clients', () => {
    it('should return all clients', async () => {
      // Arrange
      const dummyClients: Client[] = [
        {
          id: 1,
          name: 'Client One',
          email: 'one@example.com',
          phone: '1111111111',
        },
        {
          id: 2,
          name: 'Client Two',
          email: 'two@example.com',
          phone: '2222222222',
        },
      ];
      (ClientModel as any).clients.push(...dummyClients);

      // Act
      const res = await request(app).get('/api/clients');

      // Assert
      expect(res.status).toBe(HTTP_STATUS.OK);
      expect(res.body).toEqual(dummyClients);
    });
  });

  describe('GET /api/clients/:id', () => {
    it('should return a client by ID', async () => {
      // Arrange
      const client: Client = {
        id: 1,
        name: 'Client One',
        email: 'one@example.com',
        phone: '1111111111',
      };
      (ClientModel as any).clients.push(client);

      // Act
      const res = await request(app).get('/api/clients/1');

      // Assert
      expect(res.status).toBe(HTTP_STATUS.OK);
      expect(res.body).toEqual(client);
    });

    it('should return 404 if client does not exist', async () => {
      // Act
      const res = await request(app).get('/api/clients/999');

      // Assert
      expect(res.status).toBe(HTTP_STATUS.NOT_FOUND);
      expect(res.body).toEqual({ message: ERROR_MESSAGES.CLIENT_NOT_FOUND });
    });
  });

  describe('POST /api/clients', () => {
    it('should create a new client', async () => {
      // Arrange
      const newClient = {
        name: 'New Client',
        email: 'new@example.com',
        phone: '3333333333',
      };

      // Act
      const res = await request(app).post('/api/clients').send(newClient);

      // Assert
      expect(res.status).toBe(HTTP_STATUS.CREATED);
      expect(res.body).toMatchObject(newClient);
      expect(res.body).toHaveProperty('id');
      expect((ClientModel as any).clients).toHaveLength(1);
    });
  });

  describe('PUT /api/clients/:id', () => {
    it('should update an existing client', async () => {
      // Arrange
      const client: Client = {
        id: 1,
        name: 'Client One',
        email: 'one@example.com',
        phone: '1111111111',
      };
      (ClientModel as any).clients.push(client);
      const updatedData = {
        name: 'Updated Client',
        email: 'updated@example.com',
        phone: '9999999999',
      };

      // Act
      const res = await request(app).put('/api/clients/1').send(updatedData);

      // Assert
      expect(res.status).toBe(HTTP_STATUS.OK);
      expect(res.body).toMatchObject({ id: 1, ...updatedData });
      expect((ClientModel as any).clients[0]).toEqual({ id: 1, ...updatedData });
    });

    it('should return 404 if client does not exist', async () => {
      // Arrange
      const updatedData = {
        name: 'Non-existent',
        email: 'nonexistent@example.com',
        phone: '0000000000',
      };

      // Act
      const res = await request(app).put('/api/clients/999').send(updatedData);

      // Assert
      expect(res.status).toBe(HTTP_STATUS.NOT_FOUND);
      expect(res.body).toEqual({ message: ERROR_MESSAGES.CLIENT_NOT_FOUND });
    });
  });

  describe('DELETE /api/clients/:id', () => {
    it('should delete an existing client', async () => {
      // Arrange
      const client: Client = {
        id: 1,
        name: 'Client One',
        email: 'one@example.com',
        phone: '1111111111',
      };
      (ClientModel as any).clients.push(client);

      // Act
      const res = await request(app).delete('/api/clients/1');

      // Assert
      expect(res.status).toBe(HTTP_STATUS.NO_CONTENT);
      expect((ClientModel as any).clients).toHaveLength(0);
    });

    it('should return 404 if client does not exist', async () => {
      // Act
      const res = await request(app).delete('/api/clients/999');

      // Assert
      expect(res.status).toBe(HTTP_STATUS.NOT_FOUND);
      expect(res.body).toEqual({ message: ERROR_MESSAGES.CLIENT_NOT_FOUND });
    });
  });
});
