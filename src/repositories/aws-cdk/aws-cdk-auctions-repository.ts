import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Auction } from "../../entities/auction";
import { AuctionsRepository, CreateAuctionData } from "../auctions-repository";

export class AwsCdkAuctionsRepository implements AuctionsRepository {
  private table: string;
  private dynamo: DocumentClient;

  constructor() {
    this.table = process.env.AUCTIONS_TABLE_NAME;
    this.dynamo = new DocumentClient();
  }

  async find(status?: string): Promise<Auction[] | null> {
    const auctions = await this.dynamo.query({
      TableName: this.table,
      IndexName: "statusAndEndDate",
      KeyConditionExpression: "#status = :status",
      ExpressionAttributeValues: {
        ":status": status,
      },
      ExpressionAttributeNames: {
        "#status": "status",
      },
    }).promise();

    return auctions.Items as Auction[];
  }

  async findById(id: string): Promise<Auction | null> {
    const auctions = await this.dynamo.get({
      TableName: this.table,
      Key: { id },
    }).promise();

    return auctions.Item as Auction;
  }

  async findEndedAuctions(): Promise<Auction[] | null> {
    const endedAuctions = await this.dynamo.query({
      TableName: this.table,
      IndexName: "statusAndEndDate",
      KeyConditionExpression: "#status = :status AND endingAt <= :now",
      ExpressionAttributeValues: {
        ":status": "OPEN",
        ":now": new Date().toISOString(),
      },
      ExpressionAttributeNames: {
        "#status": "status",
      },
    }).promise();

    return endedAuctions.Items as Auction[];
  }

  async create(data: CreateAuctionData): Promise<void> {
    await this.dynamo.put({
      TableName: this.table,
      Item: data,
    }).promise();
  }

  async updateBid(id: string, amount: number, bidder: string): Promise<void> {
    await this.dynamo.update({
      TableName: this.table,
      Key: { id },
      UpdateExpression: "set highestBid.amount = :amount, highestBid.bidder = :bidder",
      ExpressionAttributeValues: {
        ":amount": amount,
        ":bidder": bidder,
      },
      ReturnValues: "ALL_NEW",
    }).promise();
  }

  async closeAuctions(id: string): Promise<void> {
    await this.dynamo.update({
      TableName: this.table,
      Key: { id },
      UpdateExpression: "set #status = :status",
      ExpressionAttributeValues: {
        ":status": "CLOSED",
      },
      ExpressionAttributeNames: {
        "#status": "status",
      },
    }).promise();
  }

  async destroy() { }
}
