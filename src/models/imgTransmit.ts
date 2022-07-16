/* eslint-disable */
import Long from 'long';
import {
  makeGenericClientConstructor,
  ChannelCredentials,
  ChannelOptions,
  UntypedServiceImplementation,
  handleUnaryCall,
  handleClientStreamingCall,
  handleServerStreamingCall,
  Client,
  ClientUnaryCall,
  Metadata,
  CallOptions,
  ClientWritableStream,
  ClientReadableStream,
  ServiceError,
} from '@grpc/grpc-js';
import * as _m0 from 'protobufjs/minimal';

/** image transmission server */

export interface ImgInfo {
  name: string;
  /** int32 indicates original img id */
  maps: { [key: number]: ImgInfo_Img };
}

export enum ImgInfo_ImgType {
  JPG = 0,
  PNG = 1,
  UNRECOGNIZED = -1,
}

export function imgInfo_ImgTypeFromJSON(object: any): ImgInfo_ImgType {
  switch (object) {
    case 0:
    case 'JPG':
      return ImgInfo_ImgType.JPG;
    case 1:
    case 'PNG':
      return ImgInfo_ImgType.PNG;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return ImgInfo_ImgType.UNRECOGNIZED;
  }
}

export function imgInfo_ImgTypeToJSON(object: ImgInfo_ImgType): string {
  switch (object) {
    case ImgInfo_ImgType.JPG:
      return 'JPG';
    case ImgInfo_ImgType.PNG:
      return 'PNG';
    case ImgInfo_ImgType.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export interface ImgInfo_Img {
  data: Buffer;
  type: ImgInfo_ImgType;
  height: number;
  width: number;
  channel: number;
}

export interface ImgInfo_MapsEntry {
  key: number;
  value?: ImgInfo_Img;
}

export interface Status {
  code: number;
}

export interface BaseName {
  name: string[];
}

export interface Description {
  desc: string[];
}

function createBaseImgInfo(): ImgInfo {
  return { name: '', maps: {} };
}

export const ImgInfo = {
  encode(message: ImgInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    Object.entries(message.maps).forEach(([key, value]) => {
      ImgInfo_MapsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImgInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImgInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          const entry2 = ImgInfo_MapsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.maps[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ImgInfo {
    return {
      name: isSet(object.name) ? String(object.name) : '',
      maps: isObject(object.maps)
        ? Object.entries(object.maps).reduce<{ [key: number]: ImgInfo_Img }>((acc, [key, value]) => {
            acc[Number(key)] = ImgInfo_Img.fromJSON(value);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: ImgInfo): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    obj.maps = {};
    if (message.maps) {
      Object.entries(message.maps).forEach(([k, v]) => {
        obj.maps[k] = ImgInfo_Img.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ImgInfo>, I>>(object: I): ImgInfo {
    const message = createBaseImgInfo();
    message.name = object.name ?? '';
    message.maps = Object.entries(object.maps ?? {}).reduce<{ [key: number]: ImgInfo_Img }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[Number(key)] = ImgInfo_Img.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseImgInfo_Img(): ImgInfo_Img {
  return { data: Buffer.alloc(0), type: 0, height: 0, width: 0, channel: 0 };
}

export const ImgInfo_Img = {
  encode(message: ImgInfo_Img, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.height !== 0) {
      writer.uint32(24).int32(message.height);
    }
    if (message.width !== 0) {
      writer.uint32(32).int32(message.width);
    }
    if (message.channel !== 0) {
      writer.uint32(40).int32(message.channel);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImgInfo_Img {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImgInfo_Img();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes() as Buffer;
          break;
        case 2:
          message.type = reader.int32() as any;
          break;
        case 3:
          message.height = reader.int32();
          break;
        case 4:
          message.width = reader.int32();
          break;
        case 5:
          message.channel = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ImgInfo_Img {
    return {
      data: isSet(object.data) ? Buffer.from(bytesFromBase64(object.data)) : Buffer.alloc(0),
      type: isSet(object.type) ? imgInfo_ImgTypeFromJSON(object.type) : 0,
      height: isSet(object.height) ? Number(object.height) : 0,
      width: isSet(object.width) ? Number(object.width) : 0,
      channel: isSet(object.channel) ? Number(object.channel) : 0,
    };
  },

  toJSON(message: ImgInfo_Img): unknown {
    const obj: any = {};
    message.data !== undefined && (obj.data = base64FromBytes(message.data !== undefined ? message.data : Buffer.alloc(0)));
    message.type !== undefined && (obj.type = imgInfo_ImgTypeToJSON(message.type));
    message.height !== undefined && (obj.height = Math.round(message.height));
    message.width !== undefined && (obj.width = Math.round(message.width));
    message.channel !== undefined && (obj.channel = Math.round(message.channel));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ImgInfo_Img>, I>>(object: I): ImgInfo_Img {
    const message = createBaseImgInfo_Img();
    message.data = object.data ?? Buffer.alloc(0);
    message.type = object.type ?? 0;
    message.height = object.height ?? 0;
    message.width = object.width ?? 0;
    message.channel = object.channel ?? 0;
    return message;
  },
};

function createBaseImgInfo_MapsEntry(): ImgInfo_MapsEntry {
  return { key: 0, value: undefined };
}

export const ImgInfo_MapsEntry = {
  encode(message: ImgInfo_MapsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== 0) {
      writer.uint32(8).int32(message.key);
    }
    if (message.value !== undefined) {
      ImgInfo_Img.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImgInfo_MapsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImgInfo_MapsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.int32();
          break;
        case 2:
          message.value = ImgInfo_Img.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ImgInfo_MapsEntry {
    return {
      key: isSet(object.key) ? Number(object.key) : 0,
      value: isSet(object.value) ? ImgInfo_Img.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: ImgInfo_MapsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = Math.round(message.key));
    message.value !== undefined && (obj.value = message.value ? ImgInfo_Img.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ImgInfo_MapsEntry>, I>>(object: I): ImgInfo_MapsEntry {
    const message = createBaseImgInfo_MapsEntry();
    message.key = object.key ?? 0;
    message.value = object.value !== undefined && object.value !== null ? ImgInfo_Img.fromPartial(object.value) : undefined;
    return message;
  },
};

function createBaseStatus(): Status {
  return { code: 0 };
}

export const Status = {
  encode(message: Status, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Status {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Status {
    return {
      code: isSet(object.code) ? Number(object.code) : 0,
    };
  },

  toJSON(message: Status): unknown {
    const obj: any = {};
    message.code !== undefined && (obj.code = Math.round(message.code));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Status>, I>>(object: I): Status {
    const message = createBaseStatus();
    message.code = object.code ?? 0;
    return message;
  },
};

function createBaseBaseName(): BaseName {
  return { name: [] };
}

export const BaseName = {
  encode(message: BaseName, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.name) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BaseName {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaseName();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BaseName {
    return {
      name: Array.isArray(object?.name) ? object.name.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: BaseName): unknown {
    const obj: any = {};
    if (message.name) {
      obj.name = message.name.map((e) => e);
    } else {
      obj.name = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BaseName>, I>>(object: I): BaseName {
    const message = createBaseBaseName();
    message.name = object.name?.map((e) => e) || [];
    return message;
  },
};

function createBaseDescription(): Description {
  return { desc: [] };
}

export const Description = {
  encode(message: Description, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.desc) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Description {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescription();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.desc.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Description {
    return {
      desc: Array.isArray(object?.desc) ? object.desc.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: Description): unknown {
    const obj: any = {};
    if (message.desc) {
      obj.desc = message.desc.map((e) => e);
    } else {
      obj.desc = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Description>, I>>(object: I): Description {
    const message = createBaseDescription();
    message.desc = object.desc?.map((e) => e) || [];
    return message;
  },
};

/** service definition. */
export type ImgDemoService = typeof ImgDemoService;
export const ImgDemoService = {
  /** simple RPC */
  resDescFetched: {
    path: '/ImgTransmit.ImgDemo/resDescFetched',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: BaseName) => Buffer.from(BaseName.encode(value).finish()),
    requestDeserialize: (value: Buffer) => BaseName.decode(value),
    responseSerialize: (value: Description) => Buffer.from(Description.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Description.decode(value),
  },
  /**
   * A client-to-server streaming RPC.
   * stream type means a group of ImgInfo will be sent orderly from client
   */
  imgUpload: {
    path: '/ImgTransmit.ImgDemo/ImgUpload',
    requestStream: true,
    responseStream: false,
    requestSerialize: (value: ImgInfo) => Buffer.from(ImgInfo.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ImgInfo.decode(value),
    responseSerialize: (value: Status) => Buffer.from(Status.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Status.decode(value),
  },
  /** A server-to-client streaming RPC. send result img to client */
  resImgFetched: {
    path: '/ImgTransmit.ImgDemo/resImgFetched',
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: BaseName) => Buffer.from(BaseName.encode(value).finish()),
    requestDeserialize: (value: Buffer) => BaseName.decode(value),
    responseSerialize: (value: ImgInfo) => Buffer.from(ImgInfo.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ImgInfo.decode(value),
  },
} as const;

export interface ImgDemoServer extends UntypedServiceImplementation {
  /** simple RPC */
  resDescFetched: handleUnaryCall<BaseName, Description>;
  /**
   * A client-to-server streaming RPC.
   * stream type means a group of ImgInfo will be sent orderly from client
   */
  imgUpload: handleClientStreamingCall<ImgInfo, Status>;
  /** A server-to-client streaming RPC. send result img to client */
  resImgFetched: handleServerStreamingCall<BaseName, ImgInfo>;
}

export interface ImgDemoClient extends Client {
  /** simple RPC */
  resDescFetched(request: BaseName, callback: (error: ServiceError | null, response: Description) => void): ClientUnaryCall;
  resDescFetched(
    request: BaseName,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Description) => void
  ): ClientUnaryCall;
  resDescFetched(
    request: BaseName,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Description) => void
  ): ClientUnaryCall;
  /**
   * A client-to-server streaming RPC.
   * stream type means a group of ImgInfo will be sent orderly from client
   */
  imgUpload(callback: (error: ServiceError | null, response: Status) => void): ClientWritableStream<ImgInfo>;
  imgUpload(metadata: Metadata, callback: (error: ServiceError | null, response: Status) => void): ClientWritableStream<ImgInfo>;
  imgUpload(options: Partial<CallOptions>, callback: (error: ServiceError | null, response: Status) => void): ClientWritableStream<ImgInfo>;
  imgUpload(
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Status) => void
  ): ClientWritableStream<ImgInfo>;
  /** A server-to-client streaming RPC. send result img to client */
  resImgFetched(request: BaseName, options?: Partial<CallOptions>): ClientReadableStream<ImgInfo>;
  resImgFetched(request: BaseName, metadata?: Metadata, options?: Partial<CallOptions>): ClientReadableStream<ImgInfo>;
}

export const ImgDemoClient = makeGenericClientConstructor(ImgDemoService, 'ImgTransmit.ImgDemo') as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ChannelOptions>): ImgDemoClient;
  service: typeof ImgDemoService;
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
