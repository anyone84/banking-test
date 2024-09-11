import { Account } from "./account";

/**
 * Interface representing a client.
 */
export interface Client {
  id: number;               // Unique identifier for the client
  name: string;            // Name of the client
  email: string;           // Email address of the client
  phone: string;           // Phone number of the client
  accounts?: Account[];    // Optional list of accounts associated with the client
}

/**
 * Class responsible for managing clients.
 */
export class ClientModel {
  private static clients: Client[] = []; // In-memory storage for clients

  /**
   * Validates the given client data.
   * 
   * @param client - Partial client object to validate.
   * @returns A boolean indicating whether the client data is valid.
   */
  static validate(client: Partial<Client>): boolean {
    if (!client.name || typeof client.name !== "string") {
      return false;
    }
    if (!client.email || typeof client.email !== "string" || !client.email.includes("@")) {
      return false;
    }
    if (!client.phone || typeof client.phone !== "string" || client.phone.length < 9) {
      return false;
    }
    return true;
  }

  /**
   * Retrieves all clients.
   * 
   * @returns An array of all clients.
   */
  static findAll(): Client[] {
    return this.clients;
  }

  /**
   * Finds a client by its unique identifier.
   * 
   * @param id - The ID of the client to find.
   * @returns The client with the given ID, or undefined if not found.
   */
  static findById(id: number): Client | undefined {
    const client: Client | undefined = this.clients.find((client) => client.id === id);
    return client ? JSON.parse(JSON.stringify(client)) : undefined;
  }

  /**
   * Creates a new client with the provided data.
   * 
   * @param clientData - The data to create the new client.
   * @returns The newly created client, or undefined if validation fails.
   */
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

  /**
   * Updates an existing client with the provided fields.
   * 
   * @param id - The ID of the client to update.
   * @param updateFields - Partial client data to update.
   * @returns The updated client, or undefined if the client is not found.
   */
  static update(id: number, updateFields: Partial<Client>): Client | undefined {
    const client: Client | undefined = this.clients.find((client) => client.id === id);
    if (client) {
      Object.assign(client, updateFields);
      return JSON.parse(JSON.stringify(client));
    }
    return undefined;
  }

  /**
   * Deletes a client by its unique identifier.
   * 
   * @param id - The ID of the client to delete.
   * @returns A boolean indicating whether the client was successfully deleted.
   */
  static delete(id: number): boolean {
    const index: number = this.clients.findIndex((client) => client.id === id);
    if (index !== -1) {
      this.clients.splice(index, 1);
      return true;
    }
    return false;
  }
}
