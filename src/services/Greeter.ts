import { sendUnaryData, ServerDuplexStream, ServerReadableStream, ServerUnaryCall, ServerWritableStream,
  status, UntypedHandleCall } from '@grpc/grpc-js';
import { randomBytes } from 'crypto';

import { GreeterServer, GreeterService, HelloRequest, HelloResponse, SubtitleRequest, SubtitleImgInfo } from '../models/helloworld';
import { logger, ServiceError } from '../utils';

import getPixels from 'get-pixels';

/**
 * package helloworld
 * service Greeter
 */
class Greeter implements GreeterServer {
  [method: string]: UntypedHandleCall;

  /**
   * Implements the SayHello RPC method.
   */
  public sayHello(call: ServerUnaryCall<HelloRequest, HelloResponse>, callback: sendUnaryData<HelloResponse>): void {
    logger.info('sayHello', Date.now());

    const res: Partial<HelloResponse> = {};
    const { name } = call.request;
    logger.info('sayHelloName:', name);

    if (name === 'error') {
      // https://grpc.io/grpc/node/grpc.html#.status__anchor
      return callback(new ServiceError(status.INVALID_ARGUMENT, 'InvalidValue'), null);
    }

    const metadataValue = call.metadata.get('foo');
    logger.info('sayHelloMetadata:', metadataValue);

    res.message = metadataValue.length > 0
      ? `foo is ${metadataValue}`
      : `hello ${name}`;

    const { paramStruct, paramListValue } = call.request;
    const paramValue = <unknown>call.request.paramValue;
    logger.info('sayHelloStruct:', paramStruct);
    logger.info('sayHelloListValue:', paramListValue);
    logger.info('sayHelloValue:', paramValue);

    res.paramStruct = paramStruct;
    res.paramListValue = paramListValue;
    res.paramValue = paramValue;

    callback(null, HelloResponse.fromJSON(res));
  }

  public subtitleImageRequest(call: ServerUnaryCall<SubtitleRequest, SubtitleImgInfo>, callback: sendUnaryData<SubtitleImgInfo>): void {
    logger.info('subtitleImageRequest', Date.now());

    const res: Partial<SubtitleImgInfo> = {};
    const { name } = call.request;
    logger.info('imageRequest Name:', name);

    if (name === 'error') {
      // test
      return callback(new ServiceError(status.INVALID_ARGUMENT, 'InvalidValue'), null);
    }

    res.name = name;
    res.width = 1920;
    res.height = 1080;

    try {
      getPixels('/home/ztz/Pictures/1.png', async (error, pixels) => {
        if (error) {
          logger.info('getPixels error');
        }
        // loop over every pixel
        for (let x = 0; x < pixels.shape[0]; x++) {
          for (let y = 0; y < pixels.shape[1]; y++) {
            // Create RGBA for current pixel
            // const colorAtPoint = new RGBA(
            //   pixels.get(x, y, 0),
            //   pixels.get(x, y, 1),
            //   pixels.get(x, y, 2),
            //   255
            // );
          }
        }
        logger.info('pixels length:', pixels.data.length);
      });
    } catch (error) {
      logger.info('getPixels error');
    }
  
    callback(null, SubtitleImgInfo.fromJSON(res));
  }

  public sayHelloStreamRequest(call: ServerReadableStream<HelloRequest, HelloResponse>, callback: sendUnaryData<HelloResponse>): void {
    logger.info('sayHelloStreamRequest:', call.getPeer());

    const data: string[] = [];
    call.on('data', (req: HelloRequest) => {
      data.push(`${req.name} - ${randomBytes(5).toString('hex')}`);
    }).on('end', () => {
      callback(null, HelloResponse.fromJSON({
        message: data.join('\n'),
      }));
    }).on('error', (err: Error) => {
      callback(new ServiceError(status.INTERNAL, err.message), null);
    });
  }

  public sayHelloStreamResponse(call: ServerWritableStream<HelloRequest, HelloResponse>): void {
    logger.info('sayHelloStreamResponse:', call.request);

    const { name } = call.request;

    for (const text of Array(10).fill('').map(() => randomBytes(5).toString('hex'))) {
      call.write(HelloResponse.fromJSON({
        message: `${name} - ${text}`,
      }));
    }
    call.end();
  }

  public sayHelloStream(call: ServerDuplexStream<HelloRequest, HelloResponse>): void {
    logger.info('sayHelloStream:', call.getPeer());

    call.on('data', (req: HelloRequest) => {
      call.write(HelloResponse.fromJSON({
        message: `${req.name} - ${randomBytes(5).toString('hex')}`,
      }));
    }).on('end', () => {
      call.end();
    }).on('error', (err: Error) => {
      logger.error('sayHelloStream:', err);
    });
  }
}

export {
  Greeter,
  GreeterService,
};
