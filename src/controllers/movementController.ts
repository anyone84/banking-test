// src/controllers/movementController.ts
import { Request, Response } from "express";
import { AccountModel, Account } from "../models/account";
import { MovementModel, Movement } from "../models/movement";
import { ClientModel, Client } from "../models/client";
import { HTTP_STATUS, ERROR_MESSAGES } from "../constants";

// Obtener todos los movimientos de una cuenta
export const getMovementsByAccountId = (req: Request, res: Response) => {
  const accountId: number = parseInt(req.params.accountId);
  const account: Account | undefined = AccountModel.findById(accountId);
  let status: number = HTTP_STATUS.OK;
  let data: any = {};

  if (!account) {
    status = HTTP_STATUS.NOT_FOUND;
    data = { message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND };
  } else {
    const accountMovements: Movement[] =
      MovementModel.findByAccountId(accountId);
    status = HTTP_STATUS.OK;
    data = account;
    data.movements = accountMovements;
  }

  res.status(status).json(data);
};

export const getMovementsForClientAccount = (req: Request, res: Response) => {
  const clientId: number = parseInt(req.params.clientId);
  const accountId: number = parseInt(req.params.accountId);
  const client: Client | undefined = ClientModel.findById(clientId);
  let status: number = HTTP_STATUS.OK;
  let data: any = {};

  if (!client) {
    status = HTTP_STATUS.NOT_FOUND;
    data = { message: ERROR_MESSAGES.CLIENT_NOT_FOUND };
  } else {
    const account: Account | undefined = AccountModel.findById(accountId);
    if (!account) {
      status = HTTP_STATUS.NOT_FOUND;
      data = { message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND };
    } else {
      const accountMovements: Movement[] | undefined =
        MovementModel.findByAccountId(accountId);
      const auxData: any = account;
      auxData.movements = accountMovements;
      data = client;
      data.accounts = auxData;
    }
  }

  res.status(status).json(data);
};

// Crear un nuevo movimiento para una cuenta
export const createMovement = (req: Request, res: Response) => {
  const accountId: number = parseInt(req.params.accountId);
  const account: Account | undefined = AccountModel.findById(accountId);
  let status: number = HTTP_STATUS.OK;
  let data: any = {};

  if (!account) {
    status = HTTP_STATUS.NOT_FOUND;
    data = { message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND };
  } else {
    const { quantity } = req.body;
    const newMovement: Movement | undefined = MovementModel.create({
      quantity,
      date: Date.now(),
      accountId,
    });
    if (!newMovement) {
      console.log(3);
      status = HTTP_STATUS.BAD_REQUEST;
      data = { message: ERROR_MESSAGES.VALIDATION_FAILED };
    } else {
      if (!AccountModel.updateBalance(accountId, quantity)) {
        MovementModel.delete(newMovement.id);
        status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        data = { message: ERROR_MESSAGES.SERVER_ERROR };
      } else {
        status = HTTP_STATUS.CREATED;
        data = AccountModel.findById(accountId);
        account.movements = MovementModel.findByAccountId(accountId);
      }
    }
  }
  res.status(status).json(data);
};

// Eliminar un movimiento
export const deleteMovement = (req: Request, res: Response) => {
  const movementId: number = parseInt(req.params.movementId);
  const movement: Movement | undefined = MovementModel.findById(movementId);
  let status: number = HTTP_STATUS.OK;
  let data: any = {};

  if (!movement) {
    status = HTTP_STATUS.NOT_FOUND;
    data = { message: ERROR_MESSAGES.MOVEMENT_NOT_FOUND };
  } else if (MovementModel.delete(movementId)) {
    status = HTTP_STATUS.NO_CONTENT;
    data = null;
  } else {
    status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    data = { message: ERROR_MESSAGES.SERVER_ERROR };
  }

  res.status(status).send(data);
};
