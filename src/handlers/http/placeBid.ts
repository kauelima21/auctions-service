import { APIGatewayEvent } from "aws-lambda";
import { formatJSONResponse } from "../../lib/json-response";
import middyfy from "../../lib/middyfy";
import { AwsCdkAuctionsRepository } from "../../repositories/aws-cdk/aws-cdk-auctions-repository";
import { UpdateHighestBid } from "../../use-cases/update-highest-bid";

async function placeBid(event: APIGatewayEvent) {
  const auctionsRepository = new AwsCdkAuctionsRepository();
  const updateBid = new UpdateHighestBid(auctionsRepository);
  const id = event.pathParameters.id;
  const { amount } = JSON.parse(JSON.stringify(event.body));
  const { bidder } = event.requestContext.authorizer;

  const auction = await updateBid.execute({ id, amount, bidder });

  return formatJSONResponse(200, auction);
}

export const handler = middyfy(placeBid);
