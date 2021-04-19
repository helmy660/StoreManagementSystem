import { MongoDB } from "../database";

export class Product {
  path: string;

  constructor(sellerId: string) {
    this.path = `sellers/${sellerId}/products`;
  }

  async add(data: any) {
    return await MongoDB.add(this.path, data);
  }
}
