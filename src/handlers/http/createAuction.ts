import validator from "@middy/validator";
import { APIGatewayEvent } from "aws-lambda";
import { formatJSONResponse } from "../../lib/json-response";
import middyfy from "../../lib/middyfy";
import createAuctionSchema from "../../lib/schemas/create-auction";
import { AwsCdkAuctionsRepository } from "../../repositories/aws-cdk/aws-cdk-auctions-repository";
import { CreateAuction } from "../../use-cases/create-auction";

async function createAuction(event: APIGatewayEvent) {
  const auctionsRepository = new AwsCdkAuctionsRepository();
  const createAuction = new CreateAuction(auctionsRepository);
  const body = JSON.parse(JSON.stringify(event.body));
  const { seller } = event.requestContext.authorizer;

  const newAuction = await createAuction.execute({ ...body, seller });

  return formatJSONResponse(201, newAuction);
}

export const handler = middyfy(createAuction).use(validator({
  inputSchema: createAuctionSchema,
  ajvOptions: {
    strict: false,
  }
}));
