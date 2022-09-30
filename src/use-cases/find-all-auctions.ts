import { AuctionsRepository } from "../repositories/auctions-repository";

export class FindAllAuctions {
  constructor(private auctionsRepository: AuctionsRepository) { }

  async execute(status?: string) {
    const auctions = await this.auctionsRepository.find(status);

    return auctions;
  }
}
