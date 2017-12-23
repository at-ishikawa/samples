#! /usr/bin/env node

class ExtendedError extends Error
{
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.stack = (new Error(message)).stack;
  }
}

class InvalidArgumentError extends ExtendedError
{
}

const error = new InvalidArgumentError('no argument');
console.log(error);
