import * as fs from 'fs';
import * as path from 'path';
import * as Protocol from './protocol';
import { usecases as samples } from './writer';

const usecases: Array<{ name: string, entity: any }> = [
    { name: 'EnumExampleA.a' , entity: Protocol.Primitives.Enum },
    { name: 'EnumExampleA.b' , entity: Protocol.Primitives.Enum },
    { name: 'EnumExampleB.str' , entity: Protocol.Primitives.Enum },
    { name: 'EnumExampleB.u8' , entity: Protocol.Primitives.Enum },
    { name: 'EnumExampleB.u16' , entity: Protocol.Primitives.Enum },
    { name: 'EnumExampleB.u32' , entity: Protocol.Primitives.Enum },
    { name: 'EnumExampleB.u64' , entity: Protocol.Primitives.Enum },
    { name: 'EnumExampleB.i8' , entity: Protocol.Primitives.Enum },
    { name: 'EnumExampleB.i16' , entity: Protocol.Primitives.Enum },
    { name: 'EnumExampleB.i32' , entity: Protocol.Primitives.Enum },
    { name: 'EnumExampleB.i64' , entity: Protocol.Primitives.Enum },
    { name: 'EnumExampleB.f32' , entity: Protocol.Primitives.Enum },
    { name: 'EnumExampleB.f64' , entity: Protocol.Primitives.Enum },
    { name: 'StructExampleA' , entity: Protocol.StructExampleA },
    { name: 'StructExampleB' , entity: Protocol.StructExampleB },
    { name: 'StructExampleC' , entity: Protocol.StructExampleC },
    { name: 'StructExampleD' , entity: Protocol.StructExampleD },
    { name: 'StructExampleE' , entity: Protocol.StructExampleE },
    { name: 'StructExampleF' , entity: Protocol.StructExampleF },
    { name: 'StructExampleG' , entity: Protocol.StructExampleG },
    { name: 'StructExampleJ' , entity: Protocol.StructExampleJ },
    { name: 'GroupAStructExampleA' , entity: Protocol.GroupA.StructExampleA },
    { name: 'GroupAStructExampleB' , entity: Protocol.GroupA.StructExampleB },
    { name: 'GroupBStructExampleA' , entity: Protocol.GroupB.StructExampleA },
    { name: 'GroupCStructExampleA' , entity: Protocol.GroupB.GroupC.StructExampleA },
    { name: 'GroupCStructExampleB' , entity: Protocol.GroupB.GroupC.StructExampleB },
];

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

function isEqualProp(a: any, b: any): boolean {
    if (typeof a !== typeof b) {
        console.log(`Left: ${a}, right: ${b}`)
        return false;
    }
    if (typeof a === 'bigint') {
        if (a !== b) {
            console.log(`Left: ${a}, right: ${b}`)
            return false;
        }
        return true;
    }
    // JS has problems with float... 0.1 can be after parsing 0.1000000001, well, let's prevent it
    if (isFloat(a)) {
        if (a.toFixed(2) !== b.toFixed(2)) {
            console.log(`Left: ${a}, right: ${b}`)
            return false;
        }
        return true;
    }
    if (a instanceof Array) {
        try {
            a.forEach((v, i) => {
                if (!isEqualProp(a[i], b[i])) {
                    throw false;
                }
            });
        } catch (e) {
            return false;
        }
        return true;
    }
    if (typeof a === 'object') {
        if (!isEqual(a, b)) {
            console.log(`Left: ${a}, right: ${b}`)
            return false;
        }
        return true;
    }
    if (a !== b) {
        console.log(`Left: ${a}, right: ${b}`)
        return false;
    }
    return true;
}

function isEqual(a: any, b: any): boolean {
    if (Object.keys(a).length !== Object.keys(b).length) {
        return false;
    }
    try {
        Object.keys(a).forEach((key: string) => {
            if (typeof a[key] === 'function') {
                return;
            }
            if (!isEqualProp(a[key], b[key])) {
                throw false;
            }
        });
    } catch (e) {
        return false;
    }
    return true;
}

export function read(): Promise<void> {
    const dest: string = path.resolve(path.dirname(module.filename), '../../rust/binary');
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(dest)) {
            return reject(new Error(`Fail to find dest: ${dest}`));
        }
        return Promise.all(usecases.map((usecase, index) => {
            return new Promise((res, rej) => {
                const target = path.resolve(dest, `${usecase.name}.prot.bin`);
                fs.open(target, 'r', (errOpen, file) => {
                    if (errOpen) {
                        return rej(new Error(`Fail to open file ${target} due error: ${errOpen.message}`));
                    }
                    fs.readFile(file, (errWrite: Error | undefined, buffer: Buffer) => {
                        if (errWrite) {
                            return rej(new Error(`Fail to read file ${target} due error: ${errWrite.message}`));
                        }
                        const inst = usecase.entity.from(buffer);
                        if (inst instanceof Error) {
                            return rej(new Error(`Fail to parse usecase "${usecase.name}": ${inst.message}`));
                        }
                        const sample = samples[index].entity;
                        if (!isEqual(sample, inst)) {
                            return rej(new Error(`Parsed object from ${target} isn't equal to sample.`));
                        }
                        console.log(`[TS] File: ${target} has beed read.`);
                        res(undefined);
                    });
                });
            });
        })).then(() => {
            return resolve();
        }).catch(reject);
    });
}