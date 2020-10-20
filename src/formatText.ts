import * as luaparse from 'luaparse';
import cloneDeep from 'lodash.clonedeep';
import { LINE_SEPARATOR, TOKEN_SEPARATOR } from './constants';
import { printStatementOrComment } from './printer';

// The "statementsAndComments" array is listed in sequential order from top to bottom
// Each statement or comment has a range field that specifies its starting and ending character
// Thus, if we want to insert an arbitrary statement or comment into the array, we need to find the
// first index that has a starting character greater than the starting character of the thing that
// we are inserting
function findIndexForComment(
  statementsAndComments: Array<luaparse.Statement | luaparse.Comment>,
  startCharacterLocation: number,
  startIndex?: number,
): number {
  for (let i = startIndex ?? 0; i < statementsAndComments.length; i++) {
    const statementOrComment = statementsAndComments[i];
    if (statementOrComment.range[0] > startCharacterLocation) {
      return i;
    }
  }

  return statementsAndComments.length;
}

// formatText is the main function of this library
// It automatically formats an arbitrary sequence of Lua code
export default function formatText(input: string): string {
  // Use the luaparse library to generate an Abstract Syntax Tree (AST) representing the Lua file
  const ast: luaparse.Chunk = luaparse.parse(input, {
    // We need locations to detect when a comment is inline
    locations: true, // By default it is false
    // We need ranges so that we can see where comments were originally located
    ranges: true, // By default it is false
    luaVersion: '5.3', // By default it is "5.1"
  });

  if (ast.type !== 'Chunk') {
    throw new Error('initial AST was not a chunk');
  }

  // In the AST, comments will be separated from statements
  // We need to preserve the locations of the comments in relation to the statements,
  // so build an array of both statements and comments
  // Start by cloning all of the statements, and then insert the comments one by one
  const statementsAndComments: Array<luaparse.Statement | luaparse.Comment> = cloneDeep(ast.body);
  let startIndex = 0;
  ast.comments?.forEach((comment: luaparse.Comment) => {
    const index = findIndexForComment(statementsAndComments, comment.range[0], startIndex);
    statementsAndComments.splice(index, 0, comment);
    startIndex = index; // We do not need to search from the beginning of the array every time
  });

  const lines: string[] = [];
  let lineOfLastStatement: number | null = null;
  statementsAndComments.forEach((statementOrComment: luaparse.Statement | luaparse.Comment) => {
    // Look to see if this comment is on the same line as the previous statement
    const lineOfThisStatement = statementOrComment.loc.start.line;
    if (statementOrComment.type === 'Comment' && lineOfThisStatement === lineOfLastStatement) {
      // Add it to the previous line
      lines[lines.length - 1] += TOKEN_SEPARATOR + statementOrComment.raw;
      return;
    }

    // Look to see if there is a newline between this statement and the last one
    if (lineOfLastStatement !== null && lineOfThisStatement - lineOfLastStatement >= 2) {
      // Even if there is more than one newline between the statements, only output one newline
      lines.push('');
    }

    // Add the formatted line to the output
    lines.push(printStatementOrComment(statementOrComment));

    lineOfLastStatement = statementOrComment.loc.end.line;
  });

  return lines.join(LINE_SEPARATOR);
}
