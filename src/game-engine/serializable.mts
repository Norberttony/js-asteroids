
// Code largely unchanged from:
// https://itnext.io/mastering-type-safe-json-serialization-in-typescript-b898a0316741

import { Component } from "./component.mjs";

// These are the only types that JSON can deal with when serializing
type JSONPrimitive = string | number | boolean | null | undefined;

// decides valid JSON values
export type JSONValue = JSONPrimitive | JSONValue[] | {
    [key: string]: JSONValue;
};

export type JSONCompatible<T> = unknown extends T ? never : {
    [P in keyof T]:
        T[P] extends JSONValue ? T[P] :
        T[P] extends NotAssignableToJson ? never :
        JSONCompatible<T[P]>;
};

export type SerializedScene = { [id: number]: string };
export type SerializedGameObject = { id: number, comps: { [className: string]: string } };

type NotAssignableToJson =
    | bigint
    | symbol
    | Function;

export function serializeToJSON<T>(obj: JSONCompatible<T>): string {
    return JSON.stringify(obj);
}
