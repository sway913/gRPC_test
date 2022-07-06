import { credentials, Metadata } from '@grpc/grpc-js';
import { promisify } from 'util';

import { SubtitleCreatorClient, SubtitleRequest, SubtitleInfoResponse } from './models/subtitleCreator';

/**
 * gRPC SubtitleCreatorClient Service
 * https://github.com/grpc/grpc-node/issues/54
 */
class SubtitleService {
  private readonly client: SubtitleCreatorClient = new SubtitleCreatorClient('localhost:50051', credentials.createInsecure());

  public async SubtitleImageRequest(param: SubtitleRequest, metadata: Metadata = new Metadata()): Promise<SubtitleInfoResponse> {
    return promisify<SubtitleRequest, Metadata, SubtitleInfoResponse>(this.client.subtitleImageRequest.bind(this.client))(param, metadata);
  }
}

export const subtitleService: SubtitleService = new SubtitleService();
