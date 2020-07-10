import { Schema } from 'mongoose';

const ShortUrlSchema = new Schema({
  shortUrl: {
    type: String,
    unique: true, // Prevent duplicates
  },
  originalUrl: String,
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

export default ShortUrlSchema;
