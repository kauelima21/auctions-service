import { AuctionsRepository } from "../repositories/auctions-repository";
import { Auction } from "./../entities/auction";

type CreateAuctionRequest = {
  title: string;
  seller: string;
  endingAt?: string;
};
type CreateAuctionResponse = Auction;

export class CreateAuction {
  constructor(private auctionsRepository: AuctionsRepository) { }

  async execute({ title, endingAt, seller }: CreateAuctionRequest): Promise<CreateAuctionResponse> {
    const date = new Date();
    date.setHours(date.getHours() + 1);
    const auction = new Auction({
      title,
      status: "OPEN",
      createdAt: date.toISOString(),
      seller,
      endingAt: endingAt ?? date.toISOString(),
      highestBid: {
        amount: 0,
      }
    });

    await this.auctionsRepository.create({
      id: auction.id,
      title: auction.title,
      status: auction.status,
      createdAt: auction.createdAt,
      endingAt: auction.endingAt,
      highestBid: auction.highestBid,
    });

    return auction;
  }
}
