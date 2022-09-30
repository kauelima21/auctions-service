import { Auction } from "../entities/auction";

export type CreateAuctionData = {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  endingAt: string;
  highestBid: {
    amount: number;
  };
}

export interface AuctionsRepository {
  find(status?: string): Promise<Auction[] | null>;
  findById(id: string): Promise<Auction | null>;
  findEndedAuctions(): Promise<Auction[] | null>;
  closeAuctions(id: string): Promise<void>;
  create(data: CreateAuctionData): Promise<void>;
  updateBid(id: string, amount: number, bidder: string): Promise<void>;
}
