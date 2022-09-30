import { randomUUID } from "crypto";

export type AuctionProps = {
  title: string;
  seller: string;
  status: string;
  createdAt: string;
  endingAt: string;
  highestBid: {
    amount: number;
    bidder?: string;
  };
}

export class Auction {
  private _id: string;
  private props: AuctionProps;

  constructor(props: AuctionProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this.props.title;
  }

  get seller() {
    return this.props.seller;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get endingAt() {
    return this.props.endingAt;
  }

  get highestBid() {
    return this.props.highestBid;
  }
}
