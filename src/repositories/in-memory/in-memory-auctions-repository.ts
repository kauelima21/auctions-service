import { Auction } from "../../entities/auction";
import { AuctionsRepository } from "../auctions-repository";

export class InMemoryAuctionsRepository implements AuctionsRepository {
  public items: Auction[] = [];

  async create(auction: Auction): Promise<void> {
    this.items[auction.id] = auction;
  }

  async find(): Promise<Auction[]> {
    return this.items;
  }

  async findById(id: string): Promise<Auction> {
    return this.items[id];
  }

  async updateBid(id: string, amount: number): Promise<void> {
    this.items[id].highestBid.amount = amount;
    return this.items[id];
  }
}
