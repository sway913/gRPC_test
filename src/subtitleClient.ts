import 'source-map-support/register';
import { credentials, Metadata, ServiceError } from '@grpc/grpc-js';

import { SubtitleCreatorClient, SubtitleRequest, SubtitleInfoResponse } from './models/subtitleCreator';
import { subtitleService } from './subtitleService';
import { logger } from './utils';

// https://github.com/grpc/grpc/blob/master/doc/keepalive.md
// https://cloud.ibm.com/docs/blockchain-multicloud?topic=blockchain-multicloud-best-practices-app#best-practices-app-connections
const subtitleClient = new SubtitleCreatorClient('localhost:50051', credentials.createInsecure(), {
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

const fontParams = {
  id: '100',
  backgroundAlpha: 0,
  backgroundColor: '#0000ff',
  backgroundRadius: 10,
  clip_anmia_time_type: 0,
  fontAlpha: 1,
  fontColor: '#f9df4b',
  fontFamily: '快乐体' || '思源黑体',
  fontOutlineColor: '#000000',
  fontOutlineSize: 2,
  fontProjectionAlpha: 0.6,
  fontProjectionColor: '#000000',
  fontProjectionWidth: 5,
  fontProjectionX: 10,
  fontProjectionY: 10,
  fontSize: 2,
  fontTypefacePath: 'https://cdnsaas.kuai.360.cn/kjjsaas/6f15a5b0a4c7afca_siyuanheiti.ttf',
  letterSpacing: 0.2,
  lineHeight: 1,
  text: '大家好',
  textAlign: 'center',
  textBold: false,
  textItalic: false,
  textJsonPropertyPath: '',
  textUnderline: true,

  videoHight: 1726,
  videoWidth: 1080,
  width_surfaceView: 1080,
};

const param: SubtitleRequest = {
  name: argv,
  paramStruct: fontParams,
};

const metadata = new Metadata();
metadata.add('foo', 'bar1');
metadata.add('foo', 'bar2');

async function subtitleExample(): Promise<void> {
  /**
   * rpc SubtitleImageRequest with callback
   * https://github.com/grpc/grpc-node/issues/54
   */
  subtitleClient.subtitleImageRequest(param, (err: ServiceError | null, res: SubtitleInfoResponse) => {
    if (err) {
      return logger.error('SubtitleImage:', err.message);
    }

    logger.info('callback SubtitleImage. name:', res.name, ' width:', res.width, ' height:', res.height);
    logger.info('callback SubtitleImage. data:', res.data);
  });

  /**
   * rpc SubtitleImageRequest with Promise
   */
  const subtitleImage = await subtitleService.SubtitleImageRequest(param);
  logger.info('Promise SubtitleImage. name:', subtitleImage.name, ' width:', subtitleImage.width, ' height:', subtitleImage.height);
  logger.info('Promise SubtitleImage. data:', subtitleImage.data);
}

(async (): Promise<void> => {
  try {
    await subtitleExample();
  } catch (err) {
    logger.error(err);
  }
})();
