/* eslint-disable */
import Long from 'long';
import {
  makeGenericClientConstructor,
  ChannelCredentials,
  ChannelOptions,
  UntypedServiceImplementation,
  handleUnaryCall,
  Client,
  ClientUnaryCall,
  Metadata,
  CallOptions,
  ServiceError,
} from '@grpc/grpc-js';
import * as _m0 from 'protobufjs/minimal';
import { Struct } from './google/protobuf/struct';

/**
 * https://developers.google.com/protocol-buffers/docs/proto3?hl=ko#json
 * https://developers.google.com/protocol-buffers/docs/reference/proto3-spec
 */

export interface SubtitleInfoResponse {
  name: string;
  data: Buffer;
  height: number;
  width: number;
}

export interface SubtitleRequest {
  name: string;
  paramStruct?: { [key: string]: any };
}

function createBaseSubtitleInfoResponse(): SubtitleInfoResponse {
  return { name: '', data: Buffer.alloc(0), height: 0, width: 0 };
}

export const SubtitleInfoResponse = {
  encode(message: SubtitleInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    if (message.height !== 0) {
      writer.uint32(24).int32(message.height);
    }
    if (message.width !== 0) {
      writer.uint32(32).int32(message.width);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubtitleInfoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubtitleInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.data = reader.bytes() as Buffer;
          break;
        case 3:
          message.height = reader.int32();
          break;
        case 4:
          message.width = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SubtitleInfoResponse {
    return {
      name: isSet(object.name) ? String(object.name) : '',
      data: isSet(object.data) ? Buffer.from(bytesFromBase64(object.data)) : Buffer.alloc(0),
      height: isSet(object.height) ? Number(object.height) : 0,
      width: isSet(object.width) ? Number(object.width) : 0,
    };
  },

  toJSON(message: SubtitleInfoResponse): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.data !== undefined && (obj.data = base64FromBytes(message.data !== undefined ? message.data : Buffer.alloc(0)));
    message.height !== undefined && (obj.height = Math.round(message.height));
    message.width !== undefined && (obj.width = Math.round(message.width));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SubtitleInfoResponse>, I>>(object: I): SubtitleInfoResponse {
    const message = createBaseSubtitleInfoResponse();
    message.name = object.name ?? '';
    message.data = object.data ?? Buffer.alloc(0);
    message.height = object.height ?? 0;
    message.width = object.width ?? 0;
    return message;
  },
};

function createBaseSubtitleRequest(): SubtitleRequest {
  return { name: '', paramStruct: undefined };
}

export const SubtitleRequest = {
  encode(message: SubtitleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.paramStruct !== undefined) {
      Struct.encode(Struct.wrap(message.paramStruct), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubtitleRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubtitleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.paramStruct = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SubtitleRequest {
    return {
      name: isSet(object.name) ? String(object.name) : '',
      paramStruct: isObject(object.paramStruct) ? object.paramStruct : undefined,
    };
  },

  toJSON(message: SubtitleRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.paramStruct !== undefined && (obj.paramStruct = message.paramStruct);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SubtitleRequest>, I>>(object: I): SubtitleRequest {
    const message = createBaseSubtitleRequest();
    message.name = object.name ?? '';
    message.paramStruct = object.paramStruct ?? undefined;
    return message;
  },
};

/** https://developers.google.com/protocol-buffers/docs/style */
export type SubtitleCreatorService = typeof SubtitleCreatorService;
export const SubtitleCreatorService = {
  subtitleImageRequest: {
    path: '/subtitleCreate.SubtitleCreator/SubtitleImageRequest',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SubtitleRequest) => Buffer.from(SubtitleRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SubtitleRequest.decode(value),
    responseSerialize: (value: SubtitleInfoResponse) => Buffer.from(SubtitleInfoResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SubtitleInfoResponse.decode(value),
  },
} as const;

export interface SubtitleCreatorServer extends UntypedServiceImplementation {
  subtitleImageRequest: handleUnaryCall<SubtitleRequest, SubtitleInfoResponse>;
}

export interface SubtitleCreatorClient extends Client {
  subtitleImageRequest(
    request: SubtitleRequest,
    callback: (error: ServiceError | null, response: SubtitleInfoResponse) => void
  ): ClientUnaryCall;
  subtitleImageRequest(
    request: SubtitleRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SubtitleInfoResponse) => void
  ): ClientUnaryCall;
  subtitleImageRequest(
    request: SubtitleRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SubtitleInfoResponse) => void
  ): ClientUnaryCall;
}

export const SubtitleCreatorClient = makeGenericClientConstructor(SubtitleCreatorService, 'subtitleCreate.SubtitleCreator') as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ChannelOptions>): SubtitleCreatorClient;
  service: typeof SubtitleCreatorService;
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw 'Unable to locate global object';
})();

const atob: (b64: string) => string = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, 'base64').toString('binary'));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, 'binary').toString('base64'));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  arr.forEach((byte) => {
    bin.push(String.fromCharCode(byte));
  });
  return btoa(bin.join(''));
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === 'object' && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
