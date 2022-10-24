
export class Order {

  constructor(id?: number, amount?: number, date?: Date, clientId?: number, inventoryProductId?: number) {
    this.id = id;
    this.amount = amount;
    this.date = date;
    this.clientId = clientId;
    this.inventoryProductId = inventoryProductId;
  }

  public id?: number;
  public amount?: number;
  public date?: Date;
  public clientId?: number;
  public inventoryProductId?: number;
  public index?: number;
}
