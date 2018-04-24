/**
* @copyright 2018 - Max Bebök
* @author Max Bebök
* @license GNU-GPLv3 - see the "LICENSE" file in the root directory
*/

const assert = require('assert');
var expect = require('chai').expect;

const Binary_File = require('./../src/binary_file.js');

describe('Binary_File', () =>
{
    describe('getBuffer', () =>
    {
        it("size should be the biggest written offset, not the buffer size", () =>
        {   
            let file = new Binary_File(null, 100);
            file.write('u32', 0xFFFFFFFF);
            
            expect(file.getBuffer().length).equal(4);
            expect(file.getBuffer()).deep.equal(Buffer.from([0xFF, 0xFF, 0xFF, 0xFF]));
        });
    });

    describe('write', () =>
    {
        it("should resize the buffer if it's too big", () =>
        {   
            let file = new Binary_File(null, 4);
            file.setEndian(file.ENDIAN_BIG);
            file.write('u32', 0x11223344);
            file.write('u32', 0xAABBCCDD); // resize should happen here
            
            expect(file.getBuffer()).deep.equal(Buffer.from([0x11, 0x22, 0x33, 0x44, 0xAA, 0xBB, 0xCC, 0xDD]));
        });

        it("should resize the buffer, even mid value", () =>
        {   
            let file = new Binary_File(null, 5);
            file.setEndian(file.ENDIAN_BIG);
            file.write('u32', 0x11223344);
            file.write('u32', 0xAABBCCDD); // resize should happen here @ byte 2
            
            expect(file.getBuffer()).deep.equal(Buffer.from([0x11, 0x22, 0x33, 0x44, 0xAA, 0xBB, 0xCC, 0xDD]));
        });

    });
});