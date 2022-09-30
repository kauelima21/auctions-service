import { APIGatewayEvent } from "aws-lambda";
import { formatJSONResponse } from "../../lib/json-response";
import middyfy from "../../lib/middyfy";
import { AwsCdkAuctionsRepository } from "../../repositories/aws-cdk/aws-cdk-auctions-repository";
import { FindOneAuction } from "../../use-cases/find-one-auction";

async function getAuction(event: APIGatewayEvent) {
  const auctionsRepository = new AwsCdkAuctionsRepository();
  const findOneAuction = new FindOneAuction(auctionsRepository);
  const id = event.pathParameters.id;

  const auctions = await findOneAuction.execute(id);

  return formatJSONResponse(200, auctions);
}

export const handler = middyfy(getAuction);
