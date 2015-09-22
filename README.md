# fl-serializer [![Build Status](https://travis-ci.org/danjamin/fl-serializer.svg)](https://travis-ci.org/danjamin/fl-serializer)

Serializer for fluxlike isomorphic applications. Intended use is for serailizing
store data on the back-end and deserializing during initialization on the
front-end.

## USE

### install

Note: this is still in development and not registered to **npm** yet.
      So keep this in mind and install via the Git URL for now.

```sh
$ npm install --save https://github.com/danjamin/fl-serializer.git#v0.1.1
```

### example

Register serialization and deserialization functions then invoke them as a set.

```js
/* global JSON */

var Serializer = require('fl-serializer').Serializer;

// instantiate a serializer
var s = new Serializer();

// register with the serializer instance
s.register('some-name', function () {
  // this is the serialization function
  // it should not expect any arguments and should return a string
  return '{"foo": "bar"}';
}, function (serializedData) {
  // this is the de-serialization function
  // it should expect a single argument which is the serialized data
  // it is not expected to return anything
  var rawData = JSON.parse(serializedData);

  alert(rawData.foo); // will alert "bar"
});

// serialize the data
// note: serializedData becomes key => value based on keys registered
// e.g. in this case '{"some-name": ...}'
var serializedData = s.serialize();

// deserialize with the serialized data (the response of s.serialize)
s.deserialize(serializedData);

// NOTE: in some cases you may want to pass an object
// this is also supported:
s.deserialize(JSON.parse(serializedData));
```

## DEVELOP

### install dependencies

```sh
$ npm install -g jshint mocha babel
```

```sh
$ npm install
```

### linting

```sh
$ npm run lint
```

### testing

```sh
$ npm test
```

optionally you can filter the tests:

```sh
$ ./scripts/test fl-serializer
```

### publishing

For now:

update **package.json** version, tag semver, and push to origin
