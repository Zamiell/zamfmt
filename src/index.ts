import * as fs from 'fs';
import commander from 'commander';
import getStdin from 'get-stdin';
import formatText from './formatText';
import { error } from './misc';

function tryFormat(luaText: string) {
  try {
    const formattedLuaText = formatText(luaText);
    process.stdout.write(formattedLuaText);
  } catch (err) {
    error('failed to parse the code:', err);
  }
}

function main() {
  const program = commander.program;
  program.parse(process.argv);

  if (program.stdin) {
    getStdin().then((luaText) => {
      tryFormat(luaText);
    }).catch((err: Error) => {
      error('failed to read stdin:', err);
    });

    console.log('waiting for stdin...');
    return;
  }

  if (program.args.length === 0) {
    console.error('error: expected <file.lua>');
    process.exit(1);
  }

  // Assume that the first argument is the filename of a lua file to read
  const filename = program.args[0];
  let luaText = '';
  try {
    luaText = fs.readFileSync(filename).toString();
  } catch (err) {
    error(`failed to read file "${filename}":`, err);
  }
  tryFormat(luaText);
}

main();
