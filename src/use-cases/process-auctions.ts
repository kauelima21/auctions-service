import { AuctionsRepository } from "../repositories/auctions-repository";

export class ProcessAutcions {
  constructor(private auctionsRepository: AuctionsRepository) { }

  async execute() {
    const auctionsToClose = await this.auctionsRepository.findEndedAuctions();
    const closePromises = auctionsToClose.map(auction => {
      return this.auctionsRepository.closeAuctions(auction.id)
    });

    await Promise.all(closePromises);
  }
}