import { Request, Response } from "express";
import { ClientModel, Client } from "../models/client";
import { HTTP_STATUS, ERROR_MESSAGES } from "../constants";

/**
 * Get all clients.
 * 
 * @param req - Express request object.
 * @param res - Express response object to send the response.
 * 
 * @returns A JSON response with a list of all clients.
 */
export const getClients = (req: Request, res: Response) => {
  const status: number = HTTP_STATUS.OK;
  const data: Client[] = ClientModel.findAll();

  res.status(status).json(data);
};

/**
 * Get a specific client by ID.
 * 
 * @param req - Express request object containing the client ID in the URL parameters.
 * @param res - Express response object to send the response.
 * 
 * @returns A JSON response with the client details if found,
 * or an error message if the client is not found.
 */
export const getClientById = (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const client: Client | undefined = ClientModel.findById(id);
  let status: number = HTTP_STATUS.OK;
  let data: any = {};

  if (!client) {
    status = HTTP_STATUS.NOT_FOUND;
    data = { message: ERROR_MESSAGES.CLIENT_NOT_FOUND };
  } else {
    status = HTTP_STATUS.OK;
    data = client;
  }
  res.status(status).json(data);
};

/**
 * Create a new client.
 * 
 * @param req - Express request object containing client details in the request body.
 * @param res - Express response object to send the response.
 * 
 * @returns A JSON response with the newly created client,
 * or an error message if the client creation fails due to validation errors.
 */
export const createClient = (req: Request, res: Response) => {
  const { name, email, phone } = req.body;
  let status: number = HTTP_STATUS.OK;
  let data: any = {};

  const newClient: Client | undefined = ClientModel.create({
    name,
    email,
    phone,
  });

  if (!newClient) {
    status = HTTP_STATUS.BAD_REQUEST;
    data = { message: ERROR_MESSAGES.VALIDATION_FAILED };
  } else {
    status = HTTP_STATUS.CREATED;
    data = newClient;
  }
  res.status(status).json(data);
};

/**
 * Update an existing client.
 * 
 * @param req - Express request object containing the client ID in the URL parameters and updated client details in the request body.
 * @param res - Express response object to send the response.
 * 
 * @returns A JSON response with the updated client,
 * or an error message if the client is not found or the update fails due to validation errors.
 */
export const updateClient = (req: Request, res: Response) => {
  const clientId: number = parseInt(req.params.id);
  const client: Client | undefined = ClientModel.findById(clientId);

  let status: number = HTTP_STATUS.OK;
  let data: any = {};

  if (!client) {
    status = HTTP_STATUS.NOT_FOUND;
    data = { message: ERROR_MESSAGES.CLIENT_NOT_FOUND };
  } else {
    const { name, email, phone } = req.body;
    const updatedClient: Client | undefined = ClientModel.update(clientId, {
      name,
      email,
      phone,
    });
    if (!updatedClient) {
      status = HTTP_STATUS.BAD_REQUEST;
      data = { message: ERROR_MESSAGES.VALIDATION_FAILED };
    } else {
      status = HTTP_STATUS.OK;
      data = updatedClient;
    }
  }
  res.status(status).json(data);
};

/**
 * Delete an existing client.
 * 
 * @param req - Express request object containing the client ID in the URL parameters.
 * @param res - Express response object to send the response.
 * 
 * @returns An empty response with a status of 204 (No Content) if the client is successfully deleted,
 * or an error message if the client is not found or the deletion fails.
 */
export const deleteClient = (req: Request, res: Response) => {
  const clientId: number = parseInt(req.params.id);
  const client: Client | undefined = ClientModel.findById(clientId);
  let status: number = HTTP_STATUS.OK;
  let data: any = {};

  if (!client) {
    status = HTTP_STATUS.NOT_FOUND;
    data = { message: ERROR_MESSAGES.CLIENT_NOT_FOUND };
  } else if (ClientModel.delete(clientId)) {
    status = HTTP_STATUS.NO_CONTENT;
    data = null;
  } else {
    status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    data = { message: ERROR_MESSAGES.SERVER_ERROR };
  }

  res.status(status).send(data);
};
