import { AwsCdkAuctionsRepository } from "../../repositories/aws-cdk/aws-cdk-auctions-repository";
import { ProcessAutcions } from "../../use-cases/process-auctions";

async function processAuctions() {
  const auctionsRepository = new AwsCdkAuctionsRepository();
  const processAuctions = new ProcessAutcions(auctionsRepository);

  await processAuctions.execute();
}

export const handler = processAuctions;