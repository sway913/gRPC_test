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
  handleBidiStreamingCall,
  Client,
  ClientUnaryCall,
  Metadata,
  CallOptions,
  ClientWritableStream,
  ClientReadableStream,
  ClientDuplexStream,
  ServiceError,
} from '@grpc/grpc-js';
import * as _m0 from 'protobufjs/minimal';
import { Struct, ListValue, Value } from './google/protobuf/struct';

/**
 * https://developers.google.com/protocol-buffers/docs/proto3?hl=ko#json
 * https://developers.google.com/protocol-buffers/docs/reference/proto3-spec
 */

export interface HelloRequest {
  name: string;
  paramStruct?: { [key: string]: any };
  paramListValue?: Array<any>;
  paramValue?: any;
}

export interface HelloResponse {
  message: string;
  snakeCase: boolean;
  paramStruct?: { [key: string]: any };
  paramListValue?: Array<any>;
  paramValue?: any;
}

function createBaseHelloRequest(): HelloRequest {
  return { name: '', paramStruct: undefined, paramListValue: undefined, paramValue: undefined };
}

export const HelloRequest = {
  encode(message: HelloRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.paramStruct !== undefined) {
      Struct.encode(Struct.wrap(message.paramStruct), writer.uint32(18).fork()).ldelim();
    }
    if (message.paramListValue !== undefined) {
      ListValue.encode(ListValue.wrap(message.paramListValue), writer.uint32(26).fork()).ldelim();
    }
    if (message.paramValue !== undefined) {
      Value.encode(Value.wrap(message.paramValue), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HelloRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHelloRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.paramStruct = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          break;
        case 3:
          message.paramListValue = ListValue.unwrap(ListValue.decode(reader, reader.uint32()));
          break;
        case 4:
          message.paramValue = Value.unwrap(Value.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HelloRequest {
    return {
      name: isSet(object.name) ? String(object.name) : '',
      paramStruct: isObject(object.paramStruct) ? object.paramStruct : undefined,
      paramListValue: Array.isArray(object.paramListValue) ? [...object.paramListValue] : undefined,
      paramValue: isSet(object?.paramValue) ? object.paramValue : undefined,
    };
  },

  toJSON(message: HelloRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.paramStruct !== undefined && (obj.paramStruct = message.paramStruct);
    message.paramListValue !== undefined && (obj.paramListValue = message.paramListValue);
    message.paramValue !== undefined && (obj.paramValue = message.paramValue);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HelloRequest>, I>>(object: I): HelloRequest {
    const message = createBaseHelloRequest();
    message.name = object.name ?? '';
    message.paramStruct = object.paramStruct ?? undefined;
    message.paramListValue = object.paramListValue ?? undefined;
    message.paramValue = object.paramValue ?? undefined;
    return message;
  },
};

function createBaseHelloResponse(): HelloResponse {
  return { message: '', snakeCase: false, paramStruct: undefined, paramListValue: undefined, paramValue: undefined };
}

export const HelloResponse = {
  encode(message: HelloResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== '') {
      writer.uint32(10).string(message.message);
    }
    if (message.snakeCase === true) {
      writer.uint32(16).bool(message.snakeCase);
    }
    if (message.paramStruct !== undefined) {
      Struct.encode(Struct.wrap(message.paramStruct), writer.uint32(26).fork()).ldelim();
    }
    if (message.paramListValue !== undefined) {
      ListValue.encode(ListValue.wrap(message.paramListValue), writer.uint32(34).fork()).ldelim();
    }
    if (message.paramValue !== undefined) {
      Value.encode(Value.wrap(message.paramValue), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HelloResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHelloResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;
        case 2:
          message.snakeCase = reader.bool();
          break;
        case 3:
          message.paramStruct = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          break;
        case 4:
          message.paramListValue = ListValue.unwrap(ListValue.decode(reader, reader.uint32()));
          break;
        case 5:
          message.paramValue = Value.unwrap(Value.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HelloResponse {
    return {
      message: isSet(object.message) ? String(object.message) : '',
      snakeCase: isSet(object.snakeCase) ? Boolean(object.snakeCase) : false,
      paramStruct: isObject(object.paramStruct) ? object.paramStruct : undefined,
      paramListValue: Array.isArray(object.paramListValue) ? [...object.paramListValue] : undefined,
      paramValue: isSet(object?.paramValue) ? object.paramValue : undefined,
    };
  },

  toJSON(message: HelloResponse): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    message.snakeCase !== undefined && (obj.snakeCase = message.snakeCase);
    message.paramStruct !== undefined && (obj.paramStruct = message.paramStruct);
    message.paramListValue !== undefined && (obj.paramListValue = message.paramListValue);
    message.paramValue !== undefined && (obj.paramValue = message.paramValue);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HelloResponse>, I>>(object: I): HelloResponse {
    const message = createBaseHelloResponse();
    message.message = object.message ?? '';
    message.snakeCase = object.snakeCase ?? false;
    message.paramStruct = object.paramStruct ?? undefined;
    message.paramListValue = object.paramListValue ?? undefined;
    message.paramValue = object.paramValue ?? undefined;
    return message;
  },
};

/** https://developers.google.com/protocol-buffers/docs/style */
export type GreeterService = typeof GreeterService;
export const GreeterService = {
  sayHello: {
    path: '/helloworld.Greeter/SayHello',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: HelloRequest) => Buffer.from(HelloRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => HelloRequest.decode(value),
    responseSerialize: (value: HelloResponse) => Buffer.from(HelloResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => HelloResponse.decode(value),
  },
  sayHelloStreamRequest: {
    path: '/helloworld.Greeter/SayHelloStreamRequest',
    requestStream: true,
    responseStream: false,
    requestSerialize: (value: HelloRequest) => Buffer.from(HelloRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => HelloRequest.decode(value),
    responseSerialize: (value: HelloResponse) => Buffer.from(HelloResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => HelloResponse.decode(value),
  },
  sayHelloStreamResponse: {
    path: '/helloworld.Greeter/SayHelloStreamResponse',
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: HelloRequest) => Buffer.from(HelloRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => HelloRequest.decode(value),
    responseSerialize: (value: HelloResponse) => Buffer.from(HelloResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => HelloResponse.decode(value),
  },
  sayHelloStream: {
    path: '/helloworld.Greeter/SayHelloStream',
    requestStream: true,
    responseStream: true,
    requestSerialize: (value: HelloRequest) => Buffer.from(HelloRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => HelloRequest.decode(value),
    responseSerialize: (value: HelloResponse) => Buffer.from(HelloResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => HelloResponse.decode(value),
  },
} as const;

export interface GreeterServer extends UntypedServiceImplementation {
  sayHello: handleUnaryCall<HelloRequest, HelloResponse>;
  sayHelloStreamRequest: handleClientStreamingCall<HelloRequest, HelloResponse>;
  sayHelloStreamResponse: handleServerStreamingCall<HelloRequest, HelloResponse>;
  sayHelloStream: handleBidiStreamingCall<HelloRequest, HelloResponse>;
}

export interface GreeterClient extends Client {
  sayHello(request: HelloRequest, callback: (error: ServiceError | null, response: HelloResponse) => void): ClientUnaryCall;
  sayHello(
    request: HelloRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: HelloResponse) => void
  ): ClientUnaryCall;
  sayHello(
    request: HelloRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: HelloResponse) => void
  ): ClientUnaryCall;
  sayHelloStreamRequest(callback: (error: ServiceError | null, response: HelloResponse) => void): ClientWritableStream<HelloRequest>;
  sayHelloStreamRequest(
    metadata: Metadata,
    callback: (error: ServiceError | null, response: HelloResponse) => void
  ): ClientWritableStream<HelloRequest>;
  sayHelloStreamRequest(
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: HelloResponse) => void
  ): ClientWritableStream<HelloRequest>;
  sayHelloStreamRequest(
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: HelloResponse) => void
  ): ClientWritableStream<HelloRequest>;
  sayHelloStreamResponse(request: HelloRequest, options?: Partial<CallOptions>): ClientReadableStream<HelloResponse>;
  sayHelloStreamResponse(request: HelloRequest, metadata?: Metadata, options?: Partial<CallOptions>): ClientReadableStream<HelloResponse>;
  sayHelloStream(): ClientDuplexStream<HelloRequest, HelloResponse>;
  sayHelloStream(options: Partial<CallOptions>): ClientDuplexStream<HelloRequest, HelloResponse>;
  sayHelloStream(metadata: Metadata, options?: Partial<CallOptions>): ClientDuplexStream<HelloRequest, HelloResponse>;
}

export const GreeterClient = makeGenericClientConstructor(GreeterService, 'helloworld.Greeter') as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ChannelOptions>): GreeterClient;
  service: typeof GreeterService;
};

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
