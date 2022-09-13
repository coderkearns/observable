<div align="center">
    <h1>observable</h1>
    <p>Simple utils for javascript reactivity, with just enough to be called a "framework"</p>
</div>

## Description

Observable is based, suprisingly enough, on `observable`s. An observable is any javascript object with a `.subscribe(fn)` method to take subscribers and trigger them on command. All the utilities implemented here are based around this idea or around using it easily.

## Getting Started

### Dependencies

* Observable has absolutely **no deps** to make your life nice and easy.

### Installing

* Use npm (or yarn) to install from this repo:

```shell
$ npm install git+https://github.com/coderkearns/observable
# or
$ yarn add https://github.com/coderkearns/observable
```

### Simple Usage

Check out each utility separately to see what it can do. Here's an example for `observable()`:

```js
import { observable } from 'observable/observable'

const count = observable(0)

const unsubscribe = count.subscribe(() => {
    // some render logic could go here
    console.log(`The count is now ${count()}`)
})

count.set(1) // The count is now 1

// Functions are call with the previous value and expected to return the next value
count.set(currentCount => currentCount + 1) // The count is now 2

unsubscribe()

count.set(3) // *Nothing is logged, but the count still changes internally*

console.log(`The final count was ${count()}`)
```

## Todos

- [ ] Add full API docs with examples.
- [ ] *(optional)* Utilize jsdoc.
- [ ] *(optional)* Migrate to Typescript.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
