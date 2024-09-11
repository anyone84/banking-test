import { Account } from "./account";

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  accounts?: Account[]; // Relación con cuentas
}

export class ClientModel {
  private static clients: Client[] = [];

  static validate(client: Partial<Client>): boolean {
    if (!client.name || typeof client.name !== "string") {

      return false;
    }
    if (
      !client.email ||
      typeof client.email !== "string" ||
      !client.email.includes("@")
    ) {
      return false;
    }
    if (
      !client.phone ||
      typeof client.phone !== "string" ||
      client.phone.length < 9
    ) {

      return false;
    }
    return true;
  }

  static findAll(): Client[] {
    return ClientModel.clients;
  }

  static findById(id: number): Client | undefined {
    const client: Client | undefined = ClientModel.clients.find((client) => client.id === id)
    return client ? JSON.parse(JSON.stringify(client)) : undefined;
  }

  static create(clientData: any): Client | undefined {
    if (!this.validate(clientData)) {
      return undefined;
    }
    const newClient: Client = {
      id: this.clients.length + 1,
      name: clientData.name,
      email: clientData.email,
      phone: clientData.phone,
    };
    this.clients.push(newClient);
    return JSON.parse(JSON.stringify(newClient));
  }

  static update(id: number, updateFields: Partial<Client>): Client | undefined {
    const client = ClientModel.clients.find((client) => client.id === id);
    if (client) {
      Object.assign(client, updateFields);
      return JSON.parse(JSON.stringify(client));
    }
    return undefined;
  }

  static delete(id: number): boolean {
    const index = ClientModel.clients.findIndex((client) => client.id === id);
    if (index !== -1) {
      ClientModel.clients.splice(index, 1);
      return true;
    }
    return false;
  }
}
