import { expect, it } from "vitest";
import { Auction } from "../entities/auction";
import { InMemoryAuctionsRepository } from "../repositories/in-memory/in-memory-auctions-repository";
import { CreateAuction } from "./create-auction";

it("should be able to save new auctions", () => {
  const auctionsRepository = new InMemoryAuctionsRepository();
  const createAuction = new CreateAuction(auctionsRepository);

  const createdAt = new Date();
  expect(createAuction.execute({
    title: "A nice car",
    status: "OPEN",
    createdAt: createdAt.toISOString(),
    highestBid: {
      amount: 5000
    },
  })).resolves.toBeInstanceOf(Auction);
});
