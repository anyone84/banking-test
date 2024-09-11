import { AccountModel } from "./account";

/**
 * Interface representing a movement.
 */
export interface Movement {
  id: number;         // Unique identifier for the movement
  quantity: number;  // Amount of the movement, can be positive or negative
  date: number;      // Timestamp of the movement
  accountId: number; // ID of the associated account
}

/**
 * Class responsible for managing movements.
 */
export class MovementModel {
  private static movements: Movement[] = []; // In-memory storage for movements

  /**
   * Validates the given movement data.
   * 
   * @param movement - Partial movement object to validate.
   * @returns A boolean indicating whether the movement data is valid.
   */
  static validate(movement: Partial<Movement>): boolean {
    if (movement.quantity === undefined || typeof movement.quantity !== "number") {
      return false;
    }
    if (!movement.date || typeof movement.date !== "number" || (new Date(movement.date)).getTime() <= 0) {
      return false;
    }
    if (!movement.accountId || typeof movement.accountId !== "number" || !AccountModel.findById(movement.accountId)) {
      return false;
    }
    return true;
  }

  /**
   * Finds movements associated with a specific account ID.
   * 
   * @param accountId - The ID of the account to find movements for.
   * @returns An array of movements associated with the specified account ID.
   */
  static findByAccountId(accountId: number): Movement[] {
    return JSON.parse(JSON.stringify(
      MovementModel.movements.filter(
        (movement) => movement.accountId === accountId
      )
    ));
  }

  /**
   * Finds a movement by its unique identifier.
   * 
   * @param id - The ID of the movement to find.
   * @returns The movement with the given ID, or undefined if not found.
   */
  static findById(id: number): Movement | undefined {
    const movement: Movement | undefined = MovementModel.movements.find((movement) => movement.id === id);
    return movement ? JSON.parse(JSON.stringify(movement)) : movement;
  }

  /**
   * Creates a new movement with the provided data. 
   * 
   * @param movementData - The data to create the new movement.
   * @returns The newly created movement, or undefined if validation fails.
   */
  static create(movementData: any): Movement | undefined {
    const date: number = Date.now();
    
    movementData.date = movementData.date || date;
    if (!this.validate(movementData)) {
      return undefined;
    }

    const newMovement: Movement = {
      id: MovementModel.movements.length + 1,
      quantity: movementData.quantity,
      date: movementData.date,
      accountId: movementData.accountId,
    };

    this.movements.push(newMovement);
    return JSON.parse(JSON.stringify(newMovement));
  }

  /**
   * Deletes a movement by its unique identifier.
   * 
   * @param id - The ID of the movement to delete.
   * @returns A boolean indicating whether the movement was successfully deleted.
   */
  static delete(id: number): boolean {
    const index: number = MovementModel.movements.findIndex(
      (movement) => movement.id === id
    );
    if (index !== -1) {
      MovementModel.movements.splice(index, 1);
      return true;
    }
    return false;
  }
}
