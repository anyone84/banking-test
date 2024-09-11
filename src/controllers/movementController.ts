import { Request, Response } from "express";
import { AccountModel, Account } from "../models/account";
import { MovementModel, Movement } from "../models/movement";
import { ClientModel, Client } from "../models/client";
import { HTTP_STATUS, ERROR_MESSAGES } from "../constants";

/**
 * Get all movements for a specific account.
 * 
 * @param req - Express request object containing the account ID in the URL parameters.
 * @param res - Express response object to send the response.
 * 
 * @returns A JSON response with the account details and its movements if found,
 * or an error message if the account is not found.
 */
export const getMovementsByAccountId = (req: Request, res: Response) => {
  const accountId: number = parseInt(req.params.accountId);
  const account: Account | undefined = AccountModel.findById(accountId);
  let status: number = HTTP_STATUS.OK;
  let data: any = {};

  if (!account) {
    status = HTTP_STATUS.NOT_FOUND;
    data = { message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND };
  } else {
    const accountMovements: Movement[] = MovementModel.findByAccountId(accountId);
    status = HTTP_STATUS.OK;
    data = account;
    data.movements = accountMovements;
  }

  res.status(status).json(data);
};

/**
 * Get movements for a specific account belonging to a client.
 * 
 * @param req - Express request object containing the client ID and account ID in the URL parameters.
 * @param res - Express response object to send the response.
 * 
 * @returns A JSON response with the client details, and the account along with its movements if both are found,
 * or error messages if the client or account are not found.
 */
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
      const accountMovements: Movement[] | undefined = MovementModel.findByAccountId(accountId);
      
      account.movements = accountMovements;
      data = client;
      data.accounts = [account];
    }
  }

  res.status(status).json(data);
};

/**
 * Create a new movement for a specific account. This method modify the balance of the account adding or substracting the quantity value of the movement.
 * 
 * @param req - Express request object containing the account ID in the URL parameters and movement details in the request body.
 * @param res - Express response object to send the response.
 * 
 * @returns A JSON response with the updated account details if the movement is created successfully,
 * or an error message if the account is not found, movement creation fails, or balance update fails.
 */
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

/**
 * Delete a specific movement.
 * 
 * @param req - Express request object containing the movement ID in the URL parameters.
 * @param res - Express response object to send the response.
 * 
 * @returns An empty response with a status of 204 (No Content) if the movement is successfully deleted,
 * or an error message if the movement is not found or the deletion fails.
 */
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
