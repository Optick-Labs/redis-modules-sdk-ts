"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const cli_argument_parser_1 = require("cli-argument-parser");
const chai_1 = require("chai");
const module_base_1 = require("../modules/module.base");
const clients = [];
describe('Module base testing', function () {
    return __awaiter(this, void 0, void 0, function* () {
        before(() => __awaiter(this, void 0, void 0, function* () {
            clients.push(new module_base_1.Module('Module', {
                host: cli_argument_parser_1.cliArguments.host,
                port: parseInt(cli_argument_parser_1.cliArguments.port),
            }, { isHandleError: false }));
            /*
            Commenting this out until we find a solution for the mock server.
            clients.push(new Module('Module', [{
                host: cliArguments.host,
                port: parseInt(cliArguments.port),
            }], { isHandleError: false }));*/
            for (const client of clients)
                yield client.connect();
        }));
        after(() => __awaiter(this, void 0, void 0, function* () {
            for (const client of clients)
                yield client.disconnect();
        }));
        it('sendCommand function', () => __awaiter(this, void 0, void 0, function* () {
            for (const client of clients) {
                let response = yield client.sendCommand({ command: 'set', args: ['foo', 'bar'] });
                chai_1.expect(response).to.equal('OK', 'The response of the SET command');
                response = yield client.sendCommand({ command: 'get', args: ['foo'] });
                chai_1.expect(response).to.equal('bar', 'The response of the GET command');
                response = yield client.sendCommand({ command: 'del', args: ['foo'] });
                chai_1.expect(response).to.equal(1, 'The response of the DEL command');
            }
        }));
        it('handleResponse function', () => __awaiter(this, void 0, void 0, function* () {
            let response = 'OK';
            let parsed = clients[0].handleResponse(response);
            chai_1.expect(parsed).to.equal(response, 'The parsed response');
            response = ['key', 'value', 'key2', 'value2'];
            parsed = clients[0].handleResponse(response);
            chai_1.expect(parsed.key).to.equal(response[1], 'The parsed response');
            chai_1.expect(parsed.key2).to.equal(response[3], 'The parsed response');
            response = [
                'numbers', ['num1', 2]
            ];
            parsed = clients[0].handleResponse(response);
            chai_1.expect(parsed.numbers.num1).to.equal(response[1][1], 'The parsed response');
        }));
        it('isOnlyTwoDimensionalArray function', () => __awaiter(this, void 0, void 0, function* () {
            let response = [
                [1, 2, 3],
                1
            ];
            chai_1.expect(clients[0].isOnlyTwoDimensionalArray(response)).to.equal(false, 'If array is two dimensional');
            response = [
                [1, 2, 3],
                [6]
            ];
            chai_1.expect(clients[0].isOnlyTwoDimensionalArray(response)).to.equal(true, 'If array is two dimensional');
        }));
    });
});
