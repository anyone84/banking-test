import { Request, Response } from "express";
import { AccountModel, Account } from "../models/account";
import { ClientModel, Client } from "../models/client";
import { HTTP_STATUS, ERROR_MESSAGES } from "../constants";

/**
 * Get all accounts associated with a specific client ID.
 * 
 * @param req - Express request object containing the client ID in the URL parameters.
 * @param res - Express response object to send the response.
 * 
 * @returns A JSON response with the client information and their associated accounts,
 * or an error message if the client is not found.
 */
export const getAccountsByClientId = (req: Request, res: Response) => {
  const clientId: number = parseInt(req.params.clientId);
  const client: Client | undefined = ClientModel.findById(clientId);
  let status: number = HTTP_STATUS.OK;
  let data: any = {};

  if (!client) {  
    status = HTTP_STATUS.NOT_FOUND;
    data = { message: ERROR_MESSAGES.CLIENT_NOT_FOUND };
  } else {
    const clientAccounts: Account[] = AccountModel.findByClientId(clientId);
    status = HTTP_STATUS.OK;
    data = client;
    data.accounts = clientAccounts;
  }
  res.status(status).json(data);
};

/**
 * Create a new account for a specific client.
 * 
 * @param req - Express request object containing the client ID in the URL parameters and account details in the request body.
 * @param res - Express response object to send the response.
 * 
 * @returns A JSON response with the newly created account,
 * or an error message if the client is not found or the account creation fails.
 */
export const createAccount = (req: Request, res: Response) => {
  const clientId: number = parseInt(req.params.clientId);
  const client: Client | undefined = ClientModel.findById(clientId);
  const { accountNumber, balance } = req.body;
  let status: number = HTTP_STATUS.OK;
  let data: any = {};

  if (!client) {
    status = HTTP_STATUS.NOT_FOUND;
    data = { message: ERROR_MESSAGES.CLIENT_NOT_FOUND };
  } else {
    const newAccount: Account | undefined = AccountModel.create({
      accountNumber,
      balance,
      clientId,
    });
    if (!newAccount) {
      status = HTTP_STATUS.BAD_REQUEST;
      data = { message: ERROR_MESSAGES.VALIDATION_FAILED };
    } else {
      status = HTTP_STATUS.CREATED;
      data = newAccount;
    }
  }
  res.status(status).json(data);
};

/**
 * Update an existing account.
 * 
 * @param req - Express request object containing the account ID in the URL parameters and updated account details in the request body.
 * @param res - Express response object to send the response.
 * 
 * @returns A JSON response with the updated account,
 * or an error message if the account is not found or the update fails.
 */
export const updateAccount = (req: Request, res: Response) => {
  const accountId = parseInt(req.params.accountId);
  const account = AccountModel.findById(accountId);
  let status: number = HTTP_STATUS.OK;
  let data: any = {};

  if (!account) {
    status = HTTP_STATUS.NOT_FOUND;
    data = { message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND };
  } else {
    const { accountNumber, balance } = req.body;
    const updatedAccount: Account | undefined = AccountModel.update(accountId, {
      accountNumber,
      balance,
    });
    if (!updatedAccount) {
      status = HTTP_STATUS.BAD_REQUEST;
      data = { message: ERROR_MESSAGES.VALIDATION_FAILED };
    } else {
      status = HTTP_STATUS.OK;
      data = updatedAccount;
    }
  }
  res.status(status).json(data);
};

/**
 * Delete an existing account.
 * 
 * @param req - Express request object containing the account ID in the URL parameters.
 * @param res - Express response object to send the response.
 * 
 * @returns An empty response with a status of 204 (No Content) if the account is successfully deleted,
 * or an error message if the account is not found or the deletion fails.
 */
export const deleteAccount = (req: Request, res: Response) => {
  const accountId = parseInt(req.params.accountId);
  const account = AccountModel.findById(accountId);
  let status: number = HTTP_STATUS.OK;
  let data: any = {};

  if (!account) {
    status = HTTP_STATUS.NOT_FOUND;
    data = { message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND };
  } else if (AccountModel.delete(accountId)) {
    status = HTTP_STATUS.NO_CONTENT;
    data = null;
  } else {
    status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    data = { message: ERROR_MESSAGES.SERVER_ERROR };
  }

  res.status(status).send(data);
};
