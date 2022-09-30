import { expect, it } from "vitest";
import { Auction } from "../entities/auction";
import { InMemoryAuctionsRepository } from "../repositories/in-memory/in-memory-auctions-repository";
import { CreateAuction } from "./create-auction";
import { FindAllAuctions } from "./find-all-auctions";

it("should be able to return all auctions created", async () => {
  const auctionsRepository = new InMemoryAuctionsRepository();
  const createAuction = new CreateAuction(auctionsRepository);

  await createAuction.execute({
    title: "nice car",
    status: "CLOSED",
    createdAt: new Date().toISOString(),
    highestBid: {
      amount: 3000
    },
  });

  const findAuctions = new FindAllAuctions(auctionsRepository);
  const auctions = await findAuctions.execute();

  
  expect(auctions.shift()).toBeInstanceOf(Auction);
});

it("should return an empty array for no auctions created", async () => {
  const auctionsRepository = new InMemoryAuctionsRepository();

  const findAuctions = new FindAllAuctions(auctionsRepository);

  const result = await findAuctions.execute();

  expect(result).toEqual([]);
});
