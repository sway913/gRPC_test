import { sendUnaryData, ServerUnaryCall, status, UntypedHandleCall } from '@grpc/grpc-js';

import { SubtitleCreatorServer, SubtitleCreatorService, SubtitleRequest, SubtitleInfoResponse } from '../models/subtitleCreator';
import { logger, ServiceError } from '../utils';
/**
 * package subtitleCreate
 * service SubtitleCreator
 */
class SubtitleCreator implements SubtitleCreatorServer {
  [method: string]: UntypedHandleCall;

  /**
   * Implements the subtitleImageRequest RPC method.
   */
  public subtitleImageRequest(call: ServerUnaryCall<SubtitleRequest, SubtitleInfoResponse>, callback: sendUnaryData<SubtitleInfoResponse>): void {
    logger.info('subtitleImageRequest', Date.now());

    const res: Partial<SubtitleInfoResponse> = {};
    const { name, paramStruct } = call.request;
    logger.info('subtitleRequest Name:', name);
    logger.info('subtitleRequest paramStruct:', paramStruct);

    if (name === 'error') {
      // test
      return callback(new ServiceError(status.INVALID_ARGUMENT, 'InvalidValue'), null);
    }
    res.name = name;
    res.width = 1920;
    res.height = 1080;
    callback(null, SubtitleInfoResponse.fromJSON(res));
  }
}

export {
  SubtitleCreator,
  SubtitleCreatorService,
};
