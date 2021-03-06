import 'source-map-support/register';
import { Server, ServerCredentials } from '@grpc/grpc-js';

import { SubtitleCreator, SubtitleCreatorService } from './services/SubtitleCreator';
import { logger } from './utils';

// Do not use @grpc/proto-loader
// set max receive = 100MB
let maxRecv = 1024*1024*100;
const myServer = new Server({
  'grpc.max_receive_message_length': maxRecv,
  'grpc.max_send_message_length': -1,
});

myServer.addService(SubtitleCreatorService, new SubtitleCreator());
myServer.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), (err: Error | null, bindPort: number) => {
  if (err) {
    throw err;
  }

  logger.info(`gRPC:Server:${bindPort}`, new Date().toLocaleString());
  myServer.start();
});
