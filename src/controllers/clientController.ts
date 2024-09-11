import { Request, Response } from "express";
import { ClientModel, Client } from "../models/client";
import { HTTP_STATUS, ERROR_MESSAGES } from "../constants";

// Obtener todos los clientes
export const getClients = (req: Request, res: Response) => {
  const status: number = HTTP_STATUS.OK;
  const data: Client[] = ClientModel.findAll();

  res.status(status).json(data);
};

// Obtener un cliente por ID
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

// Crear un nuevo cliente
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

// Actualizar un cliente existente
export const updateClient = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const client: Client | undefined = ClientModel.findById(id);

  let status: number = HTTP_STATUS.OK;
  let data: any = {};

  if (!client) {
    status = HTTP_STATUS.NOT_FOUND;
    data = { message: ERROR_MESSAGES.CLIENT_NOT_FOUND };
  } else {
    const { name, email, phone } = req.body;
    const updatedClient: Client | undefined = ClientModel.update(id, {
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

// Eliminar un cliente
export const deleteClient = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const client = ClientModel.findById(id);
  let status: number = HTTP_STATUS.OK;
  let data: any = {};

  if (!client) {
    status = HTTP_STATUS.NOT_FOUND;
    data = { message: ERROR_MESSAGES.CLIENT_NOT_FOUND };
  } else if (ClientModel.delete(id)) {
    status = HTTP_STATUS.NO_CONTENT;
    data = null;
  } else {
    status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    data = { message: ERROR_MESSAGES.SERVER_ERROR };
  }

  res.status(status).send(data);
};
