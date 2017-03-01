React Native Ubuntu
=======================


This is an unofficial fork of <https://github.com/CanonicalLtd/react-native>

It changed the core structure without rebuild react-native tools.


## features

- Fix some bugs and update to newest react-native.
- Using plugin model works with official react-native-cli
- Can be used in most linux versions and Ubuntu Click 15.04

## Problems

- It still have tons of bugs in its native code
- It used an external node process which made I confused
- Do not know how to publish the native code

Welcome to discuss with me about those problems, which is a great help for me.

## Install

You should install the react-native-cli first, and create a project.

```sh
	react-native init RNUbuntu
```

Using npm to install it:

```sh
	npm install http://github.com/sunxfancy/react-native-ubuntu --save
```

And init it first:

```sh
	react-native ubuntu
```

It should create a ubuntu fold in the root dir of the project.

## Fix the react-native server

You should change the react-native default configure to let react-native dev-server found ubuntu platform:

```
// ./node_modules/react-native/packager/defaults.js

...

exports.platforms = ['ios', 'android', 'windows', 'web', 'ubuntu'];  // add ubuntu platform

...

exports.providesModuleNodeModules = [
  'react-native',
  'react-native-windows',
  'react-native-ubuntu'  // add ubuntu platform
];

```

When this project become stable, I will ask them to add this platform. 


## LICENSE

BSD License