import * as Mongoose from 'mongoose';

let database: Mongoose.Connection;

export async function connect(params: { host: string, databaseName: string }) {
  const uri = `mongodb://${params.host}/${params.databaseName}`;
  console.log(`Connecting to ${uri}`);

  return new Promise((resolve, reject) => {
    if (database) {
      return;
    }

    Mongoose.connect(uri, {
      useNewUrlParser: true,
      // useFindAndModify: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
    });

    database = Mongoose.connection;

    database.once('open', async () => {
      resolve();
    });
    database.on('error', () => {
      reject();
    });
  });
}

export const disconnect = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};
