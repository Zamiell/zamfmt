import * as luaparse from 'luaparse';
import { ARG_SEPARATOR, TOKEN_SEPARATOR } from './constants';

export function printExpression(expression: luaparse.Expression): string {
  switch (expression.type) {
    case 'BinaryExpression': {
      const tokens: string[] = [];
      tokens.push(printExpression(expression.left));
      tokens.push(expression.operator);
      tokens.push(printExpression(expression.right));
      return tokens.join(TOKEN_SEPARATOR);
    }

    case 'CallExpression': {
      const functionName = printExpression(expression.base);
      const args: string[] = [];
      expression.arguments.forEach((arg: luaparse.Expression) => {
        args.push(printExpression(arg));
      });
      return `${functionName}(${args.join(ARG_SEPARATOR)})`;
    }

    case 'Identifier': {
      return expression.name;
    }

    case 'NumericLiteral':
    case 'StringLiteral': {
      return expression.raw;
    }

    default: {
      throw new Error(`unhandled case for expression type: ${expression.type}`);
    }
  }
}

export function printStatementOrComment(
  statementOrComment: luaparse.Statement | luaparse.Comment,
): string {
  switch (statementOrComment.type) {
    case 'CallStatement': {
      console.log(statementOrComment);
      process.exit(1);
      return '';
    }

    case 'Comment': {
      return statementOrComment.raw;
    }

    case 'LocalStatement': {
      if (statementOrComment.variables.length !== 1) {
        // TODO split them up into separate lines
        throw new Error('more than one variable defined in a local statement');
      }

      const tokens: string[] = [];
      tokens.push('local');
      tokens.push(statementOrComment.variables[0].name);
      tokens.push('=');

      statementOrComment.init.forEach((expression: luaparse.Expression | null) => {
        if (expression === null) {
          throw new Error('an expression was null');
        }

        tokens.push(printExpression(expression));
      });

      return tokens.join(TOKEN_SEPARATOR);
    }

    default: {
      throw new Error(`unhandled case for statement type: ${statementOrComment.type}`);
    }
  }
}
