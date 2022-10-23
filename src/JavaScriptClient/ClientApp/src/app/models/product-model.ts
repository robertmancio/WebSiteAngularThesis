
export class Product {

  constructor(id?: number, name?: string, details?: string, price?: number, productId?: number) {
    this.id = id;
    this.name = name;
    this.details = details;
    this.price = price;
    this.productId = productId;
  }

  public id?: number;
  public name?: string;
  public details?: string;
  public price?: number;
  public productId?: number;
}
