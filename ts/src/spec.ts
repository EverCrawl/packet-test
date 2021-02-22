import { Reader, Writer } from "packet";
import { ComplexType, Flag } from "./test";

let data = new ComplexType(
    ["first", "second"],
    [{ x: 0.0, y: 1.0 }],
    Flag.B,
    [{
        a: 0,
        b: 1,
        c: 30,
        d: 100,
    }],
    0,
    undefined,
    Flag.A
);

let bin = new Uint8Array([
    2, 0, 0, 0, // names.len()
    5, 0, 0, 0, // names[0].len()
    102, 105, 114, 115, 116, // names[0]
    6, 0, 0, 0, // names[1].len()
    115, 101, 99, 111, 110, 100, // names[1]
    1, 0, 0, 0, // positions.len()
    0, 0, 0, 0, // positions[0].x
    0, 0, 128, 63, // positions[0].y
    2,  // flag
    1, 0, 0, 0, // values.len()
    0, 0, 0, 0, // values[0].a
    1, 0, 0, 0,   // values[0].b
    30,  // values[0].c
    100, // values[0].d
    1,   // opt == Some
    0,   // opt
    0,   // opt_s == None
    1,   // opt_e == Some
    1,   // opt_e
]).buffer;

describe("generated", function () {
    it("reads ComplexType", function () {
        expect(ComplexType.read(bin)).toEqual(data);
    })
    it("writes ComplexType - prealloc", function () {
        let buffer = new ArrayBuffer(bin.byteLength);
        expect(data.write(buffer)).toEqual(bin);

    });
    it("writes ComplexType - no prealloc", function () {
        expect(data.write()).toEqual(bin);
    });
});