// tslint:disable: class-name
// tslint:disable: max-classes-per-file

import { i16 } from './protocol.primitives.i16';
import { Primitive } from './protocol.primitives.interface';

export class ArrayI16 extends Primitive<number[]> {

    public static getSignature(): string {
        return 'aI16';
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
