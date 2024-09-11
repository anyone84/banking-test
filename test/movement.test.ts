import { MovementModel, Movement } from '../src/models/movement';
import { AccountModel } from '../src/models/account';


describe('MovementModel', () => {
  beforeEach(() => {
    MovementModel.delete(1);
    AccountModel.delete(1);
  });

  describe('validate', () => {
    it('should return true for valid movement data', () => {
      const validMovement: Partial<Movement> = {
        quantity: 500,
        date: Date.now(),
        accountId: 1,
      };

      expect(MovementModel.validate(validMovement)).toBe(true);
    });

    it('should return false for invalid movement data', () => {
      const invalidMovement: Partial<Movement> = {
        quantity: 'invalid' as any,
        date: 'not-a-date' as any,
        accountId: 999, // Non-existent account
      };

      expect(MovementModel.validate(invalidMovement)).toBe(false);
    });
  });

  describe('create', () => {
    it('should create and return a new movement', () => {
      const movementData: Movement = {
        quantity: 500,
        date: Date.now(),
        accountId: 1,
        id: 1, // Añadir id si es necesario para el modelo
      };
      const newMovement = MovementModel.create(movementData);     
      expect(newMovement).toBeDefined();
      expect(newMovement).toMatchObject(movementData);
      expect(newMovement).toHaveProperty('id', 1);
      expect(MovementModel.findByAccountId(1)).toHaveLength(1);
    });

    it('should return undefined for invalid movement data', () => {
      const invalidData: Partial<Movement> = {
        quantity: 'invalid' as any,
        date: 'not-a-date' as any,
        accountId: 999,
      };
      const result = MovementModel.create(invalidData);

      expect(result).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('should delete an existing movement', () => {
      const movement: Movement = {
        id: 1,
        quantity: 500,
        date: Date.now(),
        accountId: 1,
      };

      MovementModel.create(movement);

      const result = MovementModel.delete(1);
      expect(result).toBe(true);
      expect(MovementModel.findByAccountId(1)).toHaveLength(0);
    });

    it('should return false if movement does not exist', () => {
      const result = MovementModel.delete(999);
      expect(result).toBe(false);
    });
  });
});
