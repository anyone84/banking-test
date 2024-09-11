// src/controllers/accountController.ts
import { Request, Response } from "express";
import { AccountModel, Account } from "../models/account";
import { ClientModel, Client } from "../models/client";
import { HTTP_STATUS, ERROR_MESSAGES } from "../constants";

// Obtener todas las cuentas de un cliente
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

// Crear una nueva cuenta para un cliente
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

// Actualizar una cuenta
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

// Eliminar una cuenta
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
