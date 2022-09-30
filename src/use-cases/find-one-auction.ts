import { AuctionsRepository } from "../repositories/auctions-repository";

export class FindOneAuction {
  constructor(private auctionsRepository: AuctionsRepository) { }

  async execute(id: string) {
    const auction = await this.auctionsRepository.findById(id);

    return auction;
  }
}
