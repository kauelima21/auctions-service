import { AuctionsRepository } from "../repositories/auctions-repository";

type UpdateHighestBidRequest = {
  id: string;
  bidder: string;
  amount: number;
}

export class UpdateHighestBid {
  constructor(private auctionsRepository: AuctionsRepository) { }

  async execute({ id, amount, bidder }: UpdateHighestBidRequest) {
    const auction = await this.auctionsRepository.findById(id);

    if (!auction) throw new Error("There's no auction with this id.");

    if (auction.seller === bidder) throw new Error("You cannot bid in your own auction.");

    if (auction.status !== "OPEN") throw new Error("This auction is currently closed.");

    if (auction.highestBid.amount >= amount) throw new Error("Cannot send a bid smaller then the previus one");

    if (auction.highestBid.bidder === bidder) throw new Error("You are alredy the highest bidder.");

    await this.auctionsRepository.updateBid(id, amount, bidder);

    // update the auction in memory just for return
    auction.highestBid.amount = amount;

    return auction;
  }
}