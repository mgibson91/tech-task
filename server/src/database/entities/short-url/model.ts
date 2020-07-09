import { model } from 'mongoose';
import { ShortUrlDocument } from './types';
import ShortUrlSchema from './schema';

export const ShortUrlModel = model<ShortUrlDocument>('short_url', ShortUrlSchema);
