
// tslint:disable: max-classes-per-file
// tslint:disable: class-name
// tslint:disable: no-namespace
// tslint:disable: no-shadowed-variable
// tslint:disable: array-type
// tslint:disable: variable-name

const Tools: {
    append: typeof append;
} = {
    append: append,
};
export function append(parts: ArrayBufferLike[]): ArrayBufferLike {
    const tmp = new Uint8Array(parts.map(arr => arr.byteLength).reduce((acc, cur) => acc + cur));
    let cursor = 0;
    parts.forEach((arr) => {
        tmp.set( new Uint8Array(arr), cursor);
        cursor += arr.byteLength;
    });
    return tmp.buffer;
}

export const CBits = 8;

export enum ESize {
    u8 = 'u8',
    u16 = 'u16',
    u32 = 'u32',
    u64 = 'u64',
}

export abstract class Primitive<T> {

    private _value: T;

    constructor(value: T) {
        this._value = value;
    }

    public set(value: T) {
        this._value = value;
    }

    public get(): T {
        return this._value;
    }

    public getSignature(): string {
        return '';
    }

    public static encode(value: any): ArrayBufferLike | Error {
        return new Uint8Array();
    }

    public static decode(bytes: ArrayBufferLike): any | Error {
        return;
    }

    abstract encode(): ArrayBufferLike | Error;

    abstract decode(bytes: ArrayBufferLike): T | Error;

}

export interface IPrimitive<T> {

    getSignature(): string;
    get(): T;
    encode(value: any): ArrayBufferLike | Error;
    decode(bytes: ArrayBufferLike): any | Error;

}

export interface ISigned<T> {

    getSignature(): string;
    get(): T;
    encode(): ArrayBufferLike | Error;
    decode(bytes: ArrayBufferLike): T | Error;

}

export interface ISignedDecode<T> {

    getSignature(): string;
    decode(bytes: ArrayBufferLike): T | Error;

}

export class u8 extends Primitive<number> {

    public static MIN: number = 0;
    public static MAX: number = 255;

    public static getSignature(): string {
        return 'u8';
    }

    public static getSize(): number {
        return 8 / CBits;
    }

    public static encode(value: number): ArrayBufferLike | Error {
        const buffer: Buffer = Buffer.alloc(u8.getSize());
        try {
            buffer.writeUInt8(value);
            return buffer.buffer;
        } catch (err) {
            return err;
        }
    }

    public static decode(bytes: ArrayBufferLike): number | Error {
        if (bytes.byteLength !== u8.getSize()) {
            return new Error(`Invalid buffer size. Expected ${u8.getSize()} bytes, actual ${bytes.byteLength} bytes`);
        }
        try {
            const buffer: Buffer = Buffer.from(bytes);
            return buffer.readUInt8(0);
        } catch (e) {
            return e;
        }
    }

    public static validate(value: any): Error | undefined {
        if (typeof value !== 'number') {
            return new Error(`Invalid type of variable`);
        }
        if (isNaN(value) || !isFinite(value)) {
            return new Error(`Invalid value of variable: ${value}`);
        }
        if (value < u8.MIN || value > u8.MAX) {
            return new Error(`Out of range.`);
        }
        return undefined;
    }

    public getSignature(): string {
        return u8.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return u8.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): number | Error {
        const value = u8.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }

}

export class u16 extends Primitive<number> {

    public static MIN: number = 0;
    public static MAX: number = 65535;

    public static getSignature(): string {
        return 'u16';
    }

    public static getSize(): number {
        return 16 / CBits;
    }

    public static encode(value: number): ArrayBufferLike | Error {
        const buffer: Buffer = Buffer.alloc(u16.getSize());
        try {
            buffer.writeUInt16LE(value);
            return buffer.buffer;
        } catch (err) {
            return err;
        }
    }

    public static decode(bytes: ArrayBufferLike): number | Error {
        if (bytes.byteLength !== u16.getSize()) {
            return new Error(`Invalid buffer size. Expected ${u16.getSize()} bytes, actual ${bytes.byteLength} bytes`);
        }
        try {
            const buffer: Buffer = Buffer.from(bytes);
            return buffer.readUInt16LE(0);
        } catch (e) {
            return e;
        }
    }

    public static validate(value: any): Error | undefined {
        if (typeof value !== 'number') {
            return new Error(`Invalid type of variable`);
        }
        if (isNaN(value) || !isFinite(value)) {
            return new Error(`Invalid value of variable: ${value}`);
        }
        if (value < u16.MIN || value > u16.MAX) {
            return new Error(`Out of range.`);
        }
        return undefined;
    }

    public getSignature(): string {
        return u16.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return u16.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): number | Error {
        const value = u16.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }

}

export class u32 extends Primitive<number> {

    public static MIN: number = 0;
    public static MAX: number = 4294967295;

    public static getSignature(): string {
        return 'u32';
    }

    public static getSize(): number {
        return 32 / CBits;
    }

    public static encode(value: number): ArrayBufferLike | Error {
        const buffer: Buffer = Buffer.alloc(u32.getSize());
        try {
            buffer.writeUInt32LE(value);
            return buffer.buffer;
        } catch (err) {
            return err;
        }
    }

    public static decode(bytes: ArrayBufferLike): number | Error {
        if (bytes.byteLength !== u32.getSize()) {
            return new Error(`Invalid buffer size. Expected ${u32.getSize()} bytes, actual ${bytes.byteLength} bytes`);
        }
        try {
            const buffer: Buffer = Buffer.from(bytes);
            return buffer.readUInt32LE(0);
        } catch (e) {
            return e;
        }
    }

    public static validate(value: any): Error | undefined {
        if (typeof value !== 'number') {
            return new Error(`Invalid type of variable`);
        }
        if (isNaN(value) || !isFinite(value)) {
            return new Error(`Invalid value of variable: ${value}`);
        }
        if (value < u32.MIN || value > u32.MAX) {
            return new Error(`Out of range.`);
        }
        return undefined;
    }

    public getSignature(): string {
        return u32.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return u32.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): number | Error {
        const value = u32.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }

}

export class u64 extends Primitive<bigint> {

    public static MIN: number = 0;
    public static MAX: number = Number.MAX_SAFE_INTEGER;

    public static getSignature(): string {
        return 'u64';
    }

    public static getSize(): number {
        return 64 / CBits;
    }

    public static encode(value: bigint): ArrayBufferLike | Error {
        const buffer: Buffer = Buffer.alloc(u64.getSize());
        try {
            buffer.writeBigUInt64LE(value);
            return buffer.buffer;
        } catch (err) {
            return err;
        }
    }

    public static decode(bytes: ArrayBufferLike): bigint | Error {
        if (bytes.byteLength !== u64.getSize()) {
            return new Error(`Invalid buffer size. Expected ${u64.getSize()} bytes, actual ${bytes.byteLength} bytes`);
        }
        try {
            const buffer: Buffer = Buffer.from(bytes);
            return buffer.readBigUInt64LE(0);
        } catch (e) {
            return e;
        }
    }

    public static validate(value: any): Error | undefined {
        if (typeof value !== 'bigint') {
            return new Error(`Invalid type of variable`);
        }
        if (value < u64.MIN || value > u64.MAX) {
            return new Error(`Out of range.`);
        }
        return undefined;
    }

    public getSignature(): string {
        return u64.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return u64.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): bigint | Error {
        const value = u64.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }
}

export class i8 extends Primitive<number> {

    public static MIN: number = -128;
    public static MAX: number = 127;

    public static getSignature(): string {
        return 'i8';
    }

    public static getSize(): number {
        return 8 / CBits;
    }

    public static encode(value: number): ArrayBufferLike | Error {
        const buffer: Buffer = Buffer.alloc(i8.getSize());
        try {
            buffer.writeInt8(value);
            return buffer.buffer;
        } catch (err) {
            return err;
        }
    }

    public static decode(bytes: ArrayBufferLike): number | Error {
        if (bytes.byteLength !== i8.getSize()) {
            return new Error(`Invalid buffer size. Expected ${i8.getSize()} bytes, actual ${bytes.byteLength} bytes`);
        }
        try {
            const buffer: Buffer = Buffer.from(bytes);
            return buffer.readInt8(0);
        } catch (e) {
            return e;
        }
    }

    public static validate(value: any): Error | undefined {
        if (typeof value !== 'number') {
            return new Error(`Invalid type of variable`);
        }
        if (isNaN(value) || !isFinite(value)) {
            return new Error(`Invalid value of variable: ${value}`);
        }
        if (value < i8.MIN || value > i8.MAX) {
            return new Error(`Out of range.`);
        }
        return undefined;
    }

    public getSignature(): string {
        return i8.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return i8.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): number | Error {
        const value = i8.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }

}

export class i16 extends Primitive<number> {

    public static MIN: number = -32768;
    public static MAX: number = 32767;

    public static getSignature(): string {
        return 'i16';
    }

    public static getSize(): number {
        return 16 / CBits;
    }

    public static encode(value: number): ArrayBufferLike | Error {
        const buffer: Buffer = Buffer.alloc(i16.getSize());
        try {
            buffer.writeInt16LE(value);
            return buffer.buffer;
        } catch (err) {
            return err;
        }
    }

    public static decode(bytes: ArrayBufferLike): number | Error {
        if (bytes.byteLength !== i16.getSize()) {
            return new Error(`Invalid buffer size. Expected ${i16.getSize()} bytes, actual ${bytes.byteLength} bytes`);
        }
        try {
            const buffer: Buffer = Buffer.from(bytes);
            return buffer.readInt16LE(0);
        } catch (e) {
            return e;
        }
    }

    public static validate(value: any): Error | undefined {
        if (typeof value !== 'number') {
            return new Error(`Invalid type of variable`);
        }
        if (isNaN(value) || !isFinite(value)) {
            return new Error(`Invalid value of variable: ${value}`);
        }
        if (value < i16.MIN || value > i16.MAX) {
            return new Error(`Out of range.`);
        }
        return undefined;
    }

    public getSignature(): string {
        return i16.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return i16.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): number | Error {
        const value = i16.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }

}

export class i32 extends Primitive<number> {

    public static MIN: number = -2147483648;
    public static MAX: number = 2147483647;

    public static getSignature(): string {
        return 'i32';
    }

    public static getSize(): number {
        return 32 / CBits;
    }

    public static encode(value: number): ArrayBufferLike | Error {
        const buffer: Buffer = Buffer.alloc(i32.getSize());
        try {
            buffer.writeInt32LE(value);
            return buffer.buffer;
        } catch (err) {
            return err;
        }
    }

    public static decode(bytes: ArrayBufferLike): number | Error {
        if (bytes.byteLength !== i32.getSize()) {
            return new Error(`Invalid buffer size. Expected ${i32.getSize()} bytes, actual ${bytes.byteLength} bytes`);
        }
        try {
            const buffer: Buffer = Buffer.from(bytes);
            return buffer.readInt32LE(0);
        } catch (e) {
            return e;
        }
    }

    public static validate(value: any): Error | undefined {
        if (typeof value !== 'number') {
            return new Error(`Invalid type of variable`);
        }
        if (isNaN(value) || !isFinite(value)) {
            return new Error(`Invalid value of variable: ${value}`);
        }
        if (value < i32.MIN || value > i32.MAX) {
            return new Error(`Out of range.`);
        }
        return undefined;
    }

    public getSignature(): string {
        return i32.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return i32.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): number | Error {
        const value = i32.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }

}

export class i64 extends Primitive<bigint> {

    public static MIN: number = -Number.MAX_SAFE_INTEGER;
    public static MAX: number = Number.MAX_SAFE_INTEGER;

    public static getSignature(): string {
        return 'i64';
    }

    public static getSize(): number {
        return 64 / CBits;
    }

    public static encode(value: bigint): ArrayBufferLike | Error {
        const buffer: Buffer = Buffer.alloc(i64.getSize());
        try {
            buffer.writeBigInt64LE(value);
            return buffer.buffer;
        } catch (err) {
            return err;
        }
    }

    public static decode(bytes: ArrayBufferLike): bigint | Error {
        if (bytes.byteLength !== i64.getSize()) {
            return new Error(`Invalid buffer size. Expected ${i64.getSize()} bytes, actual ${bytes.byteLength} bytes`);
        }
        try {
            const buffer: Buffer = Buffer.from(bytes);
            return buffer.readBigInt64LE(0);
        } catch (e) {
            return e;
        }
    }

    public static validate(value: any): Error | undefined {
        if (typeof value !== 'bigint') {
            return new Error(`Invalid type of variable`);
        }
        if (value < i64.MIN || value > i64.MAX) {
            return new Error(`Out of range.`);
        }
        return undefined;
    }

    public getSignature(): string {
        return i64.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return i64.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): bigint | Error {
        const value = i64.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }

}

export class f32 extends Primitive<number> {

    public static getSignature(): string {
        return 'f32';
    }

    public static getSize(): number {
        return 32 / CBits;
    }

    public static encode(value: number): ArrayBufferLike | Error {
        const buffer: Buffer = Buffer.alloc(f32.getSize());
        try {
            buffer.writeFloatLE(value);
            return buffer.buffer;
        } catch (err) {
            return err;
        }
    }

    public static decode(bytes: ArrayBufferLike): number | Error {
        if (bytes.byteLength !== f32.getSize()) {
            return new Error(`Invalid buffer size. Expected ${f32.getSize()} bytes, actual ${bytes.byteLength} bytes`);
        }
        try {
            const buffer: Buffer = Buffer.from(bytes);
            return buffer.readFloatLE(0);
        } catch (e) {
            return e;
        }
    }

    public static validate(value: any): Error | undefined {
        if (typeof value !== 'number') {
            return new Error(`Invalid type of variable`);
        }
        if (isNaN(value) || !isFinite(value)) {
            return new Error(`Invalid value of variable: ${value}`);
        }
        return undefined;
    }

    public getSignature(): string {
        return f32.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return f32.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): number | Error {
        const value = f32.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }

}

export class f64 extends Primitive<number> {

    public static getSignature(): string {
        return 'f64';
    }

    public static getSize(): number {
        return 64 / CBits;
    }

    public static encode(value: number): ArrayBufferLike | Error {
        const buffer: Buffer = Buffer.alloc(f64.getSize());
        try {
            buffer.writeDoubleLE(value);
            return buffer.buffer;
        } catch (err) {
            return err;
        }
    }

    public static decode(bytes: ArrayBufferLike): number | Error {
        if (bytes.byteLength !== f64.getSize()) {
            return new Error(`Invalid buffer size. Expected ${f64.getSize()} bytes, actual ${bytes.byteLength} bytes`);
        }
        try {
            const buffer: Buffer = Buffer.from(bytes);
            return buffer.readDoubleLE(0);
        } catch (e) {
            return e;
        }
    }

    public static validate(value: any): Error | undefined {
        if (typeof value !== 'number') {
            return new Error(`Invalid type of variable`);
        }
        if (isNaN(value) || !isFinite(value)) {
            return new Error(`Invalid value of variable: ${value}`);
        }
        return undefined;
    }

    public getSignature(): string {
        return f64.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return f64.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): number | Error {
        const value = f64.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }

}

export class bool extends Primitive<boolean> {

    public static getSignature(): string {
        return 'bool';
    }

    public static getSize(): number {
        return 8 / CBits;
    }

    public static encode(value: boolean): ArrayBufferLike | Error {
        const buffer: Buffer = Buffer.alloc(bool.getSize());
        try {
            buffer.writeUInt8(value ? 1 : 0);
            return buffer.buffer;
        } catch (err) {
            return err;
        }
    }

    public static decode(bytes: ArrayBufferLike): boolean | Error {
        if (bytes.byteLength !== bool.getSize()) {
            return new Error(`Invalid buffer size. Expected ${bool.getSize()} bytes, actual ${bytes.byteLength} bytes`);
        }
        try {
            const buffer: Buffer = Buffer.from(bytes);
            return Math.round(buffer.readUInt8(0)) === 1;
        } catch (e) {
            return e;
        }
    }

    public static validate(value: any): Error | undefined {
        if (typeof value !== 'boolean') {
            return new Error(`Invalid type of variable`);
        }
        return undefined;
    }

    public getSignature(): string {
        return bool.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return bool.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): boolean | Error {
        const value = bool.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }

}

export class StrUTF8 extends Primitive<string> {

    public static getSignature(): string {
        return 'strUtf8';
    }

    public static encode(value: string): ArrayBufferLike | Error {
        const encoder = new TextEncoder();
        return encoder.encode(value);
    }

    public static decode(bytes: ArrayBufferLike): string | Error {
        const decoder = new TextDecoder();
        return decoder.decode(bytes);
    }

    public static validate(value: any): Error | undefined {
        if (typeof value !== 'string') {
            return new Error(`Invalid type of variable`);
        }
        return undefined;
    }

    public getSignature(): string {
        return StrUTF8.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return StrUTF8.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): string | Error {
        const value = StrUTF8.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }

}

export class ArrayU8 extends Primitive<number[]> {

    public static getSignature(): string {
        return 'ArrayU8';
    }

    public static encode(value: number[]): ArrayBufferLike | Error {
        const len: number = value.length * u8.getSize();
        const buffer: Buffer = Buffer.alloc(len);
        try {
            let offset: number = 0;
            value.forEach((val) => {
                buffer.writeUInt8(val, offset);
                offset += u8.getSize();
            });
            return buffer.buffer;
        } catch (err) {
            return err;
        }
    }

    public static decode(bytes: ArrayBufferLike): number[] | Error {
        if (bytes.byteLength < u8.getSize()) {
            return new Error(`Invalid buffer size. Expected at least ${u8.getSize()} bytes, actual ${bytes.byteLength} bytes`);
        }
        try {
            let offset: number = 0;
            const array: number[] = [];
            const buffer: Buffer = Buffer.from(bytes);
            do {
                array.push(buffer.readUInt8(offset));
                offset += u8.getSize();
            } while (buffer.byteLength > offset);
            return array;
        } catch (e) {
            return e;
        }
    }

    public static validate(value: any): Error | undefined {
        if (!(value instanceof Array)) {
            return new Error(`Invalid type of variable`);
        }
        try {
            value.forEach((val: any, index: number) => {
                const err: Error | undefined = u8.validate(val);
                if (err instanceof Error) {
                    throw new Error(`Error on index #${index}: ${err.message}`);
                }
            });
        } catch (e) {
            return e;
        }
        return undefined;
    }

    public getSignature(): string {
        return ArrayU8.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return ArrayU8.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): number[] | Error {
        const value = ArrayU8.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }

}

export class ArrayU16 extends Primitive<number[]> {

    public static getSignature(): string {
        return 'ArrayU16';
    }

    public static encode(value: number[]): ArrayBufferLike | Error {
        const len: number = value.length * u16.getSize();
        const buffer: Buffer = Buffer.alloc(len);
        try {
            let offset: number = 0;
            value.forEach((val) => {
                buffer.writeUInt16LE(val, offset);
                offset += u16.getSize();
            });
            return buffer.buffer;
        } catch (err) {
            return err;
        }
    }

    public static decode(bytes: ArrayBufferLike): number[] | Error {
        if (bytes.byteLength < u16.getSize()) {
            return new Error(`Invalid buffer size. Expected at least ${u16.getSize()} bytes, actual ${bytes.byteLength} bytes`);
        }
        try {
            let offset: number = 0;
            const array: number[] = [];
            const buffer: Buffer = Buffer.from(bytes);
            do {
                array.push(buffer.readUInt16LE(offset));
                offset += u16.getSize();
            } while (buffer.byteLength > offset);
            return array;
        } catch (e) {
            return e;
        }
    }

    public static validate(value: any): Error | undefined {
        if (!(value instanceof Array)) {
            return new Error(`Invalid type of variable`);
        }
        try {
            value.forEach((val: any, index: number) => {
                const err: Error | undefined = u16.validate(val);
                if (err instanceof Error) {
                    throw new Error(`Error on index #${index}: ${err.message}`);
                }
            });
        } catch (e) {
            return e;
        }
        return undefined;
    }

    public getSignature(): string {
        return ArrayU16.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return ArrayU16.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): number[] | Error {
        const value = ArrayU16.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }

}

export class ArrayU32 extends Primitive<number[]> {

    public static getSignature(): string {
        return 'ArrayU32';
    }

    public static encode(value: number[]): ArrayBufferLike | Error {
        const len: number = value.length * u32.getSize();
        const buffer: Buffer = Buffer.alloc(len);
        try {
            let offset: number = 0;
            value.forEach((val) => {
                buffer.writeUInt32LE(val, offset);
                offset += u32.getSize();
            });
            return buffer.buffer;
        } catch (err) {
            return err;
        }
    }

    public static decode(bytes: ArrayBufferLike): number[] | Error {
        if (bytes.byteLength < u32.getSize()) {
            return new Error(`Invalid buffer size. Expected at least ${u32.getSize()} bytes, actual ${bytes.byteLength} bytes`);
        }
        try {
            let offset: number = 0;
            const array: number[] = [];
            const buffer: Buffer = Buffer.from(bytes);
            do {
                array.push(buffer.readUInt32LE(offset));
                offset += u32.getSize();
            } while (buffer.byteLength > offset);
            return array;
        } catch (e) {
            return e;
        }
    }

    public static validate(value: any): Error | undefined {
        if (!(value instanceof Array)) {
            return new Error(`Invalid type of variable`);
        }
        try {
            value.forEach((val: any, index: number) => {
                const err: Error | undefined = u32.validate(val);
                if (err instanceof Error) {
                    throw new Error(`Error on index #${index}: ${err.message}`);
                }
            });
        } catch (e) {
            return e;
        }
        return undefined;
    }
    public getSignature(): string {
        return ArrayU32.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return ArrayU32.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): number[] | Error {
        const value = ArrayU32.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }

}

export class ArrayU64 extends Primitive<Array<bigint>> {

    public static getSignature(): string {
        return 'ArrayU64';
    }

    public static encode(value: Array<bigint>): ArrayBufferLike | Error {
        const len: number = value.length * u64.getSize();
        const buffer: Buffer = Buffer.alloc(len);
        try {
            let offset: number = 0;
            value.forEach((val) => {
                buffer.writeBigUInt64LE(val, offset);
                offset += u64.getSize();
            });
            return buffer.buffer;
        } catch (err) {
            return err;
        }
    }

    public static decode(bytes: ArrayBufferLike): Array<bigint> | Error {
        if (bytes.byteLength < u64.getSize()) {
            return new Error(`Invalid buffer size. Expected at least ${u64.getSize()} bytes, actual ${bytes.byteLength} bytes`);
        }
        try {
            let offset: number = 0;
            const array: Array<bigint> = [];
            const buffer: Buffer = Buffer.from(bytes);
            do {
                array.push(buffer.readBigUInt64LE(offset));
                offset += u64.getSize();
            } while (buffer.byteLength > offset);
            return array;
        } catch (e) {
            return e;
        }
    }

    public static validate(value: any): Error | undefined {
        if (!(value instanceof Array)) {
            return new Error(`Invalid type of variable`);
        }
        try {
            value.forEach((val: any, index: number) => {
                const err: Error | undefined = u64.validate(val);
                if (err instanceof Error) {
                    throw new Error(`Error on index #${index}: ${err.message}`);
                }
            });
        } catch (e) {
            return e;
        }
        return undefined;
    }

    public getSignature(): string {
        return ArrayU64.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return ArrayU64.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): Array<bigint> | Error {
        const value = ArrayU64.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }

}

export class ArrayI8 extends Primitive<number[]> {

    public static getSignature(): string {
        return 'ArrayI8';
    }

    public static encode(value: number[]): ArrayBufferLike | Error {
        const len: number = value.length * i8.getSize();
        const buffer: Buffer = Buffer.alloc(len);
        try {
            let offset: number = 0;
            value.forEach((val) => {
                buffer.writeInt8(val, offset);
                offset += i8.getSize();
            });
            return buffer.buffer;
        } catch (err) {
            return err;
        }
    }

    public static decode(bytes: ArrayBufferLike): number[] | Error {
        if (bytes.byteLength < i8.getSize()) {
            return new Error(`Invalid buffer size. Expected at least ${i8.getSize()} bytes, actual ${bytes.byteLength} bytes`);
        }
        try {
            let offset: number = 0;
            const array: number[] = [];
            const buffer: Buffer = Buffer.from(bytes);
            do {
                array.push(buffer.readInt8(offset));
                offset += i8.getSize();
            } while (buffer.byteLength > offset);
            return array;
        } catch (e) {
            return e;
        }
    }

    public static validate(value: any): Error | undefined {
        if (!(value instanceof Array)) {
            return new Error(`Invalid type of variable`);
        }
        try {
            value.forEach((val: any, index: number) => {
                const err: Error | undefined = i8.validate(val);
                if (err instanceof Error) {
                    throw new Error(`Error on index #${index}: ${err.message}`);
                }
            });
        } catch (e) {
            return e;
        }
        return undefined;
    }

    public getSignature(): string {
        return ArrayI8.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return ArrayI8.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): number[] | Error {
        const value = ArrayI8.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }

}

export class ArrayI16 extends Primitive<number[]> {

    public static getSignature(): string {
        return 'ArrayI16';
    }

    public static encode(value: number[]): ArrayBufferLike | Error {
        const len: number = value.length * i16.getSize();
        const buffer: Buffer = Buffer.alloc(len);
        try {
            let offset: number = 0;
            value.forEach((val) => {
                buffer.writeInt16LE(val, offset);
                offset += i16.getSize();
            });
            return buffer.buffer;
        } catch (err) {
            return err;
        }
    }

    public static decode(bytes: ArrayBufferLike): number[] | Error {
        if (bytes.byteLength < i16.getSize()) {
            return new Error(`Invalid buffer size. Expected at least ${i16.getSize()} bytes, actual ${bytes.byteLength} bytes`);
        }
        try {
            let offset: number = 0;
            const array: number[] = [];
            const buffer: Buffer = Buffer.from(bytes);
            do {
                array.push(buffer.readInt16LE(offset));
                offset += i16.getSize();
            } while (buffer.byteLength > offset);
            return array;
        } catch (e) {
            return e;
        }
    }

    public static validate(value: any): Error | undefined {
        if (!(value instanceof Array)) {
            return new Error(`Invalid type of variable`);
        }
        try {
            value.forEach((val: any, index: number) => {
                const err: Error | undefined = i16.validate(val);
                if (err instanceof Error) {
                    throw new Error(`Error on index #${index}: ${err.message}`);
                }
            });
        } catch (e) {
            return e;
        }
        return undefined;
    }

    public getSignature(): string {
        return ArrayI16.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return ArrayI16.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): number[] | Error {
        const value = ArrayI16.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }

}

export class ArrayI32 extends Primitive<number[]> {

    public static getSignature(): string {
        return 'ArrayI32';
    }

    public static encode(value: number[]): ArrayBufferLike | Error {
        const len: number = value.length * i32.getSize();
        const buffer: Buffer = Buffer.alloc(len);
        try {
            let offset: number = 0;
            value.forEach((val) => {
                buffer.writeInt32LE(val, offset);
                offset += i32.getSize();
            });
            return buffer.buffer;
        } catch (err) {
            return err;
        }
    }

    public static decode(bytes: ArrayBufferLike): number[] | Error {
        if (bytes.byteLength < i32.getSize()) {
            return new Error(`Invalid buffer size. Expected at least ${i32.getSize()} bytes, actual ${bytes.byteLength} bytes`);
        }
        try {
            let offset: number = 0;
            const array: number[] = [];
            const buffer: Buffer = Buffer.from(bytes);
            do {
                array.push(buffer.readInt32LE(offset));
                offset += i32.getSize();
            } while (buffer.byteLength > offset);
            return array;
        } catch (e) {
            return e;
        }
    }

    public static validate(value: any): Error | undefined {
        if (!(value instanceof Array)) {
            return new Error(`Invalid type of variable`);
        }
        try {
            value.forEach((val: any, index: number) => {
                const err: Error | undefined = i32.validate(val);
                if (err instanceof Error) {
                    throw new Error(`Error on index #${index}: ${err.message}`);
                }
            });
        } catch (e) {
            return e;
        }
        return undefined;
    }

    public getSignature(): string {
        return ArrayI32.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return ArrayI32.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): number[] | Error {
        const value = ArrayI32.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }

}

export class ArrayI64 extends Primitive<Array<bigint>> {

    public static getSignature(): string {
        return 'ArrayI64';
    }

    public static encode(value: Array<bigint>): ArrayBufferLike | Error {
        const len: number = value.length * i64.getSize();
        const buffer: Buffer = Buffer.alloc(len);
        try {
            let offset: number = 0;
            value.forEach((val) => {
                buffer.writeBigInt64LE(val, offset);
                offset += i64.getSize();
            });
            return buffer.buffer;
        } catch (err) {
            return err;
        }
    }

    public static decode(bytes: ArrayBufferLike): Array<bigint> | Error {
        if (bytes.byteLength < i64.getSize()) {
            return new Error(`Invalid buffer size. Expected at least ${i64.getSize()} bytes, actual ${bytes.byteLength} bytes`);
        }
        try {
            let offset: number = 0;
            const array: Array<bigint> = [];
            const buffer: Buffer = Buffer.from(bytes);
            do {
                array.push(buffer.readBigInt64LE(offset));
                offset += i64.getSize();
            } while (buffer.byteLength > offset);
            return array;
        } catch (e) {
            return e;
        }
    }

    public static validate(value: any): Error | undefined {
        if (!(value instanceof Array)) {
            return new Error(`Invalid type of variable`);
        }
        try {
            value.forEach((val: any, index: number) => {
                const err: Error | undefined = i64.validate(val);
                if (err instanceof Error) {
                    throw new Error(`Error on index #${index}: ${err.message}`);
                }
            });
        } catch (e) {
            return e;
        }
        return undefined;
    }

    public getSignature(): string {
        return ArrayI64.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return ArrayI64.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): Array<bigint> | Error {
        const value = ArrayI64.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }

}

export class ArrayF32 extends Primitive<number[]> {

    public static getSignature(): string {
        return 'ArrayF32';
    }

    public static encode(value: number[]): ArrayBufferLike | Error {
        const len: number = value.length * f32.getSize();
        const buffer: Buffer = Buffer.alloc(len);
        try {
            let offset: number = 0;
            value.forEach((val) => {
                buffer.writeFloatLE(val, offset);
                offset += f32.getSize();
            });
            return buffer.buffer;
        } catch (err) {
            return err;
        }
    }

    public static decode(bytes: ArrayBufferLike): number[] | Error {
        if (bytes.byteLength < f32.getSize()) {
            return new Error(`Invalid buffer size. Expected at least ${f32.getSize()} bytes, actual ${bytes.byteLength} bytes`);
        }
        try {
            let offset: number = 0;
            const array: number[] = [];
            const buffer: Buffer = Buffer.from(bytes);
            do {
                array.push(buffer.readFloatLE(offset));
                offset += f32.getSize();
            } while (buffer.byteLength > offset);
            return array;
        } catch (e) {
            return e;
        }
    }

    public static validate(value: any): Error | undefined {
        if (!(value instanceof Array)) {
            return new Error(`Invalid type of variable`);
        }
        try {
            value.forEach((val: any, index: number) => {
                const err: Error | undefined = f32.validate(val);
                if (err instanceof Error) {
                    throw new Error(`Error on index #${index}: ${err.message}`);
                }
            });
        } catch (e) {
            return e;
        }
        return undefined;
    }

    public getSignature(): string {
        return ArrayF32.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return ArrayF32.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): number[] | Error {
        const value = ArrayF32.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }

}

export class ArrayF64 extends Primitive<number[]> {

    public static getSignature(): string {
        return 'ArrayF64';
    }
    public static encode(value: number[]): ArrayBufferLike | Error {
        const len: number = value.length * f64.getSize();
        const buffer: Buffer = Buffer.alloc(len);
        try {
            let offset: number = 0;
            value.forEach((val) => {
                buffer.writeDoubleLE(val, offset);
                offset += f64.getSize();
            });
            return buffer.buffer;
        } catch (err) {
            return err;
        }
    }

    public static decode(bytes: ArrayBufferLike): number[] | Error {
        if (bytes.byteLength < f64.getSize()) {
            return new Error(`Invalid buffer size. Expected at least ${f64.getSize()} bytes, actual ${bytes.byteLength} bytes`);
        }
        try {
            let offset: number = 0;
            const array: number[] = [];
            const buffer: Buffer = Buffer.from(bytes);
            do {
                array.push(buffer.readDoubleLE(offset));
                offset += f64.getSize();
            } while (buffer.byteLength > offset);
            return array;
        } catch (e) {
            return e;
        }
    }

    public static validate(value: any): Error | undefined {
        if (!(value instanceof Array)) {
            return new Error(`Invalid type of variable`);
        }
        try {
            value.forEach((val: any, index: number) => {
                const err: Error | undefined = f64.validate(val);
                if (err instanceof Error) {
                    throw new Error(`Error on index #${index}: ${err.message}`);
                }
            });
        } catch (e) {
            return e;
        }
        return undefined;
    }

    public getSignature(): string {
        return ArrayF64.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return ArrayF64.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): number[] | Error {
        const value = ArrayF64.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }

}

export class ArrayBool extends Primitive<boolean[]> {

    public static getSignature(): string {
        return 'ArrayBool';
    }

    public static encode(value: boolean[]): ArrayBufferLike | Error {
        const len: number = value.length * u8.getSize();
        const buffer: Buffer = Buffer.alloc(len);
        try {
            let offset: number = 0;
            value.forEach((val) => {
                buffer.writeUInt8(val ? 1 : 0, offset);
                offset += u8.getSize();
            });
            return buffer.buffer;
        } catch (err) {
            return err;
        }
    }

    public static decode(bytes: ArrayBufferLike): boolean[] | Error {
        if (bytes.byteLength < u8.getSize()) {
            return new Error(`Invalid buffer size. Expected at least ${u8.getSize()} bytes, actual ${bytes.byteLength} bytes`);
        }
        try {
            let offset: number = 0;
            const array: boolean[] = [];
            const buffer: Buffer = Buffer.from(bytes);
            do {
                array.push(Math.round(buffer.readUInt8(offset)) === 1 ? true : false);
                offset += u8.getSize();
            } while (buffer.byteLength > offset);
            return array;
        } catch (e) {
            return e;
        }
    }

    public static validate(value: any): Error | undefined {
        if (!(value instanceof Array)) {
            return new Error(`Invalid type of variable`);
        }
        try {
            value.forEach((val: any, index: number) => {
                const err: Error | undefined = bool.validate(val);
                if (err instanceof Error) {
                    throw new Error(`Error on index #${index}: ${err.message}`);
                }
            });
        } catch (e) {
            return e;
        }
        return undefined;
    }

    public getSignature(): string {
        return ArrayBool.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return ArrayBool.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): boolean[] | Error {
        const value = ArrayBool.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }

}

export class ArrayStrUTF8 extends Primitive<string[]> {

    public static getSignature(): string {
        return 'ArrayStrUTF8';
    }

    public static encode(value: string[]): ArrayBufferLike | Error {
        let parts: ArrayBufferLike[] = [];
        let len: number = 0;
        try {
            parts = value.map((val) => {
                const buf = StrUTF8.encode(val);
                if (buf instanceof Error) {
                    throw buf;
                }
                len += buf.byteLength;
                return buf;
            });
        } catch (e) {
            return e;
        }
        const pairs: ArrayBufferLike[] = [];
        try {
            parts.forEach((part) => {
                const partLen = u32.encode(part.byteLength);
                if (partLen instanceof Error) {
                    throw partLen;
                }
                pairs.push(partLen);
                pairs.push(part);
            });
        } catch (e) {
            return e;
        }
        return Tools.append(pairs);
    }

    public static decode(bytes: ArrayBufferLike): string[] | Error {
        const buffer = Buffer.from(bytes);
        const strings: string[] = [];
        let offset: number = 0;
        do {
            const len = buffer.readUInt32LE(offset);
            if (isNaN(len) || !isFinite(len)) {
                return new Error(`Invalid length of string in an array`);
            }
            offset += u32.getSize();
            const body = buffer.slice(offset, offset + len);
            const str = StrUTF8.decode(body);
            if (str instanceof Error) {
                return str;
            }
            strings.push(str);
            offset += body.byteLength;
        } while (offset < buffer.byteLength);
        return strings;
    }

    public static validate(value: any): Error | undefined {
        if (!(value instanceof Array)) {
            return new Error(`Invalid type of variable`);
        }
        try {
            value.forEach((val: any, index: number) => {
                const err: Error | undefined = StrUTF8.validate(val);
                if (err instanceof Error) {
                    throw new Error(`Error on index #${index}: ${err.message}`);
                }
            });
        } catch (e) {
            return e;
        }
        return undefined;
    }

    public getSignature(): string {
        return ArrayStrUTF8.getSignature();
    }

    public encode(): ArrayBufferLike | Error {
        return ArrayStrUTF8.encode(this.get());
    }

    public decode(bytes: ArrayBufferLike): string[] | Error {
        const value = ArrayStrUTF8.decode(bytes);
        if (value instanceof Error) {
            return value;
        }
        this.set(value);
        return value;
    }

}

export class Option<T> {

    private _value: ISigned<T>;
    private _id: number;

    constructor(id: number, value: ISigned<T>) {
        if (value === undefined || value === null || typeof value.encode !== 'function' || typeof value.decode !== 'function') {
            throw new Error(`Expected ISigned<T> as value. But has been gotten: ${JSON.stringify(value)}`);
        }
        this._value = value;
        this._id = id;
    }

    public get(): T {
        return this._value.get();
    }

    public getSigned(): ISigned<T> {
        return this._value;
    }

    public getId(): number {
        return this._id;
    }

}

export class Enum {

    private _allowed: string[] = [];
    private _value: Option<any> | undefined;
    private _getter: (id: number) => ISigned<any>;

    constructor(allowed: string[], getter: (id: number) => ISigned<any>) {
        this._allowed = allowed;
        this._getter = getter;
    }

    public set(opt: Option<any>): Error | undefined {
        const signature: string = opt.getSigned().getSignature();
        if (!this._allowed.includes(signature)) {
            return new Error(`Fail to set value with signature "${signature}" because allows only: ${this._allowed.join(', ')}`);
        }
        this._value = opt;
    }

    public get<T>(): T {
        return this._value.get();
    }

    public getValueIndex(): number {
        return this._value.getId();
    }

    public encode(): ArrayBufferLike {
        if (this._value === undefined) {
            return new Uint8Array();
        }
        const body: ArrayBufferLike | Error = this._value.getSigned().encode();
        if (body instanceof Error) {
            throw body;
        }
        const id = u16.encode(this._value.getId());
        if (id instanceof Error) {
            throw id;
        }
        return Tools.append([id, body]);
    }

    public decode(bytes: ArrayBufferLike): Error | undefined {
        const buffer = Buffer.from(bytes);
        const id: number = buffer.readUInt16LE();
        const target: ISigned<any> = this._getter(id);
        const error: Error | undefined = target.decode(bytes.slice(u16.getSize(), buffer.byteLength));
        if (error instanceof Error) {
            return error;
        }
        try {
            this._value = new Option<any>(id, target);
        } catch (e) {
            return new Error(`Fail to decode due error: ${e}`);
        }
    }



}

export interface IValidator {
    validate(value: any): Error | undefined;
}

export interface IPropScheme {
    prop: string;
    optional?: boolean;
    types?: Required<IValidator>,
    options?: IPropScheme[],
}

export function validate(obj: any, scheme: IPropScheme[]): Error | undefined {
    if (typeof obj !== 'object' || obj === null) {
        return new Error(`Expecting input to be object`);
    }
    const errors: string[] = scheme.map((property: IPropScheme) => {
        if (property.optional && obj[property.prop] === undefined) {
            return undefined;
        }
        if (property.types !== undefined) {
            const err: Error | undefined = property.types.validate(obj[property.prop]);
            if (err instanceof Error) {
                return err.message;
            } else {
                return undefined;
            }
        } else if (property.options instanceof Array) {
            if (typeof obj[property.prop] !== 'object' || obj[property.prop] === null) {
                return `Property "${property.prop}" should be an object, because it's enum`;
            }
            const target: any = obj[property.prop];
            const options: string[] = [];
            try {
                property.options.forEach((prop: IPropScheme) => {
                    if (prop.types === undefined) {
                        throw new Error(`Invalid option description for option "${prop.prop}" of option "${property.prop}"`);
                    }
                    if (target[prop.prop] !== undefined) {
                        options.push(prop.prop);
                        const err: Error | undefined = prop.types.validate(target[prop.prop]);
                        if (err instanceof Error) {
                            throw new Error(`Fail to validate option "${prop.prop}" of option "${property.prop}" due: ${err.message}`);
                        }
                    }
                });
            } catch (e) {
                return e.message;
            }
            if (options.length > 1) {
                return `Enum should have only one definition or nothing. Found values for: ${options.join(', ')}`;
            }
            return undefined;
        } else {
            return `Invalid map definition for property ${property.prop}`
        }
    }).filter(e => e !== undefined);
    return errors.length > 0 ? new Error(errors.join('\n')) : undefined;
}

type u8Alias = u8; const u8Alias = u8;
type u16Alias = u16; const u16Alias = u16;
type u32Alias = u32; const u32Alias = u32;
type u64Alias = u64; const u64Alias = u64;
type i8Alias = i8; const i8Alias = i8;
type i16Alias = i16; const i16Alias = i16;
type i32Alias = i32; const i32Alias = i32;
type i64Alias = i64; const i64Alias = i64;
type f32Alias = f32; const f32Alias = f32;
type f64Alias = f64; const f64Alias = f64;
type boolAlias = bool; const boolAlias = bool;
type StrUTF8Alias = StrUTF8; const StrUTF8Alias = StrUTF8;
type ArrayU8Alias = ArrayU8; const ArrayU8Alias = ArrayU8;
type ArrayU16Alias = ArrayU16; const ArrayU16Alias = ArrayU16;
type ArrayU32Alias = ArrayU32; const ArrayU32Alias = ArrayU32;
type ArrayU64Alias = ArrayU64; const ArrayU64Alias = ArrayU64;
type ArrayI8Alias = ArrayI8; const ArrayI8Alias = ArrayI8;
type ArrayI16Alias = ArrayI16; const ArrayI16Alias = ArrayI16;
type ArrayI32Alias = ArrayI32; const ArrayI32Alias = ArrayI32;
type ArrayI64Alias = ArrayI64; const ArrayI64Alias = ArrayI64;
type ArrayF32Alias = ArrayF32; const ArrayF32Alias = ArrayF32;
type ArrayF64Alias = ArrayF64; const ArrayF64Alias = ArrayF64;
type ArrayBoolAlias = ArrayBool; const ArrayBoolAlias = ArrayBool;
type ArrayStrUTF8Alias = ArrayStrUTF8; const ArrayStrUTF8Alias = ArrayStrUTF8;
type OptionAlias = Option<any>; const OptionAlias = Option;
type EnumAlias = Enum; const EnumAlias = Enum;
type PrimitiveAlias = Primitive<any>; const PrimitiveAlias = Primitive;

export namespace Primitives {
    export const u8 = u8Alias; export type u8 = u8Alias;
    export const u16 = u16Alias; export type u16 = u16Alias;
    export const u32 = u32Alias; export type u32 = u32Alias;
    export const u64 = u64Alias; export type u64 = u64Alias;
    export const i8 = i8Alias; export type i8 = i8Alias;
    export const i16 = i16Alias; export type i16 = i16Alias;
    export const i32 = i32Alias; export type i32 = i32Alias;
    export const i64 = i64Alias; export type i64 = i64Alias;
    export const f32 = f32Alias; export type f32 = f32Alias;
    export const f64 = f64Alias; export type f64 = f64Alias;
    export const bool = boolAlias; export type bool = boolAlias;
    export const StrUTF8 = StrUTF8Alias; export type StrUTF8 = StrUTF8Alias;
    export const ArrayU8 = ArrayU8Alias; export type ArrayU8 = ArrayU8Alias;
    export const ArrayU16 = ArrayU16Alias; export type ArrayU16 = ArrayU16Alias;
    export const ArrayU32 = ArrayU32Alias; export type ArrayU32 = ArrayU32Alias;
    export const ArrayU64 = ArrayU64Alias; export type ArrayU64 = ArrayU64Alias;
    export const ArrayI8 = ArrayI8Alias; export type ArrayI8 = ArrayI8Alias;
    export const ArrayI16 = ArrayI16Alias; export type ArrayI16 = ArrayI16Alias;
    export const ArrayI32 = ArrayI32Alias; export type ArrayI32 = ArrayI32Alias;
    export const ArrayI64 = ArrayI64Alias; export type ArrayI64 = ArrayI64Alias;
    export const ArrayF32 = ArrayF32Alias; export type ArrayF32 = ArrayF32Alias;
    export const ArrayF64 = ArrayF64Alias; export type ArrayF64 = ArrayF64Alias;
    export const ArrayBool = ArrayBoolAlias; export type ArrayBool = ArrayBoolAlias;
    export const ArrayStrUTF8 = ArrayStrUTF8Alias; export type ArrayStrUTF8 = ArrayStrUTF8Alias;
    export const Option = OptionAlias; export type Option = OptionAlias;
    export const Enum = EnumAlias; export type Enum = EnumAlias;
    export const Primitive = PrimitiveAlias; export type Primitive = PrimitiveAlias;
}

interface INext {
    id: number;
    body: ArrayBufferLike;
    position: number;
}

export class Storage {

    private _fields: Map<number, ArrayBufferLike> = new Map();

    public read(bytes: ArrayBufferLike): Error | undefined {
        const buffer = Buffer.from(bytes);
        let position: number = 0;
        do {
            const field: INext | Error = this._next(buffer, position);
            if (field === undefined) {
                return undefined;
            }
            if (field instanceof Error) {
                return field;
            }
            position = field.position;
            this._fields.set(field.id, field.body);
        } while (true);
    }

    public get(id: number): ArrayBufferLike | undefined {
        return this._fields.get(id);
    }

    private _getId(buffer: Buffer, position: number): number | Error {
        try {
            return buffer.readUInt8(position);
        } catch (e) {
            return e;
        }
    }

    private _getRank(buffer: Buffer, position: number): ESize | Error {
        try {
            const rank: number = buffer.readUInt8(position);
            switch(rank) {
                case 8: return ESize.u8;
                case 16: return ESize.u16;
                case 32: return ESize.u32;
                case 64: return ESize.u64;
                default: return new Error(`Invalid size rank`);
            }
        } catch (e) {
            return e;
        }
    }

    private _next(buffer: Buffer, position: number): INext | Error | undefined {
        if (buffer.byteLength === position) {
            return undefined;
        }
        if (buffer.byteLength < position) {
            return new Error(`Invalid position in buffer.`);
        }
        // Get id
        const id: number | Error = this._getId(buffer, position);
        if (id instanceof Error) {
            return id;
        }
        position += 2;
        const rank: ESize | Error = this._getRank(buffer, position);
        if (rank instanceof Error) {
            return rank;
        }
        position += 1;
        try {
            let length: number | bigint;
            switch(rank) {
                case ESize.u8:
                    length = buffer.readUInt8(position);
                    position += Primitives.u8.getSize();
                    break;
                case ESize.u16:
                    length = buffer.readUInt16LE(position);
                    position += Primitives.u16.getSize();
                    break;
                case ESize.u32:
                    length = buffer.readUInt32LE(position);
                    position += Primitives.u32.getSize();
                    break;
                case ESize.u64:
                    length = buffer.readBigUInt64LE(position);
                    position += Primitives.u64.getSize();
                    break;
            };
            const body = buffer.slice(position, position + Number(length));
            position += Number(length);
            return { id, body, position };
        } catch (e) {
            return e;
        }
    }

}

export abstract class Convertor {

    public collect(getters: Array<() => ArrayBufferLike | Error>): ArrayBufferLike {
        const buffers: ArrayBufferLike[] = [];
        try {
            getters.forEach((getter: () => ArrayBufferLike | Error) => {
                const buf: ArrayBufferLike | Error = getter();
                if (buf instanceof Error) {
                    throw buf;
                }
                buffers.push(buf);
            });
        } catch (e) {
            return e;
        }
        return Tools.append(buffers);
    }

    public getBuffer(id: number, esize: ESize, size: number | bigint, value: ArrayBufferLike | Error): ArrayBufferLike | Error {
        if (value instanceof Error) {
            return value;
        }
        const idBuf: ArrayBufferLike | Error = Primitives.u16.encode(id);
        if (idBuf instanceof Error) {
            return idBuf;
        }
        let sizeType: ArrayBufferLike | Error;
        let sizeValue: ArrayBufferLike | Error;
        if (esize === ESize.u64 && typeof size !== 'bigint') {
            return new Error(`For size ${ESize.u64}, size should be defined as BigInt`);
        } else if ((esize === ESize.u8 || esize === ESize.u16 || esize === ESize.u32) && typeof size === 'bigint') {
            return new Error(`For sizes ${ESize.u8}, ${ESize.u16}, ${ESize.u32}, size should be defined as Number`);
        }
        switch(esize) {
            case ESize.u8:
                sizeType = Primitives.u8.encode(Primitives.u8.getSize() * CBits);
                sizeValue = Primitives.u8.encode(size as number);
                break;
            case ESize.u16:
                sizeType = Primitives.u8.encode(Primitives.u16.getSize() * CBits);
                sizeValue = Primitives.u16.encode(size as number);
                break;
            case ESize.u32:
                sizeType = Primitives.u8.encode(Primitives.u32.getSize() * CBits);
                sizeValue = Primitives.u32.encode(size as number);
                break;
            case ESize.u64:
                sizeType = Primitives.u8.encode(Primitives.u64.getSize() * CBits);
                sizeValue = Primitives.u64.encode(BigInt(size));
                break;
        }
        if (sizeType instanceof Error) {
            return sizeType;
        }
        if (sizeValue instanceof Error) {
            return sizeValue;
        }
        if (sizeType === undefined || sizeValue === undefined) {
            return new Error(`Size type or size value aren't defined`);
        }
        return Tools.append([idBuf, sizeType, sizeValue, value]);
    }

    public getBufferFromBuf<T>(id: number, esize: ESize, encoder: (...args: any[]) => ArrayBufferLike | Error, value: T): ArrayBufferLike | Error {
        const buffer = encoder(value);
        if (buffer instanceof Error) {
            return buffer;
        }
        return this.getBuffer(id, esize, esize === ESize.u64 ? BigInt(buffer.byteLength) : buffer.byteLength, buffer);
    }

    public getStorage(buffer: ArrayBufferLike): Storage | Error {
        const storage: Storage = new Storage();
        const error: Error | undefined = storage.read(buffer);
        if (error instanceof Error) {
            return error;
        }
        return storage;
    }

    public getValue<T>(storage: Storage, id: number, decoder: (buf: ArrayBufferLike) => T | Error): T | Error {
        const buffer = storage.get(id);
        if (buffer === undefined) {
            return new Error(`Fail to find field with ID "${id}"`);
        }
        return decoder(buffer);
    }

    public encodeSelfArray(items: Array<Required<Convertor>>): ArrayBufferLike | Error {
        let error: Error | undefined;
        const buffers: ArrayBufferLike[] = [];
        items.forEach((item: Required<Convertor>) => {
            if (error !== undefined) {
                return;
            }
            const buffer = item.encode();
            if (buffer instanceof Error) {
                error = buffer;
                return;
            }
            const len = u32.encode(buffer.byteLength);
            if (len instanceof Error) {
                error = len;
                return;
            }
            buffers.push(len);
            buffers.push(buffer);
        });
        if (error !== undefined) {
            return error;
        }
        return Tools.append(buffers);
    }

    public decodeSelfArray(bytes: ArrayBufferLike): Array<Required<Convertor>> | Error {
        const buffer = Buffer.from(bytes);
        const selfs: Array<Required<Convertor>> = [];
        let offset: number = 0;
        do {
            const len = buffer.readUInt32LE(offset);
            if (isNaN(len) || !isFinite(len)) {
                return new Error(`Invalid length of ${this.getSignature()}/${this.getId()} in an array`);
            }
            offset += u32.getSize();
            const body = buffer.slice(offset, offset + len);
            const self = this.defaults();
            const err = self.decode(body);
            if (err instanceof Error) {
                return err;
            }
            selfs.push(self);
            offset += body.byteLength;
        } while (offset < buffer.byteLength);
        return selfs;
    }

    public abstract getSignature(): string;
    public abstract getId(): number;
    public abstract encode(): ArrayBufferLike;
    public abstract decode(buffer: ArrayBufferLike): Error | undefined;
    public abstract defaults(): Convertor;

}

type ESizeAlias = ESize; const ESizeAlias = ESize;
type ConvertorAlias = Convertor; const ConvertorAlias = Convertor;
type IPropSchemeAlias = IPropScheme;
const PrimitivesAlias = Primitives;
const validateAlias = validate;

namespace Protocol {
    export const ESize = ESizeAlias; export type ESize = ESizeAlias;
    export const Convertor = ConvertorAlias; export type Convertor = ConvertorAlias;
    export type IPropScheme = IPropSchemeAlias;
    export const Primitives = PrimitivesAlias;
    export const validate = validateAlias;
}


export interface EnumExampleA {
    Option_a?: string;
    Option_b?: string;
}

export interface EnumExampleB {
    Option_str?: string;
    Option_u8?: number;
    Option_u16?: number;
    Option_u32?: number;
    Option_u64?: bigint;
    Option_i8?: number;
    Option_i16?: number;
    Option_i32?: number;
    Option_i64?: bigint;
    Option_f32?: number;
    Option_f64?: number;
}

export interface EnumExampleC {
    Option_str?: Array<string>;
    Option_u8?: Array<number>;
    Option_u16?: Array<number>;
    Option_u32?: Array<number>;
    Option_u64?: Array<bigint>;
    Option_i8?: Array<number>;
    Option_i16?: Array<number>;
    Option_i32?: Array<number>;
    Option_i64?: Array<bigint>;
    Option_f32?: Array<number>;
    Option_f64?: Array<number>;
}

export interface IStructExampleA {
    field_str: string;
    field_u8: number;
    field_u16: number;
    field_u32: number;
    field_u64: bigint;
    field_i8: number;
    field_i16: number;
    field_i32: number;
    field_i64: bigint;
    field_f32: number;
    field_f64: number;
    field_bool: boolean;
}
export class StructExampleA extends Protocol.Convertor implements IStructExampleA {

    public static scheme: Protocol.IPropScheme[] = [
        { prop: 'field_str', types: Protocol.Primitives.StrUTF8, optional: false, },
        { prop: 'field_u8', types: Protocol.Primitives.u8, optional: false, },
        { prop: 'field_u16', types: Protocol.Primitives.u16, optional: false, },
        { prop: 'field_u32', types: Protocol.Primitives.u32, optional: false, },
        { prop: 'field_u64', types: Protocol.Primitives.u64, optional: false, },
        { prop: 'field_i8', types: Protocol.Primitives.i8, optional: false, },
        { prop: 'field_i16', types: Protocol.Primitives.i16, optional: false, },
        { prop: 'field_i32', types: Protocol.Primitives.i32, optional: false, },
        { prop: 'field_i64', types: Protocol.Primitives.i64, optional: false, },
        { prop: 'field_f32', types: Protocol.Primitives.f32, optional: false, },
        { prop: 'field_f64', types: Protocol.Primitives.f64, optional: false, },
        { prop: 'field_bool', types: Protocol.Primitives.bool, optional: false, },
    ];

    public static defaults(): StructExampleA {
        return new StructExampleA({
            field_str: '',
            field_u8: 0,
            field_u16: 0,
            field_u32: 0,
            field_u64: BigInt(0),
            field_i8: 0,
            field_i16: 0,
            field_i32: 0,
            field_i64: BigInt(0),
            field_f32: 0,
            field_f64: 0,
            field_bool: true,
        });
    }

    public static getValidator(array: boolean): { validate(value: any): Error | undefined } {
        if (array) {
            return { validate(obj: any): Error | undefined {
                if (!(obj instanceof Array)) {
                    return new Error(`Expecting Array<StructExampleA>`);
                }
                try {
                    obj.forEach((o, index: number) => {
                        if (!(o instanceof StructExampleA)) {
                            throw new Error(`Expecting instance of StructExampleA on index #${index}`);
                        }
                    });
                } catch (e) {
                    return e;
                }
            }};
        } else {
            return { validate(obj: any): Error | undefined {
                return obj instanceof StructExampleA ? undefined : new Error(`Expecting instance of StructExampleA`);
            }};
        }
    }

    public field_str: string;
    public field_u8: number;
    public field_u16: number;
    public field_u32: number;
    public field_u64: bigint;
    public field_i8: number;
    public field_i16: number;
    public field_i32: number;
    public field_i64: bigint;
    public field_f32: number;
    public field_f64: number;
    public field_bool: boolean;

    constructor(params: IStructExampleA)  {
        super();
        Object.keys(params).forEach((key: string) => {
            this[key] = params[key];
        });
    }

    public getSignature(): string {
        return 'StructExampleA';
    }

    public getId(): number {
        return 4;
    }

    public encode(): ArrayBufferLike {
        return this.collect([
            () => this.getBufferFromBuf<string>(5, Protocol.ESize.u64, Protocol.Primitives.StrUTF8.encode, this.field_str),
            () => this.getBuffer(6, Protocol.ESize.u8, Protocol.Primitives.u8.getSize(), Protocol.Primitives.u8.encode(this.field_u8)),
            () => this.getBuffer(7, Protocol.ESize.u8, Protocol.Primitives.u16.getSize(), Protocol.Primitives.u16.encode(this.field_u16)),
            () => this.getBuffer(8, Protocol.ESize.u8, Protocol.Primitives.u32.getSize(), Protocol.Primitives.u32.encode(this.field_u32)),
            () => this.getBuffer(9, Protocol.ESize.u8, Protocol.Primitives.u64.getSize(), Protocol.Primitives.u64.encode(this.field_u64)),
            () => this.getBuffer(10, Protocol.ESize.u8, Protocol.Primitives.i8.getSize(), Protocol.Primitives.i8.encode(this.field_i8)),
            () => this.getBuffer(11, Protocol.ESize.u8, Protocol.Primitives.i16.getSize(), Protocol.Primitives.i16.encode(this.field_i16)),
            () => this.getBuffer(12, Protocol.ESize.u8, Protocol.Primitives.i32.getSize(), Protocol.Primitives.i32.encode(this.field_i32)),
            () => this.getBuffer(13, Protocol.ESize.u8, Protocol.Primitives.i64.getSize(), Protocol.Primitives.i64.encode(this.field_i64)),
            () => this.getBuffer(14, Protocol.ESize.u8, Protocol.Primitives.f32.getSize(), Protocol.Primitives.f32.encode(this.field_f32)),
            () => this.getBuffer(15, Protocol.ESize.u8, Protocol.Primitives.f64.getSize(), Protocol.Primitives.f64.encode(this.field_f64)),
            () => this.getBuffer(16, Protocol.ESize.u8, Protocol.Primitives.bool.getSize(), Protocol.Primitives.bool.encode(this.field_bool)),
        ]);
    }

    public decode(buffer: ArrayBufferLike): Error | undefined {
        const storage = this.getStorage(buffer);
        if (storage instanceof Error) {
            return storage;
        }
        const field_str: string | Error = this.getValue<string>(storage, 5, Protocol.Primitives.StrUTF8.decode);
        if (field_str instanceof Error) {
            return field_str;
        } else {
            this.field_str = field_str;
        }
        const field_u8: number | Error = this.getValue<number>(storage, 6, Protocol.Primitives.u8.decode);
        if (field_u8 instanceof Error) {
            return field_u8;
        } else {
            this.field_u8 = field_u8;
        }
        const field_u16: number | Error = this.getValue<number>(storage, 7, Protocol.Primitives.u16.decode);
        if (field_u16 instanceof Error) {
            return field_u16;
        } else {
            this.field_u16 = field_u16;
        }
        const field_u32: number | Error = this.getValue<number>(storage, 8, Protocol.Primitives.u32.decode);
        if (field_u32 instanceof Error) {
            return field_u32;
        } else {
            this.field_u32 = field_u32;
        }
        const field_u64: bigint | Error = this.getValue<bigint>(storage, 9, Protocol.Primitives.u64.decode);
        if (field_u64 instanceof Error) {
            return field_u64;
        } else {
            this.field_u64 = field_u64;
        }
        const field_i8: number | Error = this.getValue<number>(storage, 10, Protocol.Primitives.i8.decode);
        if (field_i8 instanceof Error) {
            return field_i8;
        } else {
            this.field_i8 = field_i8;
        }
        const field_i16: number | Error = this.getValue<number>(storage, 11, Protocol.Primitives.i16.decode);
        if (field_i16 instanceof Error) {
            return field_i16;
        } else {
            this.field_i16 = field_i16;
        }
        const field_i32: number | Error = this.getValue<number>(storage, 12, Protocol.Primitives.i32.decode);
        if (field_i32 instanceof Error) {
            return field_i32;
        } else {
            this.field_i32 = field_i32;
        }
        const field_i64: bigint | Error = this.getValue<bigint>(storage, 13, Protocol.Primitives.i64.decode);
        if (field_i64 instanceof Error) {
            return field_i64;
        } else {
            this.field_i64 = field_i64;
        }
        const field_f32: number | Error = this.getValue<number>(storage, 14, Protocol.Primitives.f32.decode);
        if (field_f32 instanceof Error) {
            return field_f32;
        } else {
            this.field_f32 = field_f32;
        }
        const field_f64: number | Error = this.getValue<number>(storage, 15, Protocol.Primitives.f64.decode);
        if (field_f64 instanceof Error) {
            return field_f64;
        } else {
            this.field_f64 = field_f64;
        }
        const field_bool: boolean | Error = this.getValue<boolean>(storage, 16, Protocol.Primitives.bool.decode);
        if (field_bool instanceof Error) {
            return field_bool;
        } else {
            this.field_bool = field_bool;
        }
    }

    public defaults(): StructExampleA {
        return StructExampleA.defaults();
    }
}

export interface IStructExampleB {
    field_str: Array<string>;
    field_u8: Array<number>;
    field_u16: Array<number>;
    field_u32: Array<number>;
    field_u64: Array<bigint>;
    field_i8: Array<number>;
    field_i16: Array<number>;
    field_i32: Array<number>;
    field_i64: Array<bigint>;
    field_f32: Array<number>;
    field_f64: Array<number>;
    field_bool: Array<boolean>;
}
export class StructExampleB extends Protocol.Convertor implements IStructExampleB {

    public static scheme: Protocol.IPropScheme[] = [
        { prop: 'field_str', types: Protocol.Primitives.ArrayStrUTF8, optional: false, },
        { prop: 'field_u8', types: Protocol.Primitives.ArrayU8, optional: false, },
        { prop: 'field_u16', types: Protocol.Primitives.ArrayU16, optional: false, },
        { prop: 'field_u32', types: Protocol.Primitives.ArrayU32, optional: false, },
        { prop: 'field_u64', types: Protocol.Primitives.ArrayU64, optional: false, },
        { prop: 'field_i8', types: Protocol.Primitives.ArrayI8, optional: false, },
        { prop: 'field_i16', types: Protocol.Primitives.ArrayI16, optional: false, },
        { prop: 'field_i32', types: Protocol.Primitives.ArrayI32, optional: false, },
        { prop: 'field_i64', types: Protocol.Primitives.ArrayI64, optional: false, },
        { prop: 'field_f32', types: Protocol.Primitives.ArrayF32, optional: false, },
        { prop: 'field_f64', types: Protocol.Primitives.ArrayF64, optional: false, },
        { prop: 'field_bool', types: Protocol.Primitives.ArrayBool, optional: false, },
    ];

    public static defaults(): StructExampleB {
        return new StructExampleB({
            field_str: [],
            field_u8: [],
            field_u16: [],
            field_u32: [],
            field_u64: [],
            field_i8: [],
            field_i16: [],
            field_i32: [],
            field_i64: [],
            field_f32: [],
            field_f64: [],
            field_bool: [],
        });
    }

    public static getValidator(array: boolean): { validate(value: any): Error | undefined } {
        if (array) {
            return { validate(obj: any): Error | undefined {
                if (!(obj instanceof Array)) {
                    return new Error(`Expecting Array<StructExampleB>`);
                }
                try {
                    obj.forEach((o, index: number) => {
                        if (!(o instanceof StructExampleB)) {
                            throw new Error(`Expecting instance of StructExampleB on index #${index}`);
                        }
                    });
                } catch (e) {
                    return e;
                }
            }};
        } else {
            return { validate(obj: any): Error | undefined {
                return obj instanceof StructExampleB ? undefined : new Error(`Expecting instance of StructExampleB`);
            }};
        }
    }

    public field_str: Array<string>;
    public field_u8: Array<number>;
    public field_u16: Array<number>;
    public field_u32: Array<number>;
    public field_u64: Array<bigint>;
    public field_i8: Array<number>;
    public field_i16: Array<number>;
    public field_i32: Array<number>;
    public field_i64: Array<bigint>;
    public field_f32: Array<number>;
    public field_f64: Array<number>;
    public field_bool: Array<boolean>;

    constructor(params: IStructExampleB)  {
        super();
        Object.keys(params).forEach((key: string) => {
            this[key] = params[key];
        });
    }

    public getSignature(): string {
        return 'StructExampleB';
    }

    public getId(): number {
        return 17;
    }

    public encode(): ArrayBufferLike {
        return this.collect([
            () => this.getBufferFromBuf<Array<string>>(18, Protocol.ESize.u64, Protocol.Primitives.ArrayStrUTF8.encode, this.field_str),
            () => this.getBufferFromBuf<Array<number>>(19, Protocol.ESize.u8, Protocol.Primitives.ArrayU8.encode, this.field_u8),
            () => this.getBufferFromBuf<Array<number>>(20, Protocol.ESize.u8, Protocol.Primitives.ArrayU16.encode, this.field_u16),
            () => this.getBufferFromBuf<Array<number>>(21, Protocol.ESize.u8, Protocol.Primitives.ArrayU32.encode, this.field_u32),
            () => this.getBufferFromBuf<Array<bigint>>(22, Protocol.ESize.u8, Protocol.Primitives.ArrayU64.encode, this.field_u64),
            () => this.getBufferFromBuf<Array<number>>(23, Protocol.ESize.u8, Protocol.Primitives.ArrayI8.encode, this.field_i8),
            () => this.getBufferFromBuf<Array<number>>(24, Protocol.ESize.u8, Protocol.Primitives.ArrayI16.encode, this.field_i16),
            () => this.getBufferFromBuf<Array<number>>(25, Protocol.ESize.u8, Protocol.Primitives.ArrayI32.encode, this.field_i32),
            () => this.getBufferFromBuf<Array<bigint>>(26, Protocol.ESize.u8, Protocol.Primitives.ArrayI64.encode, this.field_i64),
            () => this.getBufferFromBuf<Array<number>>(27, Protocol.ESize.u8, Protocol.Primitives.ArrayF32.encode, this.field_f32),
            () => this.getBufferFromBuf<Array<number>>(28, Protocol.ESize.u8, Protocol.Primitives.ArrayF64.encode, this.field_f64),
            () => this.getBufferFromBuf<Array<boolean>>(29, Protocol.ESize.u8, Protocol.Primitives.ArrayBool.encode, this.field_bool),
        ]);
    }

    public decode(buffer: ArrayBufferLike): Error | undefined {
        const storage = this.getStorage(buffer);
        if (storage instanceof Error) {
            return storage;
        }
        const field_str: Array<string> | Error = this.getValue<Array<string>>(storage, 18, Protocol.Primitives.ArrayStrUTF8.decode);
        if (field_str instanceof Error) {
            return field_str;
        } else {
            this.field_str = field_str;
        }
        const field_u8: Array<number> | Error = this.getValue<Array<number>>(storage, 19, Protocol.Primitives.ArrayU8.decode);
        if (field_u8 instanceof Error) {
            return field_u8;
        } else {
            this.field_u8 = field_u8;
        }
        const field_u16: Array<number> | Error = this.getValue<Array<number>>(storage, 20, Protocol.Primitives.ArrayU16.decode);
        if (field_u16 instanceof Error) {
            return field_u16;
        } else {
            this.field_u16 = field_u16;
        }
        const field_u32: Array<number> | Error = this.getValue<Array<number>>(storage, 21, Protocol.Primitives.ArrayU32.decode);
        if (field_u32 instanceof Error) {
            return field_u32;
        } else {
            this.field_u32 = field_u32;
        }
        const field_u64: Array<bigint> | Error = this.getValue<Array<bigint>>(storage, 22, Protocol.Primitives.ArrayU64.decode);
        if (field_u64 instanceof Error) {
            return field_u64;
        } else {
            this.field_u64 = field_u64;
        }
        const field_i8: Array<number> | Error = this.getValue<Array<number>>(storage, 23, Protocol.Primitives.ArrayI8.decode);
        if (field_i8 instanceof Error) {
            return field_i8;
        } else {
            this.field_i8 = field_i8;
        }
        const field_i16: Array<number> | Error = this.getValue<Array<number>>(storage, 24, Protocol.Primitives.ArrayI16.decode);
        if (field_i16 instanceof Error) {
            return field_i16;
        } else {
            this.field_i16 = field_i16;
        }
        const field_i32: Array<number> | Error = this.getValue<Array<number>>(storage, 25, Protocol.Primitives.ArrayI32.decode);
        if (field_i32 instanceof Error) {
            return field_i32;
        } else {
            this.field_i32 = field_i32;
        }
        const field_i64: Array<bigint> | Error = this.getValue<Array<bigint>>(storage, 26, Protocol.Primitives.ArrayI64.decode);
        if (field_i64 instanceof Error) {
            return field_i64;
        } else {
            this.field_i64 = field_i64;
        }
        const field_f32: Array<number> | Error = this.getValue<Array<number>>(storage, 27, Protocol.Primitives.ArrayF32.decode);
        if (field_f32 instanceof Error) {
            return field_f32;
        } else {
            this.field_f32 = field_f32;
        }
        const field_f64: Array<number> | Error = this.getValue<Array<number>>(storage, 28, Protocol.Primitives.ArrayF64.decode);
        if (field_f64 instanceof Error) {
            return field_f64;
        } else {
            this.field_f64 = field_f64;
        }
        const field_bool: Array<boolean> | Error = this.getValue<Array<boolean>>(storage, 29, Protocol.Primitives.ArrayBool.decode);
        if (field_bool instanceof Error) {
            return field_bool;
        } else {
            this.field_bool = field_bool;
        }
    }

    public defaults(): StructExampleB {
        return StructExampleB.defaults();
    }
}

export interface IStructExampleC {
    field_str: string | undefined;
    field_u8: number | undefined;
    field_u16: number | undefined;
    field_u32: number | undefined;
    field_u64: bigint | undefined;
    field_i8: number | undefined;
    field_i16: number | undefined;
    field_i32: number | undefined;
    field_i64: bigint | undefined;
    field_f32: number | undefined;
    field_f64: number | undefined;
    field_bool: boolean | undefined;
}
export class StructExampleC extends Protocol.Convertor implements IStructExampleC {

    public static scheme: Protocol.IPropScheme[] = [
        { prop: 'field_str', types: Protocol.Primitives.StrUTF8, optional: true, },
        { prop: 'field_u8', types: Protocol.Primitives.u8, optional: true, },
        { prop: 'field_u16', types: Protocol.Primitives.u16, optional: true, },
        { prop: 'field_u32', types: Protocol.Primitives.u32, optional: true, },
        { prop: 'field_u64', types: Protocol.Primitives.u64, optional: true, },
        { prop: 'field_i8', types: Protocol.Primitives.i8, optional: true, },
        { prop: 'field_i16', types: Protocol.Primitives.i16, optional: true, },
        { prop: 'field_i32', types: Protocol.Primitives.i32, optional: true, },
        { prop: 'field_i64', types: Protocol.Primitives.i64, optional: true, },
        { prop: 'field_f32', types: Protocol.Primitives.f32, optional: true, },
        { prop: 'field_f64', types: Protocol.Primitives.f64, optional: true, },
        { prop: 'field_bool', types: Protocol.Primitives.bool, optional: true, },
    ];

    public static defaults(): StructExampleC {
        return new StructExampleC({
            field_str: undefined,
            field_u8: undefined,
            field_u16: undefined,
            field_u32: undefined,
            field_u64: undefined,
            field_i8: undefined,
            field_i16: undefined,
            field_i32: undefined,
            field_i64: undefined,
            field_f32: undefined,
            field_f64: undefined,
            field_bool: undefined,
        });
    }

    public static getValidator(array: boolean): { validate(value: any): Error | undefined } {
        if (array) {
            return { validate(obj: any): Error | undefined {
                if (!(obj instanceof Array)) {
                    return new Error(`Expecting Array<StructExampleC>`);
                }
                try {
                    obj.forEach((o, index: number) => {
                        if (!(o instanceof StructExampleC)) {
                            throw new Error(`Expecting instance of StructExampleC on index #${index}`);
                        }
                    });
                } catch (e) {
                    return e;
                }
            }};
        } else {
            return { validate(obj: any): Error | undefined {
                return obj instanceof StructExampleC ? undefined : new Error(`Expecting instance of StructExampleC`);
            }};
        }
    }

    public field_str: string | undefined;
    public field_u8: number | undefined;
    public field_u16: number | undefined;
    public field_u32: number | undefined;
    public field_u64: bigint | undefined;
    public field_i8: number | undefined;
    public field_i16: number | undefined;
    public field_i32: number | undefined;
    public field_i64: bigint | undefined;
    public field_f32: number | undefined;
    public field_f64: number | undefined;
    public field_bool: boolean | undefined;

    constructor(params: IStructExampleC)  {
        super();
        Object.keys(params).forEach((key: string) => {
            this[key] = params[key];
        });
    }

    public getSignature(): string {
        return 'StructExampleC';
    }

    public getId(): number {
        return 30;
    }

    public encode(): ArrayBufferLike {
        return this.collect([
            () => this.field_str === undefined ? this.getBuffer(31, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBufferFromBuf<string>(31, Protocol.ESize.u64, Protocol.Primitives.StrUTF8.encode, this.field_str),
            () => this.field_u8 === undefined ? this.getBuffer(32, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBuffer(32, Protocol.ESize.u8, Protocol.Primitives.u8.getSize(), Protocol.Primitives.u8.encode(this.field_u8)),
            () => this.field_u16 === undefined ? this.getBuffer(33, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBuffer(33, Protocol.ESize.u8, Protocol.Primitives.u16.getSize(), Protocol.Primitives.u16.encode(this.field_u16)),
            () => this.field_u32 === undefined ? this.getBuffer(34, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBuffer(34, Protocol.ESize.u8, Protocol.Primitives.u32.getSize(), Protocol.Primitives.u32.encode(this.field_u32)),
            () => this.field_u64 === undefined ? this.getBuffer(35, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBuffer(35, Protocol.ESize.u8, Protocol.Primitives.u64.getSize(), Protocol.Primitives.u64.encode(this.field_u64)),
            () => this.field_i8 === undefined ? this.getBuffer(36, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBuffer(36, Protocol.ESize.u8, Protocol.Primitives.i8.getSize(), Protocol.Primitives.i8.encode(this.field_i8)),
            () => this.field_i16 === undefined ? this.getBuffer(37, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBuffer(37, Protocol.ESize.u8, Protocol.Primitives.i16.getSize(), Protocol.Primitives.i16.encode(this.field_i16)),
            () => this.field_i32 === undefined ? this.getBuffer(38, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBuffer(38, Protocol.ESize.u8, Protocol.Primitives.i32.getSize(), Protocol.Primitives.i32.encode(this.field_i32)),
            () => this.field_i64 === undefined ? this.getBuffer(39, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBuffer(39, Protocol.ESize.u8, Protocol.Primitives.i64.getSize(), Protocol.Primitives.i64.encode(this.field_i64)),
            () => this.field_f32 === undefined ? this.getBuffer(40, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBuffer(40, Protocol.ESize.u8, Protocol.Primitives.f32.getSize(), Protocol.Primitives.f32.encode(this.field_f32)),
            () => this.field_f64 === undefined ? this.getBuffer(41, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBuffer(41, Protocol.ESize.u8, Protocol.Primitives.f64.getSize(), Protocol.Primitives.f64.encode(this.field_f64)),
            () => this.field_bool === undefined ? this.getBuffer(42, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBuffer(42, Protocol.ESize.u8, Protocol.Primitives.bool.getSize(), Protocol.Primitives.bool.encode(this.field_bool)),
        ]);
    }

    public decode(buffer: ArrayBufferLike): Error | undefined {
        const storage = this.getStorage(buffer);
        if (storage instanceof Error) {
            return storage;
        }
        const field_strBuf: ArrayBufferLike | undefined = storage.get(31);
        if (field_strBuf === undefined) {
            return new Error(`Fail to get property field_str`);
        }
        if (field_strBuf.byteLength === 0) {
            this.field_str = undefined;
        } else {
            const field_str: string | Error = this.getValue<string>(storage, 31, Protocol.Primitives.StrUTF8.decode);
            if (field_str instanceof Error) {
                return field_str;
            } else {
                this.field_str = field_str;
            }
        }
        const field_u8Buf: ArrayBufferLike | undefined = storage.get(32);
        if (field_u8Buf === undefined) {
            return new Error(`Fail to get property field_u8`);
        }
        if (field_u8Buf.byteLength === 0) {
            this.field_u8 = undefined;
        } else {
            const field_u8: number | Error = this.getValue<number>(storage, 32, Protocol.Primitives.u8.decode);
            if (field_u8 instanceof Error) {
                return field_u8;
            } else {
                this.field_u8 = field_u8;
            }
        }
        const field_u16Buf: ArrayBufferLike | undefined = storage.get(33);
        if (field_u16Buf === undefined) {
            return new Error(`Fail to get property field_u16`);
        }
        if (field_u16Buf.byteLength === 0) {
            this.field_u16 = undefined;
        } else {
            const field_u16: number | Error = this.getValue<number>(storage, 33, Protocol.Primitives.u16.decode);
            if (field_u16 instanceof Error) {
                return field_u16;
            } else {
                this.field_u16 = field_u16;
            }
        }
        const field_u32Buf: ArrayBufferLike | undefined = storage.get(34);
        if (field_u32Buf === undefined) {
            return new Error(`Fail to get property field_u32`);
        }
        if (field_u32Buf.byteLength === 0) {
            this.field_u32 = undefined;
        } else {
            const field_u32: number | Error = this.getValue<number>(storage, 34, Protocol.Primitives.u32.decode);
            if (field_u32 instanceof Error) {
                return field_u32;
            } else {
                this.field_u32 = field_u32;
            }
        }
        const field_u64Buf: ArrayBufferLike | undefined = storage.get(35);
        if (field_u64Buf === undefined) {
            return new Error(`Fail to get property field_u64`);
        }
        if (field_u64Buf.byteLength === 0) {
            this.field_u64 = undefined;
        } else {
            const field_u64: bigint | Error = this.getValue<bigint>(storage, 35, Protocol.Primitives.u64.decode);
            if (field_u64 instanceof Error) {
                return field_u64;
            } else {
                this.field_u64 = field_u64;
            }
        }
        const field_i8Buf: ArrayBufferLike | undefined = storage.get(36);
        if (field_i8Buf === undefined) {
            return new Error(`Fail to get property field_i8`);
        }
        if (field_i8Buf.byteLength === 0) {
            this.field_i8 = undefined;
        } else {
            const field_i8: number | Error = this.getValue<number>(storage, 36, Protocol.Primitives.i8.decode);
            if (field_i8 instanceof Error) {
                return field_i8;
            } else {
                this.field_i8 = field_i8;
            }
        }
        const field_i16Buf: ArrayBufferLike | undefined = storage.get(37);
        if (field_i16Buf === undefined) {
            return new Error(`Fail to get property field_i16`);
        }
        if (field_i16Buf.byteLength === 0) {
            this.field_i16 = undefined;
        } else {
            const field_i16: number | Error = this.getValue<number>(storage, 37, Protocol.Primitives.i16.decode);
            if (field_i16 instanceof Error) {
                return field_i16;
            } else {
                this.field_i16 = field_i16;
            }
        }
        const field_i32Buf: ArrayBufferLike | undefined = storage.get(38);
        if (field_i32Buf === undefined) {
            return new Error(`Fail to get property field_i32`);
        }
        if (field_i32Buf.byteLength === 0) {
            this.field_i32 = undefined;
        } else {
            const field_i32: number | Error = this.getValue<number>(storage, 38, Protocol.Primitives.i32.decode);
            if (field_i32 instanceof Error) {
                return field_i32;
            } else {
                this.field_i32 = field_i32;
            }
        }
        const field_i64Buf: ArrayBufferLike | undefined = storage.get(39);
        if (field_i64Buf === undefined) {
            return new Error(`Fail to get property field_i64`);
        }
        if (field_i64Buf.byteLength === 0) {
            this.field_i64 = undefined;
        } else {
            const field_i64: bigint | Error = this.getValue<bigint>(storage, 39, Protocol.Primitives.i64.decode);
            if (field_i64 instanceof Error) {
                return field_i64;
            } else {
                this.field_i64 = field_i64;
            }
        }
        const field_f32Buf: ArrayBufferLike | undefined = storage.get(40);
        if (field_f32Buf === undefined) {
            return new Error(`Fail to get property field_f32`);
        }
        if (field_f32Buf.byteLength === 0) {
            this.field_f32 = undefined;
        } else {
            const field_f32: number | Error = this.getValue<number>(storage, 40, Protocol.Primitives.f32.decode);
            if (field_f32 instanceof Error) {
                return field_f32;
            } else {
                this.field_f32 = field_f32;
            }
        }
        const field_f64Buf: ArrayBufferLike | undefined = storage.get(41);
        if (field_f64Buf === undefined) {
            return new Error(`Fail to get property field_f64`);
        }
        if (field_f64Buf.byteLength === 0) {
            this.field_f64 = undefined;
        } else {
            const field_f64: number | Error = this.getValue<number>(storage, 41, Protocol.Primitives.f64.decode);
            if (field_f64 instanceof Error) {
                return field_f64;
            } else {
                this.field_f64 = field_f64;
            }
        }
        const field_boolBuf: ArrayBufferLike | undefined = storage.get(42);
        if (field_boolBuf === undefined) {
            return new Error(`Fail to get property field_bool`);
        }
        if (field_boolBuf.byteLength === 0) {
            this.field_bool = undefined;
        } else {
            const field_bool: boolean | Error = this.getValue<boolean>(storage, 42, Protocol.Primitives.bool.decode);
            if (field_bool instanceof Error) {
                return field_bool;
            } else {
                this.field_bool = field_bool;
            }
        }
    }

    public defaults(): StructExampleC {
        return StructExampleC.defaults();
    }
}

export interface IStructExampleD {
    field_str: Array<string | undefined>;
    field_u8: Array<number | undefined>;
    field_u16: Array<number | undefined>;
    field_u32: Array<number | undefined>;
    field_u64: Array<bigint | undefined>;
    field_i8: Array<number | undefined>;
    field_i16: Array<number | undefined>;
    field_i32: Array<number | undefined>;
    field_i64: Array<bigint | undefined>;
    field_f32: Array<number | undefined>;
    field_f64: Array<number | undefined>;
    field_bool: Array<boolean | undefined>;
}
export class StructExampleD extends Protocol.Convertor implements IStructExampleD {

    public static scheme: Protocol.IPropScheme[] = [
        { prop: 'field_str', types: Protocol.Primitives.ArrayStrUTF8, optional: true, },
        { prop: 'field_u8', types: Protocol.Primitives.ArrayU8, optional: true, },
        { prop: 'field_u16', types: Protocol.Primitives.ArrayU16, optional: true, },
        { prop: 'field_u32', types: Protocol.Primitives.ArrayU32, optional: true, },
        { prop: 'field_u64', types: Protocol.Primitives.ArrayU64, optional: true, },
        { prop: 'field_i8', types: Protocol.Primitives.ArrayI8, optional: true, },
        { prop: 'field_i16', types: Protocol.Primitives.ArrayI16, optional: true, },
        { prop: 'field_i32', types: Protocol.Primitives.ArrayI32, optional: true, },
        { prop: 'field_i64', types: Protocol.Primitives.ArrayI64, optional: true, },
        { prop: 'field_f32', types: Protocol.Primitives.ArrayF32, optional: true, },
        { prop: 'field_f64', types: Protocol.Primitives.ArrayF64, optional: true, },
        { prop: 'field_bool', types: Protocol.Primitives.ArrayBool, optional: true, },
    ];

    public static defaults(): StructExampleD {
        return new StructExampleD({
            field_str: undefined,
            field_u8: undefined,
            field_u16: undefined,
            field_u32: undefined,
            field_u64: undefined,
            field_i8: undefined,
            field_i16: undefined,
            field_i32: undefined,
            field_i64: undefined,
            field_f32: undefined,
            field_f64: undefined,
            field_bool: undefined,
        });
    }

    public static getValidator(array: boolean): { validate(value: any): Error | undefined } {
        if (array) {
            return { validate(obj: any): Error | undefined {
                if (!(obj instanceof Array)) {
                    return new Error(`Expecting Array<StructExampleD>`);
                }
                try {
                    obj.forEach((o, index: number) => {
                        if (!(o instanceof StructExampleD)) {
                            throw new Error(`Expecting instance of StructExampleD on index #${index}`);
                        }
                    });
                } catch (e) {
                    return e;
                }
            }};
        } else {
            return { validate(obj: any): Error | undefined {
                return obj instanceof StructExampleD ? undefined : new Error(`Expecting instance of StructExampleD`);
            }};
        }
    }

    public field_str: Array<string | undefined>;
    public field_u8: Array<number | undefined>;
    public field_u16: Array<number | undefined>;
    public field_u32: Array<number | undefined>;
    public field_u64: Array<bigint | undefined>;
    public field_i8: Array<number | undefined>;
    public field_i16: Array<number | undefined>;
    public field_i32: Array<number | undefined>;
    public field_i64: Array<bigint | undefined>;
    public field_f32: Array<number | undefined>;
    public field_f64: Array<number | undefined>;
    public field_bool: Array<boolean | undefined>;

    constructor(params: IStructExampleD)  {
        super();
        Object.keys(params).forEach((key: string) => {
            this[key] = params[key];
        });
    }

    public getSignature(): string {
        return 'StructExampleD';
    }

    public getId(): number {
        return 43;
    }

    public encode(): ArrayBufferLike {
        return this.collect([
            () => this.field_str === undefined ? this.getBuffer(44, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBufferFromBuf<Array<string>>(44, Protocol.ESize.u64, Protocol.Primitives.ArrayStrUTF8.encode, this.field_str),
            () => this.field_u8 === undefined ? this.getBuffer(45, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBufferFromBuf<Array<number>>(45, Protocol.ESize.u8, Protocol.Primitives.ArrayU8.encode, this.field_u8),
            () => this.field_u16 === undefined ? this.getBuffer(46, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBufferFromBuf<Array<number>>(46, Protocol.ESize.u8, Protocol.Primitives.ArrayU16.encode, this.field_u16),
            () => this.field_u32 === undefined ? this.getBuffer(47, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBufferFromBuf<Array<number>>(47, Protocol.ESize.u8, Protocol.Primitives.ArrayU32.encode, this.field_u32),
            () => this.field_u64 === undefined ? this.getBuffer(48, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBufferFromBuf<Array<bigint>>(48, Protocol.ESize.u8, Protocol.Primitives.ArrayU64.encode, this.field_u64),
            () => this.field_i8 === undefined ? this.getBuffer(49, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBufferFromBuf<Array<number>>(49, Protocol.ESize.u8, Protocol.Primitives.ArrayI8.encode, this.field_i8),
            () => this.field_i16 === undefined ? this.getBuffer(50, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBufferFromBuf<Array<number>>(50, Protocol.ESize.u8, Protocol.Primitives.ArrayI16.encode, this.field_i16),
            () => this.field_i32 === undefined ? this.getBuffer(51, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBufferFromBuf<Array<number>>(51, Protocol.ESize.u8, Protocol.Primitives.ArrayI32.encode, this.field_i32),
            () => this.field_i64 === undefined ? this.getBuffer(52, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBufferFromBuf<Array<bigint>>(52, Protocol.ESize.u8, Protocol.Primitives.ArrayI64.encode, this.field_i64),
            () => this.field_f32 === undefined ? this.getBuffer(53, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBufferFromBuf<Array<number>>(53, Protocol.ESize.u8, Protocol.Primitives.ArrayF32.encode, this.field_f32),
            () => this.field_f64 === undefined ? this.getBuffer(54, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBufferFromBuf<Array<number>>(54, Protocol.ESize.u8, Protocol.Primitives.ArrayF64.encode, this.field_f64),
            () => this.field_bool === undefined ? this.getBuffer(55, Protocol.ESize.u8, 0, new Uint8Array()) : this.getBufferFromBuf<Array<boolean>>(55, Protocol.ESize.u8, Protocol.Primitives.ArrayBool.encode, this.field_bool),
        ]);
    }

    public decode(buffer: ArrayBufferLike): Error | undefined {
        const storage = this.getStorage(buffer);
        if (storage instanceof Error) {
            return storage;
        }
        const field_strBuf: ArrayBufferLike | undefined = storage.get(44);
        if (field_strBuf === undefined) {
            return new Error(`Fail to get property field_str`);
        }
        if (field_strBuf.byteLength === 0) {
            this.field_str = undefined;
        } else {
            const field_str: Array<string> | Error = this.getValue<Array<string>>(storage, 44, Protocol.Primitives.ArrayStrUTF8.decode);
            if (field_str instanceof Error) {
                return field_str;
            } else {
                this.field_str = field_str;
            }
        }
        const field_u8Buf: ArrayBufferLike | undefined = storage.get(45);
        if (field_u8Buf === undefined) {
            return new Error(`Fail to get property field_u8`);
        }
        if (field_u8Buf.byteLength === 0) {
            this.field_u8 = undefined;
        } else {
            const field_u8: Array<number> | Error = this.getValue<Array<number>>(storage, 45, Protocol.Primitives.ArrayU8.decode);
            if (field_u8 instanceof Error) {
                return field_u8;
            } else {
                this.field_u8 = field_u8;
            }
        }
        const field_u16Buf: ArrayBufferLike | undefined = storage.get(46);
        if (field_u16Buf === undefined) {
            return new Error(`Fail to get property field_u16`);
        }
        if (field_u16Buf.byteLength === 0) {
            this.field_u16 = undefined;
        } else {
            const field_u16: Array<number> | Error = this.getValue<Array<number>>(storage, 46, Protocol.Primitives.ArrayU16.decode);
            if (field_u16 instanceof Error) {
                return field_u16;
            } else {
                this.field_u16 = field_u16;
            }
        }
        const field_u32Buf: ArrayBufferLike | undefined = storage.get(47);
        if (field_u32Buf === undefined) {
            return new Error(`Fail to get property field_u32`);
        }
        if (field_u32Buf.byteLength === 0) {
            this.field_u32 = undefined;
        } else {
            const field_u32: Array<number> | Error = this.getValue<Array<number>>(storage, 47, Protocol.Primitives.ArrayU32.decode);
            if (field_u32 instanceof Error) {
                return field_u32;
            } else {
                this.field_u32 = field_u32;
            }
        }
        const field_u64Buf: ArrayBufferLike | undefined = storage.get(48);
        if (field_u64Buf === undefined) {
            return new Error(`Fail to get property field_u64`);
        }
        if (field_u64Buf.byteLength === 0) {
            this.field_u64 = undefined;
        } else {
            const field_u64: Array<bigint> | Error = this.getValue<Array<bigint>>(storage, 48, Protocol.Primitives.ArrayU64.decode);
            if (field_u64 instanceof Error) {
                return field_u64;
            } else {
                this.field_u64 = field_u64;
            }
        }
        const field_i8Buf: ArrayBufferLike | undefined = storage.get(49);
        if (field_i8Buf === undefined) {
            return new Error(`Fail to get property field_i8`);
        }
        if (field_i8Buf.byteLength === 0) {
            this.field_i8 = undefined;
        } else {
            const field_i8: Array<number> | Error = this.getValue<Array<number>>(storage, 49, Protocol.Primitives.ArrayI8.decode);
            if (field_i8 instanceof Error) {
                return field_i8;
            } else {
                this.field_i8 = field_i8;
            }
        }
        const field_i16Buf: ArrayBufferLike | undefined = storage.get(50);
        if (field_i16Buf === undefined) {
            return new Error(`Fail to get property field_i16`);
        }
        if (field_i16Buf.byteLength === 0) {
            this.field_i16 = undefined;
        } else {
            const field_i16: Array<number> | Error = this.getValue<Array<number>>(storage, 50, Protocol.Primitives.ArrayI16.decode);
            if (field_i16 instanceof Error) {
                return field_i16;
            } else {
                this.field_i16 = field_i16;
            }
        }
        const field_i32Buf: ArrayBufferLike | undefined = storage.get(51);
        if (field_i32Buf === undefined) {
            return new Error(`Fail to get property field_i32`);
        }
        if (field_i32Buf.byteLength === 0) {
            this.field_i32 = undefined;
        } else {
            const field_i32: Array<number> | Error = this.getValue<Array<number>>(storage, 51, Protocol.Primitives.ArrayI32.decode);
            if (field_i32 instanceof Error) {
                return field_i32;
            } else {
                this.field_i32 = field_i32;
            }
        }
        const field_i64Buf: ArrayBufferLike | undefined = storage.get(52);
        if (field_i64Buf === undefined) {
            return new Error(`Fail to get property field_i64`);
        }
        if (field_i64Buf.byteLength === 0) {
            this.field_i64 = undefined;
        } else {
            const field_i64: Array<bigint> | Error = this.getValue<Array<bigint>>(storage, 52, Protocol.Primitives.ArrayI64.decode);
            if (field_i64 instanceof Error) {
                return field_i64;
            } else {
                this.field_i64 = field_i64;
            }
        }
        const field_f32Buf: ArrayBufferLike | undefined = storage.get(53);
        if (field_f32Buf === undefined) {
            return new Error(`Fail to get property field_f32`);
        }
        if (field_f32Buf.byteLength === 0) {
            this.field_f32 = undefined;
        } else {
            const field_f32: Array<number> | Error = this.getValue<Array<number>>(storage, 53, Protocol.Primitives.ArrayF32.decode);
            if (field_f32 instanceof Error) {
                return field_f32;
            } else {
                this.field_f32 = field_f32;
            }
        }
        const field_f64Buf: ArrayBufferLike | undefined = storage.get(54);
        if (field_f64Buf === undefined) {
            return new Error(`Fail to get property field_f64`);
        }
        if (field_f64Buf.byteLength === 0) {
            this.field_f64 = undefined;
        } else {
            const field_f64: Array<number> | Error = this.getValue<Array<number>>(storage, 54, Protocol.Primitives.ArrayF64.decode);
            if (field_f64 instanceof Error) {
                return field_f64;
            } else {
                this.field_f64 = field_f64;
            }
        }
        const field_boolBuf: ArrayBufferLike | undefined = storage.get(55);
        if (field_boolBuf === undefined) {
            return new Error(`Fail to get property field_bool`);
        }
        if (field_boolBuf.byteLength === 0) {
            this.field_bool = undefined;
        } else {
            const field_bool: Array<boolean> | Error = this.getValue<Array<boolean>>(storage, 55, Protocol.Primitives.ArrayBool.decode);
            if (field_bool instanceof Error) {
                return field_bool;
            } else {
                this.field_bool = field_bool;
            }
        }
    }

    public defaults(): StructExampleD {
        return StructExampleD.defaults();
    }
}

export interface IStructExampleE {
    field_a: EnumExampleA;
    field_b: EnumExampleB;
    field_c: EnumExampleC;
}
export class StructExampleE extends Protocol.Convertor implements IStructExampleE {

    public static scheme: Protocol.IPropScheme[] = [
        { prop: 'field_a', optional: false, options: [
            { prop: 'Option_a', types: Protocol.Primitives.StrUTF8, optional: false, },
            { prop: 'Option_b', types: Protocol.Primitives.StrUTF8, optional: false, },
        ] },
        { prop: 'field_b', optional: false, options: [
            { prop: 'Option_str', types: Protocol.Primitives.StrUTF8, optional: false, },
            { prop: 'Option_u8', types: Protocol.Primitives.u8, optional: false, },
            { prop: 'Option_u16', types: Protocol.Primitives.u16, optional: false, },
            { prop: 'Option_u32', types: Protocol.Primitives.u32, optional: false, },
            { prop: 'Option_u64', types: Protocol.Primitives.u64, optional: false, },
            { prop: 'Option_i8', types: Protocol.Primitives.i8, optional: false, },
            { prop: 'Option_i16', types: Protocol.Primitives.i16, optional: false, },
            { prop: 'Option_i32', types: Protocol.Primitives.i32, optional: false, },
            { prop: 'Option_i64', types: Protocol.Primitives.i64, optional: false, },
            { prop: 'Option_f32', types: Protocol.Primitives.f32, optional: false, },
            { prop: 'Option_f64', types: Protocol.Primitives.f64, optional: false, },
        ] },
        { prop: 'field_c', optional: false, options: [
            { prop: 'Option_str', types: Protocol.Primitives.ArrayStrUTF8, optional: false, },
            { prop: 'Option_u8', types: Protocol.Primitives.ArrayU8, optional: false, },
            { prop: 'Option_u16', types: Protocol.Primitives.ArrayU16, optional: false, },
            { prop: 'Option_u32', types: Protocol.Primitives.ArrayU32, optional: false, },
            { prop: 'Option_u64', types: Protocol.Primitives.ArrayU64, optional: false, },
            { prop: 'Option_i8', types: Protocol.Primitives.ArrayI8, optional: false, },
            { prop: 'Option_i16', types: Protocol.Primitives.ArrayI16, optional: false, },
            { prop: 'Option_i32', types: Protocol.Primitives.ArrayI32, optional: false, },
            { prop: 'Option_i64', types: Protocol.Primitives.ArrayI64, optional: false, },
            { prop: 'Option_f32', types: Protocol.Primitives.ArrayF32, optional: false, },
            { prop: 'Option_f64', types: Protocol.Primitives.ArrayF64, optional: false, },
        ] },
    ];

    public static defaults(): StructExampleE {
        return new StructExampleE({
            field_a: {},
            field_b: {},
            field_c: {},
        });
    }

    public static getValidator(array: boolean): { validate(value: any): Error | undefined } {
        if (array) {
            return { validate(obj: any): Error | undefined {
                if (!(obj instanceof Array)) {
                    return new Error(`Expecting Array<StructExampleE>`);
                }
                try {
                    obj.forEach((o, index: number) => {
                        if (!(o instanceof StructExampleE)) {
                            throw new Error(`Expecting instance of StructExampleE on index #${index}`);
                        }
                    });
                } catch (e) {
                    return e;
                }
            }};
        } else {
            return { validate(obj: any): Error | undefined {
                return obj instanceof StructExampleE ? undefined : new Error(`Expecting instance of StructExampleE`);
            }};
        }
    }

    public field_a: EnumExampleA;
    public field_b: EnumExampleB;
    public field_c: EnumExampleC;
    private _field_a: Primitives.Enum;
    private _field_b: Primitives.Enum;
    private _field_c: Primitives.Enum;

    constructor(params: IStructExampleE)  {
        super();
        Object.keys(params).forEach((key: string) => {
            this[key] = params[key];
        });
        this._field_a = new Primitives.Enum([
            Protocol.Primitives.StrUTF8.getSignature(),
            Protocol.Primitives.StrUTF8.getSignature(),
        ], (id: number): ISigned<any> | undefined => {
            switch (id) {
                case 0: return new Protocol.Primitives.StrUTF8('');
                case 1: return new Protocol.Primitives.StrUTF8('');
            }
        });
        if (Object.keys(this.field_a).length > 1) {
            throw new Error(`Option cannot have more then 1 value. Property "field_a" or class "StructExampleE"`);
        }
        if (this.field_a.Option_a !== undefined) {
            const err: Error | undefined = this._field_a.set(new Protocol.Primitives.Option<string>(0, new Protocol.Primitives.StrUTF8(this.field_a.Option_a)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_a.Option_b !== undefined) {
            const err: Error | undefined = this._field_a.set(new Protocol.Primitives.Option<string>(1, new Protocol.Primitives.StrUTF8(this.field_a.Option_b)));
            if (err instanceof Error) {
                throw err;
            }
        }
        this._field_b = new Primitives.Enum([
            Protocol.Primitives.StrUTF8.getSignature(),
            Protocol.Primitives.u8.getSignature(),
            Protocol.Primitives.u16.getSignature(),
            Protocol.Primitives.u32.getSignature(),
            Protocol.Primitives.u64.getSignature(),
            Protocol.Primitives.i8.getSignature(),
            Protocol.Primitives.i16.getSignature(),
            Protocol.Primitives.i32.getSignature(),
            Protocol.Primitives.i64.getSignature(),
            Protocol.Primitives.f32.getSignature(),
            Protocol.Primitives.f64.getSignature(),
        ], (id: number): ISigned<any> | undefined => {
            switch (id) {
                case 0: return new Protocol.Primitives.StrUTF8('');
                case 1: return new Protocol.Primitives.u8(0);
                case 2: return new Protocol.Primitives.u16(0);
                case 3: return new Protocol.Primitives.u32(0);
                case 4: return new Protocol.Primitives.u64(BigInt(0));
                case 5: return new Protocol.Primitives.i8(0);
                case 6: return new Protocol.Primitives.i16(0);
                case 7: return new Protocol.Primitives.i32(0);
                case 8: return new Protocol.Primitives.i64(BigInt(0));
                case 9: return new Protocol.Primitives.f32(0);
                case 10: return new Protocol.Primitives.f64(0);
            }
        });
        if (Object.keys(this.field_b).length > 1) {
            throw new Error(`Option cannot have more then 1 value. Property "field_b" or class "StructExampleE"`);
        }
        if (this.field_b.Option_str !== undefined) {
            const err: Error | undefined = this._field_b.set(new Protocol.Primitives.Option<string>(0, new Protocol.Primitives.StrUTF8(this.field_b.Option_str)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_b.Option_u8 !== undefined) {
            const err: Error | undefined = this._field_b.set(new Protocol.Primitives.Option<number>(1, new Protocol.Primitives.u8(this.field_b.Option_u8)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_b.Option_u16 !== undefined) {
            const err: Error | undefined = this._field_b.set(new Protocol.Primitives.Option<number>(2, new Protocol.Primitives.u16(this.field_b.Option_u16)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_b.Option_u32 !== undefined) {
            const err: Error | undefined = this._field_b.set(new Protocol.Primitives.Option<number>(3, new Protocol.Primitives.u32(this.field_b.Option_u32)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_b.Option_u64 !== undefined) {
            const err: Error | undefined = this._field_b.set(new Protocol.Primitives.Option<bigint>(4, new Protocol.Primitives.u64(this.field_b.Option_u64)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_b.Option_i8 !== undefined) {
            const err: Error | undefined = this._field_b.set(new Protocol.Primitives.Option<number>(5, new Protocol.Primitives.i8(this.field_b.Option_i8)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_b.Option_i16 !== undefined) {
            const err: Error | undefined = this._field_b.set(new Protocol.Primitives.Option<number>(6, new Protocol.Primitives.i16(this.field_b.Option_i16)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_b.Option_i32 !== undefined) {
            const err: Error | undefined = this._field_b.set(new Protocol.Primitives.Option<number>(7, new Protocol.Primitives.i32(this.field_b.Option_i32)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_b.Option_i64 !== undefined) {
            const err: Error | undefined = this._field_b.set(new Protocol.Primitives.Option<bigint>(8, new Protocol.Primitives.i64(this.field_b.Option_i64)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_b.Option_f32 !== undefined) {
            const err: Error | undefined = this._field_b.set(new Protocol.Primitives.Option<number>(9, new Protocol.Primitives.f32(this.field_b.Option_f32)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_b.Option_f64 !== undefined) {
            const err: Error | undefined = this._field_b.set(new Protocol.Primitives.Option<number>(10, new Protocol.Primitives.f64(this.field_b.Option_f64)));
            if (err instanceof Error) {
                throw err;
            }
        }
        this._field_c = new Primitives.Enum([
            Protocol.Primitives.ArrayStrUTF8.getSignature(),
            Protocol.Primitives.ArrayU8.getSignature(),
            Protocol.Primitives.ArrayU16.getSignature(),
            Protocol.Primitives.ArrayU32.getSignature(),
            Protocol.Primitives.ArrayU64.getSignature(),
            Protocol.Primitives.ArrayI8.getSignature(),
            Protocol.Primitives.ArrayI16.getSignature(),
            Protocol.Primitives.ArrayI32.getSignature(),
            Protocol.Primitives.ArrayI64.getSignature(),
            Protocol.Primitives.ArrayF32.getSignature(),
            Protocol.Primitives.ArrayF64.getSignature(),
        ], (id: number): ISigned<any> | undefined => {
            switch (id) {
                case 0: return new Protocol.Primitives.ArrayStrUTF8(['']);
                case 1: return new Protocol.Primitives.ArrayU8([0]);
                case 2: return new Protocol.Primitives.ArrayU16([0]);
                case 3: return new Protocol.Primitives.ArrayU32([0]);
                case 4: return new Protocol.Primitives.ArrayU64([BigInt(0)]);
                case 5: return new Protocol.Primitives.ArrayI8([0]);
                case 6: return new Protocol.Primitives.ArrayI16([0]);
                case 7: return new Protocol.Primitives.ArrayI32([0]);
                case 8: return new Protocol.Primitives.ArrayI64([BigInt(0)]);
                case 9: return new Protocol.Primitives.ArrayF32([0]);
                case 10: return new Protocol.Primitives.ArrayF64([0]);
            }
        });
        if (Object.keys(this.field_c).length > 1) {
            throw new Error(`Option cannot have more then 1 value. Property "field_c" or class "StructExampleE"`);
        }
        if (this.field_c.Option_str !== undefined) {
            const err: Error | undefined = this._field_c.set(new Protocol.Primitives.Option<Array<string>>(0, new Protocol.Primitives.ArrayStrUTF8(this.field_c.Option_str)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_c.Option_u8 !== undefined) {
            const err: Error | undefined = this._field_c.set(new Protocol.Primitives.Option<Array<number>>(1, new Protocol.Primitives.ArrayU8(this.field_c.Option_u8)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_c.Option_u16 !== undefined) {
            const err: Error | undefined = this._field_c.set(new Protocol.Primitives.Option<Array<number>>(2, new Protocol.Primitives.ArrayU16(this.field_c.Option_u16)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_c.Option_u32 !== undefined) {
            const err: Error | undefined = this._field_c.set(new Protocol.Primitives.Option<Array<number>>(3, new Protocol.Primitives.ArrayU32(this.field_c.Option_u32)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_c.Option_u64 !== undefined) {
            const err: Error | undefined = this._field_c.set(new Protocol.Primitives.Option<Array<bigint>>(4, new Protocol.Primitives.ArrayU64(this.field_c.Option_u64)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_c.Option_i8 !== undefined) {
            const err: Error | undefined = this._field_c.set(new Protocol.Primitives.Option<Array<number>>(5, new Protocol.Primitives.ArrayI8(this.field_c.Option_i8)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_c.Option_i16 !== undefined) {
            const err: Error | undefined = this._field_c.set(new Protocol.Primitives.Option<Array<number>>(6, new Protocol.Primitives.ArrayI16(this.field_c.Option_i16)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_c.Option_i32 !== undefined) {
            const err: Error | undefined = this._field_c.set(new Protocol.Primitives.Option<Array<number>>(7, new Protocol.Primitives.ArrayI32(this.field_c.Option_i32)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_c.Option_i64 !== undefined) {
            const err: Error | undefined = this._field_c.set(new Protocol.Primitives.Option<Array<bigint>>(8, new Protocol.Primitives.ArrayI64(this.field_c.Option_i64)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_c.Option_f32 !== undefined) {
            const err: Error | undefined = this._field_c.set(new Protocol.Primitives.Option<Array<number>>(9, new Protocol.Primitives.ArrayF32(this.field_c.Option_f32)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_c.Option_f64 !== undefined) {
            const err: Error | undefined = this._field_c.set(new Protocol.Primitives.Option<Array<number>>(10, new Protocol.Primitives.ArrayF64(this.field_c.Option_f64)));
            if (err instanceof Error) {
                throw err;
            }
        }
    }

    public getSignature(): string {
        return 'StructExampleE';
    }

    public getId(): number {
        return 56;
    }

    public encode(): ArrayBufferLike {
        return this.collect([
            () => { const buffer = this._field_a.encode(); return this.getBuffer(57, Protocol.ESize.u64, BigInt(buffer.byteLength), buffer); },
            () => { const buffer = this._field_b.encode(); return this.getBuffer(58, Protocol.ESize.u64, BigInt(buffer.byteLength), buffer); },
            () => { const buffer = this._field_c.encode(); return this.getBuffer(59, Protocol.ESize.u64, BigInt(buffer.byteLength), buffer); },
        ]);
    }

    public decode(buffer: ArrayBufferLike): Error | undefined {
        const storage = this.getStorage(buffer);
        if (storage instanceof Error) {
            return storage;
        }
        this.field_a = {};
        const field_aBuf: ArrayBufferLike = storage.get(57);
        if (field_aBuf === undefined) {
            return new Error(`Fail to get property "field_a"`);
        }
        if (field_aBuf.byteLength > 0) {
            const field_aErr: Error | undefined = this._field_a.decode(field_aBuf);
            if (field_aErr instanceof Error) {
                return field_aErr;
            } else {
                switch (this._field_a.getValueIndex()) {
                    case 0: this.field_a.Option_a = this._field_a.get<string>(); break;
                    case 1: this.field_a.Option_b = this._field_a.get<string>(); break;
                }
            }
        }
        this.field_b = {};
        const field_bBuf: ArrayBufferLike = storage.get(58);
        if (field_bBuf === undefined) {
            return new Error(`Fail to get property "field_b"`);
        }
        if (field_bBuf.byteLength > 0) {
            const field_bErr: Error | undefined = this._field_b.decode(field_bBuf);
            if (field_bErr instanceof Error) {
                return field_bErr;
            } else {
                switch (this._field_b.getValueIndex()) {
                    case 0: this.field_b.Option_str = this._field_b.get<string>(); break;
                    case 1: this.field_b.Option_u8 = this._field_b.get<number>(); break;
                    case 2: this.field_b.Option_u16 = this._field_b.get<number>(); break;
                    case 3: this.field_b.Option_u32 = this._field_b.get<number>(); break;
                    case 4: this.field_b.Option_u64 = this._field_b.get<bigint>(); break;
                    case 5: this.field_b.Option_i8 = this._field_b.get<number>(); break;
                    case 6: this.field_b.Option_i16 = this._field_b.get<number>(); break;
                    case 7: this.field_b.Option_i32 = this._field_b.get<number>(); break;
                    case 8: this.field_b.Option_i64 = this._field_b.get<bigint>(); break;
                    case 9: this.field_b.Option_f32 = this._field_b.get<number>(); break;
                    case 10: this.field_b.Option_f64 = this._field_b.get<number>(); break;
                }
            }
        }
        this.field_c = {};
        const field_cBuf: ArrayBufferLike = storage.get(59);
        if (field_cBuf === undefined) {
            return new Error(`Fail to get property "field_c"`);
        }
        if (field_cBuf.byteLength > 0) {
            const field_cErr: Error | undefined = this._field_c.decode(field_cBuf);
            if (field_cErr instanceof Error) {
                return field_cErr;
            } else {
                switch (this._field_c.getValueIndex()) {
                    case 0: this.field_c.Option_str = this._field_c.get<Array<string>>(); break;
                    case 1: this.field_c.Option_u8 = this._field_c.get<Array<number>>(); break;
                    case 2: this.field_c.Option_u16 = this._field_c.get<Array<number>>(); break;
                    case 3: this.field_c.Option_u32 = this._field_c.get<Array<number>>(); break;
                    case 4: this.field_c.Option_u64 = this._field_c.get<Array<bigint>>(); break;
                    case 5: this.field_c.Option_i8 = this._field_c.get<Array<number>>(); break;
                    case 6: this.field_c.Option_i16 = this._field_c.get<Array<number>>(); break;
                    case 7: this.field_c.Option_i32 = this._field_c.get<Array<number>>(); break;
                    case 8: this.field_c.Option_i64 = this._field_c.get<Array<bigint>>(); break;
                    case 9: this.field_c.Option_f32 = this._field_c.get<Array<number>>(); break;
                    case 10: this.field_c.Option_f64 = this._field_c.get<Array<number>>(); break;
                }
            }
        }
    }

    public defaults(): StructExampleE {
        return StructExampleE.defaults();
    }
}

export interface IStructExampleF {
    field_a: EnumExampleA | undefined;
    field_b: EnumExampleB | undefined;
    field_c: EnumExampleC | undefined;
}
export class StructExampleF extends Protocol.Convertor implements IStructExampleF {

    public static scheme: Protocol.IPropScheme[] = [
        { prop: 'field_a', optional: true, options: [
            { prop: 'Option_a', types: Protocol.Primitives.StrUTF8, optional: false, },
            { prop: 'Option_b', types: Protocol.Primitives.StrUTF8, optional: false, },
        ] },
        { prop: 'field_b', optional: true, options: [
            { prop: 'Option_str', types: Protocol.Primitives.StrUTF8, optional: false, },
            { prop: 'Option_u8', types: Protocol.Primitives.u8, optional: false, },
            { prop: 'Option_u16', types: Protocol.Primitives.u16, optional: false, },
            { prop: 'Option_u32', types: Protocol.Primitives.u32, optional: false, },
            { prop: 'Option_u64', types: Protocol.Primitives.u64, optional: false, },
            { prop: 'Option_i8', types: Protocol.Primitives.i8, optional: false, },
            { prop: 'Option_i16', types: Protocol.Primitives.i16, optional: false, },
            { prop: 'Option_i32', types: Protocol.Primitives.i32, optional: false, },
            { prop: 'Option_i64', types: Protocol.Primitives.i64, optional: false, },
            { prop: 'Option_f32', types: Protocol.Primitives.f32, optional: false, },
            { prop: 'Option_f64', types: Protocol.Primitives.f64, optional: false, },
        ] },
        { prop: 'field_c', optional: true, options: [
            { prop: 'Option_str', types: Protocol.Primitives.ArrayStrUTF8, optional: false, },
            { prop: 'Option_u8', types: Protocol.Primitives.ArrayU8, optional: false, },
            { prop: 'Option_u16', types: Protocol.Primitives.ArrayU16, optional: false, },
            { prop: 'Option_u32', types: Protocol.Primitives.ArrayU32, optional: false, },
            { prop: 'Option_u64', types: Protocol.Primitives.ArrayU64, optional: false, },
            { prop: 'Option_i8', types: Protocol.Primitives.ArrayI8, optional: false, },
            { prop: 'Option_i16', types: Protocol.Primitives.ArrayI16, optional: false, },
            { prop: 'Option_i32', types: Protocol.Primitives.ArrayI32, optional: false, },
            { prop: 'Option_i64', types: Protocol.Primitives.ArrayI64, optional: false, },
            { prop: 'Option_f32', types: Protocol.Primitives.ArrayF32, optional: false, },
            { prop: 'Option_f64', types: Protocol.Primitives.ArrayF64, optional: false, },
        ] },
    ];

    public static defaults(): StructExampleF {
        return new StructExampleF({
            field_a: undefined,
            field_b: undefined,
            field_c: undefined,
        });
    }

    public static getValidator(array: boolean): { validate(value: any): Error | undefined } {
        if (array) {
            return { validate(obj: any): Error | undefined {
                if (!(obj instanceof Array)) {
                    return new Error(`Expecting Array<StructExampleF>`);
                }
                try {
                    obj.forEach((o, index: number) => {
                        if (!(o instanceof StructExampleF)) {
                            throw new Error(`Expecting instance of StructExampleF on index #${index}`);
                        }
                    });
                } catch (e) {
                    return e;
                }
            }};
        } else {
            return { validate(obj: any): Error | undefined {
                return obj instanceof StructExampleF ? undefined : new Error(`Expecting instance of StructExampleF`);
            }};
        }
    }

    public field_a: EnumExampleA | undefined;
    public field_b: EnumExampleB | undefined;
    public field_c: EnumExampleC | undefined;
    private _field_a: Primitives.Enum;
    private _field_b: Primitives.Enum;
    private _field_c: Primitives.Enum;

    constructor(params: IStructExampleF)  {
        super();
        Object.keys(params).forEach((key: string) => {
            this[key] = params[key];
        });
        this._field_a = new Primitives.Enum([
            Protocol.Primitives.StrUTF8.getSignature(),
            Protocol.Primitives.StrUTF8.getSignature(),
        ], (id: number): ISigned<any> | undefined => {
            switch (id) {
                case 0: return new Protocol.Primitives.StrUTF8('');
                case 1: return new Protocol.Primitives.StrUTF8('');
            }
        });
        if (this.field_a !== undefined && Object.keys(this.field_a).length > 1) {
            throw new Error(`Option cannot have more then 1 value. Property "field_a" or class "StructExampleF"`);
        }
        if (this.field_a !== undefined && this.field_a.Option_a !== undefined) {
            const err: Error | undefined = this._field_a.set(new Protocol.Primitives.Option<string>(0, new Protocol.Primitives.StrUTF8(this.field_a.Option_a)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_a !== undefined && this.field_a.Option_b !== undefined) {
            const err: Error | undefined = this._field_a.set(new Protocol.Primitives.Option<string>(1, new Protocol.Primitives.StrUTF8(this.field_a.Option_b)));
            if (err instanceof Error) {
                throw err;
            }
        }
        this._field_b = new Primitives.Enum([
            Protocol.Primitives.StrUTF8.getSignature(),
            Protocol.Primitives.u8.getSignature(),
            Protocol.Primitives.u16.getSignature(),
            Protocol.Primitives.u32.getSignature(),
            Protocol.Primitives.u64.getSignature(),
            Protocol.Primitives.i8.getSignature(),
            Protocol.Primitives.i16.getSignature(),
            Protocol.Primitives.i32.getSignature(),
            Protocol.Primitives.i64.getSignature(),
            Protocol.Primitives.f32.getSignature(),
            Protocol.Primitives.f64.getSignature(),
        ], (id: number): ISigned<any> | undefined => {
            switch (id) {
                case 0: return new Protocol.Primitives.StrUTF8('');
                case 1: return new Protocol.Primitives.u8(0);
                case 2: return new Protocol.Primitives.u16(0);
                case 3: return new Protocol.Primitives.u32(0);
                case 4: return new Protocol.Primitives.u64(BigInt(0));
                case 5: return new Protocol.Primitives.i8(0);
                case 6: return new Protocol.Primitives.i16(0);
                case 7: return new Protocol.Primitives.i32(0);
                case 8: return new Protocol.Primitives.i64(BigInt(0));
                case 9: return new Protocol.Primitives.f32(0);
                case 10: return new Protocol.Primitives.f64(0);
            }
        });
        if (this.field_b !== undefined && Object.keys(this.field_b).length > 1) {
            throw new Error(`Option cannot have more then 1 value. Property "field_b" or class "StructExampleF"`);
        }
        if (this.field_b !== undefined && this.field_b.Option_str !== undefined) {
            const err: Error | undefined = this._field_b.set(new Protocol.Primitives.Option<string>(0, new Protocol.Primitives.StrUTF8(this.field_b.Option_str)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_b !== undefined && this.field_b.Option_u8 !== undefined) {
            const err: Error | undefined = this._field_b.set(new Protocol.Primitives.Option<number>(1, new Protocol.Primitives.u8(this.field_b.Option_u8)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_b !== undefined && this.field_b.Option_u16 !== undefined) {
            const err: Error | undefined = this._field_b.set(new Protocol.Primitives.Option<number>(2, new Protocol.Primitives.u16(this.field_b.Option_u16)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_b !== undefined && this.field_b.Option_u32 !== undefined) {
            const err: Error | undefined = this._field_b.set(new Protocol.Primitives.Option<number>(3, new Protocol.Primitives.u32(this.field_b.Option_u32)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_b !== undefined && this.field_b.Option_u64 !== undefined) {
            const err: Error | undefined = this._field_b.set(new Protocol.Primitives.Option<bigint>(4, new Protocol.Primitives.u64(this.field_b.Option_u64)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_b !== undefined && this.field_b.Option_i8 !== undefined) {
            const err: Error | undefined = this._field_b.set(new Protocol.Primitives.Option<number>(5, new Protocol.Primitives.i8(this.field_b.Option_i8)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_b !== undefined && this.field_b.Option_i16 !== undefined) {
            const err: Error | undefined = this._field_b.set(new Protocol.Primitives.Option<number>(6, new Protocol.Primitives.i16(this.field_b.Option_i16)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_b !== undefined && this.field_b.Option_i32 !== undefined) {
            const err: Error | undefined = this._field_b.set(new Protocol.Primitives.Option<number>(7, new Protocol.Primitives.i32(this.field_b.Option_i32)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_b !== undefined && this.field_b.Option_i64 !== undefined) {
            const err: Error | undefined = this._field_b.set(new Protocol.Primitives.Option<bigint>(8, new Protocol.Primitives.i64(this.field_b.Option_i64)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_b !== undefined && this.field_b.Option_f32 !== undefined) {
            const err: Error | undefined = this._field_b.set(new Protocol.Primitives.Option<number>(9, new Protocol.Primitives.f32(this.field_b.Option_f32)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_b !== undefined && this.field_b.Option_f64 !== undefined) {
            const err: Error | undefined = this._field_b.set(new Protocol.Primitives.Option<number>(10, new Protocol.Primitives.f64(this.field_b.Option_f64)));
            if (err instanceof Error) {
                throw err;
            }
        }
        this._field_c = new Primitives.Enum([
            Protocol.Primitives.ArrayStrUTF8.getSignature(),
            Protocol.Primitives.ArrayU8.getSignature(),
            Protocol.Primitives.ArrayU16.getSignature(),
            Protocol.Primitives.ArrayU32.getSignature(),
            Protocol.Primitives.ArrayU64.getSignature(),
            Protocol.Primitives.ArrayI8.getSignature(),
            Protocol.Primitives.ArrayI16.getSignature(),
            Protocol.Primitives.ArrayI32.getSignature(),
            Protocol.Primitives.ArrayI64.getSignature(),
            Protocol.Primitives.ArrayF32.getSignature(),
            Protocol.Primitives.ArrayF64.getSignature(),
        ], (id: number): ISigned<any> | undefined => {
            switch (id) {
                case 0: return new Protocol.Primitives.ArrayStrUTF8(['']);
                case 1: return new Protocol.Primitives.ArrayU8([0]);
                case 2: return new Protocol.Primitives.ArrayU16([0]);
                case 3: return new Protocol.Primitives.ArrayU32([0]);
                case 4: return new Protocol.Primitives.ArrayU64([BigInt(0)]);
                case 5: return new Protocol.Primitives.ArrayI8([0]);
                case 6: return new Protocol.Primitives.ArrayI16([0]);
                case 7: return new Protocol.Primitives.ArrayI32([0]);
                case 8: return new Protocol.Primitives.ArrayI64([BigInt(0)]);
                case 9: return new Protocol.Primitives.ArrayF32([0]);
                case 10: return new Protocol.Primitives.ArrayF64([0]);
            }
        });
        if (this.field_c !== undefined && Object.keys(this.field_c).length > 1) {
            throw new Error(`Option cannot have more then 1 value. Property "field_c" or class "StructExampleF"`);
        }
        if (this.field_c !== undefined && this.field_c.Option_str !== undefined) {
            const err: Error | undefined = this._field_c.set(new Protocol.Primitives.Option<Array<string>>(0, new Protocol.Primitives.ArrayStrUTF8(this.field_c.Option_str)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_c !== undefined && this.field_c.Option_u8 !== undefined) {
            const err: Error | undefined = this._field_c.set(new Protocol.Primitives.Option<Array<number>>(1, new Protocol.Primitives.ArrayU8(this.field_c.Option_u8)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_c !== undefined && this.field_c.Option_u16 !== undefined) {
            const err: Error | undefined = this._field_c.set(new Protocol.Primitives.Option<Array<number>>(2, new Protocol.Primitives.ArrayU16(this.field_c.Option_u16)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_c !== undefined && this.field_c.Option_u32 !== undefined) {
            const err: Error | undefined = this._field_c.set(new Protocol.Primitives.Option<Array<number>>(3, new Protocol.Primitives.ArrayU32(this.field_c.Option_u32)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_c !== undefined && this.field_c.Option_u64 !== undefined) {
            const err: Error | undefined = this._field_c.set(new Protocol.Primitives.Option<Array<bigint>>(4, new Protocol.Primitives.ArrayU64(this.field_c.Option_u64)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_c !== undefined && this.field_c.Option_i8 !== undefined) {
            const err: Error | undefined = this._field_c.set(new Protocol.Primitives.Option<Array<number>>(5, new Protocol.Primitives.ArrayI8(this.field_c.Option_i8)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_c !== undefined && this.field_c.Option_i16 !== undefined) {
            const err: Error | undefined = this._field_c.set(new Protocol.Primitives.Option<Array<number>>(6, new Protocol.Primitives.ArrayI16(this.field_c.Option_i16)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_c !== undefined && this.field_c.Option_i32 !== undefined) {
            const err: Error | undefined = this._field_c.set(new Protocol.Primitives.Option<Array<number>>(7, new Protocol.Primitives.ArrayI32(this.field_c.Option_i32)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_c !== undefined && this.field_c.Option_i64 !== undefined) {
            const err: Error | undefined = this._field_c.set(new Protocol.Primitives.Option<Array<bigint>>(8, new Protocol.Primitives.ArrayI64(this.field_c.Option_i64)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_c !== undefined && this.field_c.Option_f32 !== undefined) {
            const err: Error | undefined = this._field_c.set(new Protocol.Primitives.Option<Array<number>>(9, new Protocol.Primitives.ArrayF32(this.field_c.Option_f32)));
            if (err instanceof Error) {
                throw err;
            }
        }
        if (this.field_c !== undefined && this.field_c.Option_f64 !== undefined) {
            const err: Error | undefined = this._field_c.set(new Protocol.Primitives.Option<Array<number>>(10, new Protocol.Primitives.ArrayF64(this.field_c.Option_f64)));
            if (err instanceof Error) {
                throw err;
            }
        }
    }

    public getSignature(): string {
        return 'StructExampleF';
    }

    public getId(): number {
        return 60;
    }

    public encode(): ArrayBufferLike {
        return this.collect([
            () => {if (this.field_a === undefined) { return this.getBuffer(61, Protocol.ESize.u8, 0, new Uint8Array()); } const buffer = this._field_a.encode(); return this.getBuffer(61, Protocol.ESize.u64, BigInt(buffer.byteLength), buffer); },
            () => {if (this.field_b === undefined) { return this.getBuffer(62, Protocol.ESize.u8, 0, new Uint8Array()); } const buffer = this._field_b.encode(); return this.getBuffer(62, Protocol.ESize.u64, BigInt(buffer.byteLength), buffer); },
            () => {if (this.field_c === undefined) { return this.getBuffer(63, Protocol.ESize.u8, 0, new Uint8Array()); } const buffer = this._field_c.encode(); return this.getBuffer(63, Protocol.ESize.u64, BigInt(buffer.byteLength), buffer); },
        ]);
    }

    public decode(buffer: ArrayBufferLike): Error | undefined {
        const storage = this.getStorage(buffer);
        if (storage instanceof Error) {
            return storage;
        }
        const field_aBuf: ArrayBufferLike | undefined = storage.get(61);
        if (field_aBuf === undefined) {
            return new Error(`Fail to get property field_a`);
        }
        if (field_aBuf.byteLength === 0) {
            this.field_a = undefined;
        } else {
            this.field_a = {};
            const field_aBuf: ArrayBufferLike = storage.get(61);
            if (field_aBuf === undefined) {
                return new Error(`Fail to get property "field_a"`);
            }
            if (field_aBuf.byteLength > 0) {
                const field_aErr: Error | undefined = this._field_a.decode(field_aBuf);
                if (field_aErr instanceof Error) {
                    return field_aErr;
                } else {
                    switch (this._field_a.getValueIndex()) {
                        case 0: this.field_a.Option_a = this._field_a.get<string>(); break;
                        case 1: this.field_a.Option_b = this._field_a.get<string>(); break;
                    }
                }
            }
        }
        const field_bBuf: ArrayBufferLike | undefined = storage.get(62);
        if (field_bBuf === undefined) {
            return new Error(`Fail to get property field_b`);
        }
        if (field_bBuf.byteLength === 0) {
            this.field_b = undefined;
        } else {
            this.field_b = {};
            const field_bBuf: ArrayBufferLike = storage.get(62);
            if (field_bBuf === undefined) {
                return new Error(`Fail to get property "field_b"`);
            }
            if (field_bBuf.byteLength > 0) {
                const field_bErr: Error | undefined = this._field_b.decode(field_bBuf);
                if (field_bErr instanceof Error) {
                    return field_bErr;
                } else {
                    switch (this._field_b.getValueIndex()) {
                        case 0: this.field_b.Option_str = this._field_b.get<string>(); break;
                        case 1: this.field_b.Option_u8 = this._field_b.get<number>(); break;
                        case 2: this.field_b.Option_u16 = this._field_b.get<number>(); break;
                        case 3: this.field_b.Option_u32 = this._field_b.get<number>(); break;
                        case 4: this.field_b.Option_u64 = this._field_b.get<bigint>(); break;
                        case 5: this.field_b.Option_i8 = this._field_b.get<number>(); break;
                        case 6: this.field_b.Option_i16 = this._field_b.get<number>(); break;
                        case 7: this.field_b.Option_i32 = this._field_b.get<number>(); break;
                        case 8: this.field_b.Option_i64 = this._field_b.get<bigint>(); break;
                        case 9: this.field_b.Option_f32 = this._field_b.get<number>(); break;
                        case 10: this.field_b.Option_f64 = this._field_b.get<number>(); break;
                    }
                }
            }
        }
        const field_cBuf: ArrayBufferLike | undefined = storage.get(63);
        if (field_cBuf === undefined) {
            return new Error(`Fail to get property field_c`);
        }
        if (field_cBuf.byteLength === 0) {
            this.field_c = undefined;
        } else {
            this.field_c = {};
            const field_cBuf: ArrayBufferLike = storage.get(63);
            if (field_cBuf === undefined) {
                return new Error(`Fail to get property "field_c"`);
            }
            if (field_cBuf.byteLength > 0) {
                const field_cErr: Error | undefined = this._field_c.decode(field_cBuf);
                if (field_cErr instanceof Error) {
                    return field_cErr;
                } else {
                    switch (this._field_c.getValueIndex()) {
                        case 0: this.field_c.Option_str = this._field_c.get<Array<string>>(); break;
                        case 1: this.field_c.Option_u8 = this._field_c.get<Array<number>>(); break;
                        case 2: this.field_c.Option_u16 = this._field_c.get<Array<number>>(); break;
                        case 3: this.field_c.Option_u32 = this._field_c.get<Array<number>>(); break;
                        case 4: this.field_c.Option_u64 = this._field_c.get<Array<bigint>>(); break;
                        case 5: this.field_c.Option_i8 = this._field_c.get<Array<number>>(); break;
                        case 6: this.field_c.Option_i16 = this._field_c.get<Array<number>>(); break;
                        case 7: this.field_c.Option_i32 = this._field_c.get<Array<number>>(); break;
                        case 8: this.field_c.Option_i64 = this._field_c.get<Array<bigint>>(); break;
                        case 9: this.field_c.Option_f32 = this._field_c.get<Array<number>>(); break;
                        case 10: this.field_c.Option_f64 = this._field_c.get<Array<number>>(); break;
                    }
                }
            }
        }
    }

    public defaults(): StructExampleF {
        return StructExampleF.defaults();
    }
}

export interface IStructExampleG {
    field_a: StructExampleA;
    field_b: StructExampleB;
}
export class StructExampleG extends Protocol.Convertor implements IStructExampleG {

    public static scheme: Protocol.IPropScheme[] = [
        { prop: 'field_a', types: StructExampleA.getValidator(false), optional: false },
        { prop: 'field_b', types: StructExampleB.getValidator(false), optional: false },
    ];

    public static defaults(): StructExampleG {
        return new StructExampleG({
            field_a: new StructExampleA({
                field_str: '',
                field_u8: 0,
                field_u16: 0,
                field_u32: 0,
                field_u64: BigInt(0),
                field_i8: 0,
                field_i16: 0,
                field_i32: 0,
                field_i64: BigInt(0),
                field_f32: 0,
                field_f64: 0,
                field_bool: true,
            }),
            field_b: new StructExampleB({
                field_str: [],
                field_u8: [],
                field_u16: [],
                field_u32: [],
                field_u64: [],
                field_i8: [],
                field_i16: [],
                field_i32: [],
                field_i64: [],
                field_f32: [],
                field_f64: [],
                field_bool: [],
            }),
        });
    }

    public static getValidator(array: boolean): { validate(value: any): Error | undefined } {
        if (array) {
            return { validate(obj: any): Error | undefined {
                if (!(obj instanceof Array)) {
                    return new Error(`Expecting Array<StructExampleG>`);
                }
                try {
                    obj.forEach((o, index: number) => {
                        if (!(o instanceof StructExampleG)) {
                            throw new Error(`Expecting instance of StructExampleG on index #${index}`);
                        }
                    });
                } catch (e) {
                    return e;
                }
            }};
        } else {
            return { validate(obj: any): Error | undefined {
                return obj instanceof StructExampleG ? undefined : new Error(`Expecting instance of StructExampleG`);
            }};
        }
    }

    public field_a: StructExampleA;
    public field_b: StructExampleB;

    constructor(params: IStructExampleG)  {
        super();
        Object.keys(params).forEach((key: string) => {
            this[key] = params[key];
        });
    }

    public getSignature(): string {
        return 'StructExampleG';
    }

    public getId(): number {
        return 64;
    }

    public encode(): ArrayBufferLike {
        return this.collect([
            () => { const buffer = this.field_a.encode(); return this.getBuffer(65, Protocol.ESize.u64, BigInt(buffer.byteLength), buffer); },
            () => { const buffer = this.field_b.encode(); return this.getBuffer(66, Protocol.ESize.u64, BigInt(buffer.byteLength), buffer); },
        ]);
    }

    public decode(buffer: ArrayBufferLike): Error | undefined {
        const storage = this.getStorage(buffer);
        if (storage instanceof Error) {
            return storage;
        }
        const field_a: StructExampleA = new StructExampleA({
            field_str: '',
            field_u8: 0,
            field_u16: 0,
            field_u32: 0,
            field_u64: BigInt(0),
            field_i8: 0,
            field_i16: 0,
            field_i32: 0,
            field_i64: BigInt(0),
            field_f32: 0,
            field_f64: 0,
            field_bool: true,
        });
        const field_aBuf: ArrayBufferLike = storage.get(65);
        if (field_aBuf instanceof Error) {
            return field_aBuf;
        }
        const field_aErr: Error | undefined = field_a.decode(field_aBuf);
        if (field_aErr instanceof Error) {
            return field_aErr;
        } else {
            this.field_a = field_a;
        }
        const field_b: StructExampleB = new StructExampleB({
            field_str: [],
            field_u8: [],
            field_u16: [],
            field_u32: [],
            field_u64: [],
            field_i8: [],
            field_i16: [],
            field_i32: [],
            field_i64: [],
            field_f32: [],
            field_f64: [],
            field_bool: [],
        });
        const field_bBuf: ArrayBufferLike = storage.get(66);
        if (field_bBuf instanceof Error) {
            return field_bBuf;
        }
        const field_bErr: Error | undefined = field_b.decode(field_bBuf);
        if (field_bErr instanceof Error) {
            return field_bErr;
        } else {
            this.field_b = field_b;
        }
    }

    public defaults(): StructExampleG {
        return StructExampleG.defaults();
    }
}

export interface IStructExampleJ {
    field_a: StructExampleA | undefined;
    field_b: StructExampleB | undefined;
}
export class StructExampleJ extends Protocol.Convertor implements IStructExampleJ {

    public static scheme: Protocol.IPropScheme[] = [
        { prop: 'field_a', types: StructExampleA.getValidator(false), optional: true },
        { prop: 'field_b', types: StructExampleB.getValidator(false), optional: true },
    ];

    public static defaults(): StructExampleJ {
        return new StructExampleJ({
            field_a: undefined,
            field_b: undefined,
        });
    }

    public static getValidator(array: boolean): { validate(value: any): Error | undefined } {
        if (array) {
            return { validate(obj: any): Error | undefined {
                if (!(obj instanceof Array)) {
                    return new Error(`Expecting Array<StructExampleJ>`);
                }
                try {
                    obj.forEach((o, index: number) => {
                        if (!(o instanceof StructExampleJ)) {
                            throw new Error(`Expecting instance of StructExampleJ on index #${index}`);
                        }
                    });
                } catch (e) {
                    return e;
                }
            }};
        } else {
            return { validate(obj: any): Error | undefined {
                return obj instanceof StructExampleJ ? undefined : new Error(`Expecting instance of StructExampleJ`);
            }};
        }
    }

    public field_a: StructExampleA | undefined;
    public field_b: StructExampleB | undefined;

    constructor(params: IStructExampleJ)  {
        super();
        Object.keys(params).forEach((key: string) => {
            this[key] = params[key];
        });
    }

    public getSignature(): string {
        return 'StructExampleJ';
    }

    public getId(): number {
        return 67;
    }

    public encode(): ArrayBufferLike {
        return this.collect([
            () => {if (this.field_a === undefined) { return this.getBuffer(68, Protocol.ESize.u8, 0, new Uint8Array()); } const buffer = this.field_a.encode(); return this.getBuffer(68, Protocol.ESize.u64, BigInt(buffer.byteLength), buffer); },
            () => {if (this.field_b === undefined) { return this.getBuffer(69, Protocol.ESize.u8, 0, new Uint8Array()); } const buffer = this.field_b.encode(); return this.getBuffer(69, Protocol.ESize.u64, BigInt(buffer.byteLength), buffer); },
        ]);
    }

    public decode(buffer: ArrayBufferLike): Error | undefined {
        const storage = this.getStorage(buffer);
        if (storage instanceof Error) {
            return storage;
        }
        const field_aBuf: ArrayBufferLike | undefined = storage.get(68);
        if (field_aBuf === undefined) {
            return new Error(`Fail to get property field_a`);
        }
        if (field_aBuf.byteLength === 0) {
            this.field_a = undefined;
        } else {
            const field_a: StructExampleA = new StructExampleA({
                field_str: '',
                field_u8: 0,
                field_u16: 0,
                field_u32: 0,
                field_u64: BigInt(0),
                field_i8: 0,
                field_i16: 0,
                field_i32: 0,
                field_i64: BigInt(0),
                field_f32: 0,
                field_f64: 0,
                field_bool: true,
            });
            const field_aBuf: ArrayBufferLike = storage.get(68);
            if (field_aBuf instanceof Error) {
                return field_aBuf;
            }
            const field_aErr: Error | undefined = field_a.decode(field_aBuf);
            if (field_aErr instanceof Error) {
                return field_aErr;
            } else {
                this.field_a = field_a;
            }
        }
        const field_bBuf: ArrayBufferLike | undefined = storage.get(69);
        if (field_bBuf === undefined) {
            return new Error(`Fail to get property field_b`);
        }
        if (field_bBuf.byteLength === 0) {
            this.field_b = undefined;
        } else {
            const field_b: StructExampleB = new StructExampleB({
                field_str: [],
                field_u8: [],
                field_u16: [],
                field_u32: [],
                field_u64: [],
                field_i8: [],
                field_i16: [],
                field_i32: [],
                field_i64: [],
                field_f32: [],
                field_f64: [],
                field_bool: [],
            });
            const field_bBuf: ArrayBufferLike = storage.get(69);
            if (field_bBuf instanceof Error) {
                return field_bBuf;
            }
            const field_bErr: Error | undefined = field_b.decode(field_bBuf);
            if (field_bErr instanceof Error) {
                return field_bErr;
            } else {
                this.field_b = field_b;
            }
        }
    }

    public defaults(): StructExampleJ {
        return StructExampleJ.defaults();
    }
}

export namespace GroupA {

    export interface EnumExampleA {
        Option_a?: string;
        Option_b?: string;
    }

    export interface IStructExampleA {
        field_u8: number;
        field_u16: number;
        opt: EnumExampleA;
    }
    export class StructExampleA extends Protocol.Convertor implements IStructExampleA {

        public static scheme: Protocol.IPropScheme[] = [
            { prop: 'field_u8', types: Protocol.Primitives.u8, optional: false, },
            { prop: 'field_u16', types: Protocol.Primitives.u16, optional: false, },
            { prop: 'opt', optional: false, options: [
                { prop: 'Option_a', types: Protocol.Primitives.StrUTF8, optional: false, },
                { prop: 'Option_b', types: Protocol.Primitives.StrUTF8, optional: false, },
            ] },
        ];

        public static defaults(): StructExampleA {
            return new StructExampleA({
                field_u8: 0,
                field_u16: 0,
                opt: {},
            });
        }

        public static getValidator(array: boolean): { validate(value: any): Error | undefined } {
            if (array) {
                return { validate(obj: any): Error | undefined {
                    if (!(obj instanceof Array)) {
                        return new Error(`Expecting Array<StructExampleA>`);
                    }
                    try {
                        obj.forEach((o, index: number) => {
                            if (!(o instanceof StructExampleA)) {
                                throw new Error(`Expecting instance of StructExampleA on index #${index}`);
                            }
                        });
                    } catch (e) {
                        return e;
                    }
                }};
            } else {
                return { validate(obj: any): Error | undefined {
                    return obj instanceof StructExampleA ? undefined : new Error(`Expecting instance of StructExampleA`);
                }};
            }
        }

        public field_u8: number;
        public field_u16: number;
        public opt: EnumExampleA;
        private _opt: Primitives.Enum;

        constructor(params: IStructExampleA)  {
            super();
            Object.keys(params).forEach((key: string) => {
                this[key] = params[key];
            });
            this._opt = new Primitives.Enum([
                Protocol.Primitives.StrUTF8.getSignature(),
                Protocol.Primitives.StrUTF8.getSignature(),
            ], (id: number): ISigned<any> | undefined => {
                switch (id) {
                    case 0: return new Protocol.Primitives.StrUTF8('');
                    case 1: return new Protocol.Primitives.StrUTF8('');
                }
            });
            if (Object.keys(this.opt).length > 1) {
                throw new Error(`Option cannot have more then 1 value. Property "opt" or class "StructExampleA"`);
            }
            if (this.opt.Option_a !== undefined) {
                const err: Error | undefined = this._opt.set(new Protocol.Primitives.Option<string>(0, new Protocol.Primitives.StrUTF8(this.opt.Option_a)));
                if (err instanceof Error) {
                    throw err;
                }
            }
            if (this.opt.Option_b !== undefined) {
                const err: Error | undefined = this._opt.set(new Protocol.Primitives.Option<string>(1, new Protocol.Primitives.StrUTF8(this.opt.Option_b)));
                if (err instanceof Error) {
                    throw err;
                }
            }
        }

        public getSignature(): string {
            return 'StructExampleA';
        }

        public getId(): number {
            return 72;
        }

        public encode(): ArrayBufferLike {
            return this.collect([
                () => this.getBuffer(73, Protocol.ESize.u8, Protocol.Primitives.u8.getSize(), Protocol.Primitives.u8.encode(this.field_u8)),
                () => this.getBuffer(74, Protocol.ESize.u8, Protocol.Primitives.u16.getSize(), Protocol.Primitives.u16.encode(this.field_u16)),
                () => { const buffer = this._opt.encode(); return this.getBuffer(75, Protocol.ESize.u64, BigInt(buffer.byteLength), buffer); },
            ]);
        }

        public decode(buffer: ArrayBufferLike): Error | undefined {
            const storage = this.getStorage(buffer);
            if (storage instanceof Error) {
                return storage;
            }
            const field_u8: number | Error = this.getValue<number>(storage, 73, Protocol.Primitives.u8.decode);
            if (field_u8 instanceof Error) {
                return field_u8;
            } else {
                this.field_u8 = field_u8;
            }
            const field_u16: number | Error = this.getValue<number>(storage, 74, Protocol.Primitives.u16.decode);
            if (field_u16 instanceof Error) {
                return field_u16;
            } else {
                this.field_u16 = field_u16;
            }
            this.opt = {};
            const optBuf: ArrayBufferLike = storage.get(75);
            if (optBuf === undefined) {
                return new Error(`Fail to get property "opt"`);
            }
            if (optBuf.byteLength > 0) {
                const optErr: Error | undefined = this._opt.decode(optBuf);
                if (optErr instanceof Error) {
                    return optErr;
                } else {
                    switch (this._opt.getValueIndex()) {
                        case 0: this.opt.Option_a = this._opt.get<string>(); break;
                        case 1: this.opt.Option_b = this._opt.get<string>(); break;
                    }
                }
            }
        }

        public defaults(): StructExampleA {
            return StructExampleA.defaults();
        }
    }

    export interface IStructExampleB {
        field_u8: number;
        field_u16: number;
        strct: StructExampleA;
    }
    export class StructExampleB extends Protocol.Convertor implements IStructExampleB {

        public static scheme: Protocol.IPropScheme[] = [
            { prop: 'field_u8', types: Protocol.Primitives.u8, optional: false, },
            { prop: 'field_u16', types: Protocol.Primitives.u16, optional: false, },
            { prop: 'strct', types: StructExampleA.getValidator(false), optional: false },
        ];

        public static defaults(): StructExampleB {
            return new StructExampleB({
                field_u8: 0,
                field_u16: 0,
                strct: new StructExampleA({
                    field_u8: 0,
                    field_u16: 0,
                    opt: {},
                }),
            });
        }

        public static getValidator(array: boolean): { validate(value: any): Error | undefined } {
            if (array) {
                return { validate(obj: any): Error | undefined {
                    if (!(obj instanceof Array)) {
                        return new Error(`Expecting Array<StructExampleB>`);
                    }
                    try {
                        obj.forEach((o, index: number) => {
                            if (!(o instanceof StructExampleB)) {
                                throw new Error(`Expecting instance of StructExampleB on index #${index}`);
                            }
                        });
                    } catch (e) {
                        return e;
                    }
                }};
            } else {
                return { validate(obj: any): Error | undefined {
                    return obj instanceof StructExampleB ? undefined : new Error(`Expecting instance of StructExampleB`);
                }};
            }
        }

        public field_u8: number;
        public field_u16: number;
        public strct: StructExampleA;

        constructor(params: IStructExampleB)  {
            super();
            Object.keys(params).forEach((key: string) => {
                this[key] = params[key];
            });
        }

        public getSignature(): string {
            return 'StructExampleB';
        }

        public getId(): number {
            return 76;
        }

        public encode(): ArrayBufferLike {
            return this.collect([
                () => this.getBuffer(77, Protocol.ESize.u8, Protocol.Primitives.u8.getSize(), Protocol.Primitives.u8.encode(this.field_u8)),
                () => this.getBuffer(78, Protocol.ESize.u8, Protocol.Primitives.u16.getSize(), Protocol.Primitives.u16.encode(this.field_u16)),
                () => { const buffer = this.strct.encode(); return this.getBuffer(79, Protocol.ESize.u64, BigInt(buffer.byteLength), buffer); },
            ]);
        }

        public decode(buffer: ArrayBufferLike): Error | undefined {
            const storage = this.getStorage(buffer);
            if (storage instanceof Error) {
                return storage;
            }
            const field_u8: number | Error = this.getValue<number>(storage, 77, Protocol.Primitives.u8.decode);
            if (field_u8 instanceof Error) {
                return field_u8;
            } else {
                this.field_u8 = field_u8;
            }
            const field_u16: number | Error = this.getValue<number>(storage, 78, Protocol.Primitives.u16.decode);
            if (field_u16 instanceof Error) {
                return field_u16;
            } else {
                this.field_u16 = field_u16;
            }
            const strct: StructExampleA = new StructExampleA({
                field_u8: 0,
                field_u16: 0,
                opt: {},
            });
            const strctBuf: ArrayBufferLike = storage.get(79);
            if (strctBuf instanceof Error) {
                return strctBuf;
            }
            const strctErr: Error | undefined = strct.decode(strctBuf);
            if (strctErr instanceof Error) {
                return strctErr;
            } else {
                this.strct = strct;
            }
        }

        public defaults(): StructExampleB {
            return StructExampleB.defaults();
        }
    }

}

export namespace GroupB {

    export interface IStructExampleA {
        field_u8: number;
        field_u16: number;
    }
    export class StructExampleA extends Protocol.Convertor implements IStructExampleA {

        public static scheme: Protocol.IPropScheme[] = [
            { prop: 'field_u8', types: Protocol.Primitives.u8, optional: false, },
            { prop: 'field_u16', types: Protocol.Primitives.u16, optional: false, },
        ];

        public static defaults(): StructExampleA {
            return new StructExampleA({
                field_u8: 0,
                field_u16: 0,
            });
        }

        public static getValidator(array: boolean): { validate(value: any): Error | undefined } {
            if (array) {
                return { validate(obj: any): Error | undefined {
                    if (!(obj instanceof Array)) {
                        return new Error(`Expecting Array<StructExampleA>`);
                    }
                    try {
                        obj.forEach((o, index: number) => {
                            if (!(o instanceof StructExampleA)) {
                                throw new Error(`Expecting instance of StructExampleA on index #${index}`);
                            }
                        });
                    } catch (e) {
                        return e;
                    }
                }};
            } else {
                return { validate(obj: any): Error | undefined {
                    return obj instanceof StructExampleA ? undefined : new Error(`Expecting instance of StructExampleA`);
                }};
            }
        }

        public field_u8: number;
        public field_u16: number;

        constructor(params: IStructExampleA)  {
            super();
            Object.keys(params).forEach((key: string) => {
                this[key] = params[key];
            });
        }

        public getSignature(): string {
            return 'StructExampleA';
        }

        public getId(): number {
            return 81;
        }

        public encode(): ArrayBufferLike {
            return this.collect([
                () => this.getBuffer(82, Protocol.ESize.u8, Protocol.Primitives.u8.getSize(), Protocol.Primitives.u8.encode(this.field_u8)),
                () => this.getBuffer(83, Protocol.ESize.u8, Protocol.Primitives.u16.getSize(), Protocol.Primitives.u16.encode(this.field_u16)),
            ]);
        }

        public decode(buffer: ArrayBufferLike): Error | undefined {
            const storage = this.getStorage(buffer);
            if (storage instanceof Error) {
                return storage;
            }
            const field_u8: number | Error = this.getValue<number>(storage, 82, Protocol.Primitives.u8.decode);
            if (field_u8 instanceof Error) {
                return field_u8;
            } else {
                this.field_u8 = field_u8;
            }
            const field_u16: number | Error = this.getValue<number>(storage, 83, Protocol.Primitives.u16.decode);
            if (field_u16 instanceof Error) {
                return field_u16;
            } else {
                this.field_u16 = field_u16;
            }
        }

        public defaults(): StructExampleA {
            return StructExampleA.defaults();
        }
    }

    export namespace GroupC {

        export interface IStructExampleA {
            field_u8: number;
            field_u16: number;
        }
        export class StructExampleA extends Protocol.Convertor implements IStructExampleA {

            public static scheme: Protocol.IPropScheme[] = [
                { prop: 'field_u8', types: Protocol.Primitives.u8, optional: false, },
                { prop: 'field_u16', types: Protocol.Primitives.u16, optional: false, },
            ];

            public static defaults(): StructExampleA {
                return new StructExampleA({
                    field_u8: 0,
                    field_u16: 0,
                });
            }

            public static getValidator(array: boolean): { validate(value: any): Error | undefined } {
                if (array) {
                    return { validate(obj: any): Error | undefined {
                        if (!(obj instanceof Array)) {
                            return new Error(`Expecting Array<StructExampleA>`);
                        }
                        try {
                            obj.forEach((o, index: number) => {
                                if (!(o instanceof StructExampleA)) {
                                    throw new Error(`Expecting instance of StructExampleA on index #${index}`);
                                }
                            });
                        } catch (e) {
                            return e;
                        }
                    }};
                } else {
                    return { validate(obj: any): Error | undefined {
                        return obj instanceof StructExampleA ? undefined : new Error(`Expecting instance of StructExampleA`);
                    }};
                }
            }

            public field_u8: number;
            public field_u16: number;

            constructor(params: IStructExampleA)  {
                super();
                Object.keys(params).forEach((key: string) => {
                    this[key] = params[key];
                });
            }

            public getSignature(): string {
                return 'StructExampleA';
            }

            public getId(): number {
                return 85;
            }

            public encode(): ArrayBufferLike {
                return this.collect([
                    () => this.getBuffer(86, Protocol.ESize.u8, Protocol.Primitives.u8.getSize(), Protocol.Primitives.u8.encode(this.field_u8)),
                    () => this.getBuffer(87, Protocol.ESize.u8, Protocol.Primitives.u16.getSize(), Protocol.Primitives.u16.encode(this.field_u16)),
                ]);
            }

            public decode(buffer: ArrayBufferLike): Error | undefined {
                const storage = this.getStorage(buffer);
                if (storage instanceof Error) {
                    return storage;
                }
                const field_u8: number | Error = this.getValue<number>(storage, 86, Protocol.Primitives.u8.decode);
                if (field_u8 instanceof Error) {
                    return field_u8;
                } else {
                    this.field_u8 = field_u8;
                }
                const field_u16: number | Error = this.getValue<number>(storage, 87, Protocol.Primitives.u16.decode);
                if (field_u16 instanceof Error) {
                    return field_u16;
                } else {
                    this.field_u16 = field_u16;
                }
            }

            public defaults(): StructExampleA {
                return StructExampleA.defaults();
            }
        }

        export interface IStructExampleB {
            field_u8: number;
            field_u16: number;
            strct: StructExampleA;
        }
        export class StructExampleB extends Protocol.Convertor implements IStructExampleB {

            public static scheme: Protocol.IPropScheme[] = [
                { prop: 'field_u8', types: Protocol.Primitives.u8, optional: false, },
                { prop: 'field_u16', types: Protocol.Primitives.u16, optional: false, },
                { prop: 'strct', types: StructExampleA.getValidator(false), optional: false },
            ];

            public static defaults(): StructExampleB {
                return new StructExampleB({
                    field_u8: 0,
                    field_u16: 0,
                    strct: new StructExampleA({
                        field_u8: 0,
                        field_u16: 0,
                    }),
                });
            }

            public static getValidator(array: boolean): { validate(value: any): Error | undefined } {
                if (array) {
                    return { validate(obj: any): Error | undefined {
                        if (!(obj instanceof Array)) {
                            return new Error(`Expecting Array<StructExampleB>`);
                        }
                        try {
                            obj.forEach((o, index: number) => {
                                if (!(o instanceof StructExampleB)) {
                                    throw new Error(`Expecting instance of StructExampleB on index #${index}`);
                                }
                            });
                        } catch (e) {
                            return e;
                        }
                    }};
                } else {
                    return { validate(obj: any): Error | undefined {
                        return obj instanceof StructExampleB ? undefined : new Error(`Expecting instance of StructExampleB`);
                    }};
                }
            }

            public field_u8: number;
            public field_u16: number;
            public strct: StructExampleA;

            constructor(params: IStructExampleB)  {
                super();
                Object.keys(params).forEach((key: string) => {
                    this[key] = params[key];
                });
            }

            public getSignature(): string {
                return 'StructExampleB';
            }

            public getId(): number {
                return 88;
            }

            public encode(): ArrayBufferLike {
                return this.collect([
                    () => this.getBuffer(89, Protocol.ESize.u8, Protocol.Primitives.u8.getSize(), Protocol.Primitives.u8.encode(this.field_u8)),
                    () => this.getBuffer(90, Protocol.ESize.u8, Protocol.Primitives.u16.getSize(), Protocol.Primitives.u16.encode(this.field_u16)),
                    () => { const buffer = this.strct.encode(); return this.getBuffer(91, Protocol.ESize.u64, BigInt(buffer.byteLength), buffer); },
                ]);
            }

            public decode(buffer: ArrayBufferLike): Error | undefined {
                const storage = this.getStorage(buffer);
                if (storage instanceof Error) {
                    return storage;
                }
                const field_u8: number | Error = this.getValue<number>(storage, 89, Protocol.Primitives.u8.decode);
                if (field_u8 instanceof Error) {
                    return field_u8;
                } else {
                    this.field_u8 = field_u8;
                }
                const field_u16: number | Error = this.getValue<number>(storage, 90, Protocol.Primitives.u16.decode);
                if (field_u16 instanceof Error) {
                    return field_u16;
                } else {
                    this.field_u16 = field_u16;
                }
                const strct: StructExampleA = new StructExampleA({
                    field_u8: 0,
                    field_u16: 0,
                });
                const strctBuf: ArrayBufferLike = storage.get(91);
                if (strctBuf instanceof Error) {
                    return strctBuf;
                }
                const strctErr: Error | undefined = strct.decode(strctBuf);
                if (strctErr instanceof Error) {
                    return strctErr;
                } else {
                    this.strct = strct;
                }
            }

            public defaults(): StructExampleB {
                return StructExampleB.defaults();
            }
        }

    }

}
