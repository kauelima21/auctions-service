import validator from "@middy/validator";
import { APIGatewayEvent } from "aws-lambda";
import { formatJSONResponse } from "../../lib/json-response";
import middyfy from "../../lib/middyfy";
import getAuctionsSchema from "../../lib/schemas/get-auctions";
import { AwsCdkAuctionsRepository } from "../../repositories/aws-cdk/aws-cdk-auctions-repository";
import { FindAllAuctions } from "../../use-cases/find-all-auctions";

async function getAuctions(event: APIGatewayEvent) {
  const auctionsRepository = new AwsCdkAuctionsRepository();
  const findAuctions = new FindAllAuctions(auctionsRepository);

  const { status } = event.queryStringParameters;

  const auctions = await findAuctions.execute(status);

  return formatJSONResponse(200, auctions);
}

export const handler = middyfy(getAuctions).use(
  validator({
    inputSchema: getAuctionsSchema,
    ajvOptions: {
      useDefaults: true,
      strict: false,
    },
  })
);
