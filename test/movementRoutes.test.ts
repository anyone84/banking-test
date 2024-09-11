import request from 'supertest';
import express, { Application } from 'express';
import movementRoutes from '../src/routes/movementRoutes';
import { MovementModel, Movement } from '../src/models/movement';
import { HTTP_STATUS, ERROR_MESSAGES } from '../src/constants';

// Configuración del servidor Express para las pruebas
const app: Application = express();
app.use(express.json());
app.use('/api', movementRoutes);

describe('Movement Routes', () => {
  beforeEach(() => {
    // Limpiar la base de datos simulada antes de cada prueba
    (MovementModel as any).movements = [];
  });

  describe('DELETE /api/movements/:movementId', () => {
    it('should delete an existing movement', async () => {
      // Arrange
      const movement: Movement = {
        id: 1,
        quantity: 100,
        date: Date.now(),
        accountId: 1,
      };
      (MovementModel as any).movements.push(movement);

      // Act
      const res = await request(app).delete('/api/movements/1');

      // Assert
      expect(res.status).toBe(HTTP_STATUS.NO_CONTENT);
      expect((MovementModel as any).movements).toHaveLength(0);
    });

    it('should return 404 if movement does not exist', async () => {
      // Act
      const res = await request(app).delete('/api/movements/999');

      // Assert
      expect(res.status).toBe(HTTP_STATUS.NOT_FOUND);
      expect(res.body).toEqual({ message: ERROR_MESSAGES.MOVEMENT_NOT_FOUND });
    });
  });
});
