/* global JSON, describe, it, before, beforeEach */

var expect = require('expect.js');
var sinon = require('sinon');

var Serializer = require('../main.js').Serializer;

var noop = function () {};

describe("fl-serializer", function () {

  var deserializeMockFn,
    deserializeMockFn2;

  before(function () {
    deserializeMockFn = sinon.spy();
    deserializeMockFn2 = sinon.spy();
  });

  beforeEach(function () {
    deserializeMockFn.reset();
    deserializeMockFn2.reset();
  });

  it("should exist", function () {
    expect(Serializer).to.be.ok();
    expect(Serializer).to.be.an('function');
  });

  it("should handle nothing registered", function () {
    var s = new Serializer();
    var serializedData = s.serialize();
    expect(serializedData).to.be('{}');
  });

  it("should be able to serialize", function () {
    var s = new Serializer();

    s.register('example', function () {
      return '{"foo": "bar"}';
    }, noop);

    var serializedData = s.serialize();
    var rawData = JSON.parse(serializedData);

    expect(rawData).to.be.an('object');
    expect(rawData.example).to.be.a('string');
    expect(rawData.example).to.be('{"foo": "bar"}');
  });

  it("should be able to deserialize", function () {
    var s = new Serializer();

    s.register('example', function () {
      return '{"foo": "bar"}';
    }, deserializeMockFn);

    s.register('example-2', function () {
      return '{"foo": "baz"}';
    }, deserializeMockFn2);

    var serializedData = s.serialize();
    s.deserialize(serializedData);

    expect(deserializeMockFn.callCount).to.be(1);
    expect(deserializeMockFn.calledWith('{"foo": "bar"}')).to.be(true);

    expect(deserializeMockFn2.callCount).to.be(1);
    expect(deserializeMockFn2.calledWith('{"foo": "baz"}')).to.be(true);
  });

  it("should be able to deserialize as object", function () {
    var s = new Serializer();

    s.register('example', function () {
      return '{"foo": "bar"}';
    }, deserializeMockFn);

    s.register('example-2', function () {
      return '{"foo": "baz"}';
    }, deserializeMockFn2);

    var serializedData = s.serialize();
    var rawData = JSON.parse(serializedData);
    s.deserialize(rawData);

    expect(deserializeMockFn.callCount).to.be(1);
    expect(deserializeMockFn.calledWith('{"foo": "bar"}')).to.be(true);

    expect(deserializeMockFn2.callCount).to.be(1);
    expect(deserializeMockFn2.calledWith('{"foo": "baz"}')).to.be(true);
  });
});
