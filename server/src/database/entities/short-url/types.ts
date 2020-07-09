import { Document, Model } from 'mongoose';

export interface ShortUrl {
  shortUrl: string;
  originalUrl: string;
  lastUpdated: Date;
}

export interface ShortUrlDocument extends ShortUrl, Document {}

export interface ShortUrlModel extends Model<ShortUrlDocument> {}
