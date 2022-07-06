/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { sendUnaryData, ServerUnaryCall, status, UntypedHandleCall } from '@grpc/grpc-js';
import puppeteer from 'puppeteer';

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
  public async subtitleImageRequest(call: ServerUnaryCall<SubtitleRequest, SubtitleInfoResponse>, callback: sendUnaryData<SubtitleInfoResponse>): Promise<void> {
    logger.info('subtitleImageRequest', Date.now());

    const res: Partial<SubtitleInfoResponse> = {};
    const { name, paramStruct } = call.request;
    logger.info('subtitleRequest Name:', name);
    logger.info('subtitleRequest paramStruct:', paramStruct);

    if (name === 'error') {
      // test
      return callback(new ServiceError(status.INVALID_ARGUMENT, 'InvalidValue'), null);
    }

    // eslint-disable-next-line sonarjs/no-unused-collection
    const queryString = [];
    // eslint-disable-next-line guard-for-in
    for (const o in paramStruct) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        queryString.push(`${o}=${encodeURIComponent(paramStruct[o])}`);
      } catch (e) {
        logger.info(e);
      }
    }
    logger.info();

    const pageUrl = `http://localhost:8360/canvas/text?${queryString.join('&')}`;
    const timeStart = Date.now();

    const browser = await puppeteer.launch({
      args: [
        '-disable-dev-shm-usage',
        '-disable-setuid-sandbox',
        '-no-first-run',
        '-no-sandbox',
        '-no-zygote',
        '-single-process',
      ],
    }).catch((err) => {
      logger.info(err);
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const page = await (browser && browser.newPage());
    await page.goto(pageUrl);

    const selector = '#code';
    await page.waitForFunction(
      // eslint-disable-next-line arrow-body-style
      (selector1) => {
        return !!document.querySelector(selector1);
      },
      {},
      selector,
    );

    const data = await page.evaluate(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const code = document.querySelector('#code') as HTMLInputElement;
      const val = code.value;
      if (val) {
        const pos = val.indexOf(':');
        const size = val.substring(0, pos).split('_');
        return {
          width: size[0],
          height: size[1],
          list: val.substr(pos + 1),
        };
      }
      return {
        width: 0,
        height: 0,
        list: '',
      };
    });

    await (browser && browser.close());

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    logger.info(new Uint8Array(JSON.parse(`[${data.list}]`)));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    res.data = Buffer.from(new Uint8Array(JSON.parse(`[${data.list}]`)));

    const timeEnd = Date.now();
    logger.info(timeEnd - timeStart);

    res.name = name;
    res.width = Number(data.width);
    res.height = Number(data.height);

    callback(null, SubtitleInfoResponse.fromJSON(res));
  }
}

export {
  SubtitleCreator,
  SubtitleCreatorService,
};
