# TypeScript Decisions

## Strict Mode

The project uses:

"strict": true

This enables stronger type checking.

## noImplicitAny

Prevents variables and parameters from getting any implicitly.

## strictNullChecks

Makes TypeScript handle null and undefined explicitly.

Example: a value that may be undefined must be checked before use.

## strictFunctionTypes

Checks that function parameter types are compatible.

## noUncheckedIndexedAccess

Makes array access include undefined.

For example:

const value = numbers[0];

is treated as:

number | undefined

so the value must be checked before use.

## Decision

These strict options are enables to catch type errors early and make the code safer.
