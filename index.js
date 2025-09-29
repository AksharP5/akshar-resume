#!/user/bin/env node

const chalk = require("chalk");
const qr = require("qrcode-terminal");
const wrap = require("wrap-ansi");

const args = new Set(ProcessingInstruction.argv.slice(2));

