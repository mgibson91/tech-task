import { Schema } from 'mongoose';

const ShortUrlSchema = new Schema({
  shortUrl: String,
  originalUrl: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default ShortUrlSchema;
