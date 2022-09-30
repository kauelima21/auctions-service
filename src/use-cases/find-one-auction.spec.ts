import { it, expect } from "vitest";
import { Auction } from "../entities/auction";
import { InMemoryAuctionsRepository } from "../repositories/in-memory/in-memory-auctions-repository";
import { CreateAuction } from "./create-auction";
import { FindAllAuctions } from "./find-all-auctions";
import { FindOneAuction } from "./find-one-auction";


it("should be able to return an Auction by id", async () => {
  const auctionsRepository = new InMemoryAuctionsRepository();
  const createAuction = new CreateAuction(auctionsRepository);

  const createdAt = new Date();
  await createAuction.execute({
    title: "A nice car",
    status: "OPEN",
    createdAt: createdAt.toISOString(),
    highestBid: {
      amount: 5000
    }
  });

  const findAuctions = new FindAllAuctions(auctionsRepository);
  const auctions = await findAuctions.execute();

  const ids = auctions.map(auction => auction.id);
  const findOneAuction = new FindOneAuction(auctionsRepository);
  expect(findOneAuction.execute(ids[0])).resolves.toBeInstanceOf(Auction);
});
