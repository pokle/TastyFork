# TastyFork

[![Build Status](https://travis-ci.org/pokle/TastyFork.png?branch=master)](https://travis-ci.org/pokle/TastyFork)

## Concept

Multiple people editing the same document without tears.

## How?

TastyFork gives you a Key-Value store that can be sync'd with remote TastyFork stores. It is transport and database agnostic - you provide these through hooks.

Lets use the terminology of the ubiquitous TODO app. A document is a list of todo items. TastyFork gives you a Key-Value store on the web browser that will synchronise live with a TastyFork Key-Value store on your web server. If conflicts are detected, TastyFork will create duplicate items - allowing your users to merge them as required.

## Alternatives / Options / Ideas

- [pouchdb](https://github.com/mikeal/pouchdb) github.
- [IndexedDB](http://www.w3.org/TR/IndexedDB/) spec on w3.org.
- [dribbledb](https://github.com/expensecat/dribbledb) github.
