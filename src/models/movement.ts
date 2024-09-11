import { AccountModel } from "./account";

export interface Movement {
  id: number;
  quantity: number; // Positiva o negativa
  date: number; // Timestamp
  accountId: number; // Relación con la cuenta
}

export class MovementModel {
  private static movements: Movement[] = [];

  static validate(movement: Partial<Movement>): boolean {
    if (
      movement.quantity === undefined ||
      typeof movement.quantity !== "number"
    ) {
      return false;
    }
    if (
      !movement.date ||
      (typeof movement.date !== "number") ||
      (new Date(movement.date)).getTime() <= 0
    ) {
      return false;
    }
    if (!movement.accountId || typeof movement.accountId !== "number") {
      return false;
    }
    return true;
  }

  static findByAccountId(accountId: number): Movement[] {
    return JSON.parse(JSON.stringify(
      MovementModel.movements.filter(
        (movement) => movement.accountId === accountId
      )
    ));
  }

  static findById(id: number): Movement | undefined {
    const movement: Movement | undefined = MovementModel.movements.find((movement) => movement.id === id)
    return movement ? JSON.parse(JSON.stringify(movement)) : movement;
  }

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

  static delete(id: number): boolean {
    const index = MovementModel.movements.findIndex(
      (movement) => movement.id === id
    );
    if (index !== -1) {
      MovementModel.movements.splice(index, 1);
      return true;
    }
    return false;
  }
}
