import 'source-map-support/register';
import { credentials, Metadata, ServiceError } from '@grpc/grpc-js';

import { SubtitleCreatorClient, SubtitleRequest, SubtitleInfoResponse } from './models/subtitleCreator';
import { clientService } from './subtitleService';
import { logger } from './utils';

// https://github.com/grpc/grpc/blob/master/doc/keepalive.md
// https://cloud.ibm.com/docs/blockchain-multicloud?topic=blockchain-multicloud-best-practices-app#best-practices-app-connections
const client = new SubtitleCreatorClient('localhost:50051', credentials.createInsecure(), {
  'grpc.keepalive_time_ms': 120000,
  'grpc.http2.min_time_between_pings_ms': 120000,
  'grpc.keepalive_timeout_ms': 20000,
  'grpc.http2.max_pings_without_data': 0,
  'grpc.keepalive_permit_without_calls': 1,
});
logger.info('gRPC:SubtitleCreatorClient', new Date().toLocaleString());

let argv = 'req_text';
if (process.argv.length >= 3) {
  [,,argv] = process.argv;
}

const param: SubtitleRequest = {
  name: argv,
  paramStruct: { foo: 'bar', bar: 'foo' },
};

const metadata = new Metadata();
metadata.add('foo', 'bar1');
metadata.add('foo', 'bar2');

async function subtitleExample(): Promise<void> {
  /**
   * rpc SubtitleImageRequest with callback
   * https://github.com/grpc/grpc-node/issues/54
   */
  client.subtitleImageRequest(param, (err: ServiceError | null, res: SubtitleInfoResponse) => {
    if (err) {
      return logger.error('SubtitleImage:', err.message);
    }

    logger.info('callback SubtitleImage. name:', res.name, ' width:', res.width, ' height:', res.height);
  });

  /**
   * rpc SubtitleImageRequest with Promise
   */
  const subtitleImage = await clientService.SubtitleImageRequest(param);
  logger.info('Promise SubtitleImage. name:', subtitleImage.name, ' width:', subtitleImage.width, ' height:', subtitleImage.height);
}

(async (): Promise<void> => {
  try {
    await subtitleExample();
  } catch (err) {
    logger.error(err);
  }
})();
