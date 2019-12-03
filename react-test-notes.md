## ENZYME

### Setup fn to create a shallow wrapper component for the connected component.

```
const setup = () => {
     return shallow(<App />);
}
```

### 'STORE FACTORY' - Test Helper

And the reason we're going to do this is because we want to be able to create a store for testing that
matches the configuration of our actual store.

So we're going to be importing the root reducer from source producers.
We want to make sure we're using the same reduces as our actual app.
So if we added reducer to our app it will add it to our store factory as well.
When we add middleware to our store we'll share the middleware as array with our store factory also.


```import { createStore } from 'redux';

export const storeFactory = (initialState) => {
    return createStore(rootReducer, initialState)
};
```


##### To do setup for creating shallow wrapper of component :
```
const store = storeFactory(initialState);
const wrapper = shallow(<Input store={store} />);
```

#### _wrapper.debug();_
- What we have here(wrapper.debug()) is the higher order component.
- That's the result of the Connect function that redux provides and this higher order component
        provides us with a couple things.
- A shallow render here though we have a higher order component and it actually has a couple of children.
- So we're seeing that we don't get those children rendered. We only get the declaration of them.


#### _enzyme dive() method - wrapper.dive()_

`if you want to go more deeper then ---> wrapper.dive().dive()`


- Using the enzyme dive method and what the dive method does is it returns the non dom or in other words the react            child component of the shallow wrapper


_If you want test with mock store then you can use this package - `redux-mock-store`.
It can test intermediate actions, such as Loading while waiting for AJAX.
But it cannot test changes to the state._


### TESTING AXIOS CALLS


**_Why moxios ?_**

- The server is necessary for the actual app. But we don't want to test the server when we're testing our app.

- We want to isolate our tests so that if the test fails we know that it's our app failing and not the
server or the connection to the server.

- It actually even let us test our app without even running the server or without the server even having
been written so let's take a look at how that works.


**_The way moxios works:_**

- _Tests installs moxios._
    - axios will now send requests to moxios instead of http.
    - test specifies moxios response

    test ---> action creator ---> axios ---> moxios

- _Test calls action creator._
- _Action Creator calls axios._
- _Action creator receives moxios response from axios, that we specified in the test and uses that when it runs the          rest of the action creator._


**_moxios syntax_**

- - **_npm i --save-dev moxios_**

- ***Test calls  `moxios.install()`***
   - set moxios as the axios adapter
   - routes axios calls to moxios instead of http

- ***Can pass axios instance to moxios.install()***
   - Use your configured settings and it will make sure that any calls that you make to the instance get routed           to moxios.
   - if you are not using an instance just leave that parameter blank and your axios calls will go to moxios


- ***Then during the test you'll call moxios.wait()***
   - This takes a callback. It watches for Axois calls and then it sends a response using the callback 
                that you specified as the agrgument to the wait() fn.


- ***In moxios.wait() callback***
   - access most recent request.
   - then we'll specify the response using this request.response() method.

        ```
        moxios.wait(() => {
            const request = moxios.request.mostRecent();
            request.responseWith({
                status: 200,
                response: secredWord
            });
        });
        ```
- ***moxios.uninstall()***
   - You can uninstall moxios after each test, as it returns axios to its http state.

### TESTING ASYNC ACTION CREATORS

- Create store using storeFactory().
- Async actions: store.dispatch() returns promise.
- Put tests in .then() callback.
  - tests will run after dispatch completes
  - check state in .then() callback

- If you don't return the startup dispatch promise then the test will complete before the store.dispatch()        
        promise resolves and any errors that occur in the .then() callback will not be part of your test because
        your test will have already completed.

Here, it is so much async -  moxios.wait()  and store.dispatch()

#### Tests can pass even though assertion fails

- test fn starts async call
   - Exits before promise resolves

- assertion runs after promise resolves

`test fn starts ---> async call ---> test fn completes without error ---> promise resolves ---> assertions run`


- the test function is checking when it completes whether or not any errors were thrown.
And if no errors were thrown by the time the test function completes it's going to give you a pass even
if the assertion runs later and throws an error this is why it is so important to make sure that 
you can see your tests fail.


### Test Component Redux Props

Do components have access to 
- the state they need ?
- the action creators they need ?


### Test Action Creator Triggers

- Use mocks to "spy" on action creators
- Are they called when expected ?
   - getSecretWord when App mounts.
   - guessWord when submit is clicked
- Are they called with the right arguments ?
   - Inputbox contents for guessWord

```
wrapper.instance ---> This gives the react component for my wrapper.
wrapper.instance.props ---> This returns the props as an object.
```


### Mock function

- Fake func that runs instead of a real fn.
   - can run alternate code or just act as a placeholder

- Jest replaces real fn with mock.

- Can assert on:
   - how many times mock can ran during tests
   - with what arguments
        

**_Steps:_**

- Create mock fn.
- Replace with mock in wrapper component props.
- trigger mock fn. Example - you need to trigger mock fn when 'componentDidMount' runs.
   - Then simulate 'componentDidMount' and we'll see whether it called our mock function.
- Check to see how many times that mock fn runs.


**_Important_**

- When we'll add a componentDidMount lifecycle method to wrapper component and that componentDidMount is going to run that mock fn, then all of our component tests are going to try and run that whenever we make the shallow wrapper.

- And that's going to be a problem because that fn (which is going to call inside componentDidMount) is going to do that axios call and we certainly don't want that happening every time we create a shallow wrapper for our component.

- So what we want to do before we do any of this is go to our setup tests file which is in the source _`setupTests.js`_

```
Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true 
    //it will disable the lifecycle methods. We only want those to run when we explicitly call the.
});
```


**_test case_**:

```
const getSecretWordMock = jest.fn();
                    // This is a jest function that just will now watch to see when it's called and how
```

- Connect mock fn to the wrapper component as a prop
```const wrapper = shallow(<App getSecretWord={getSecretWordMock} />)```

- Run lifecycle method
```wrapper.instance().componentDidMount();```

- Check if our mock ran
```const getSecretWordCallCount = getSecretWordMock.mock.calls.length;```

we look at its mock property that's telling us about all of the mock functions that happened
and we're going to look at the calls which tells us about every time it was called
`mockFn.mock.calls ---> is an array, if called once then length = 1.`



- Assert
```expect(getSecretWordCallCount).toBe(1);```


**_How to test that the mock fn has been called with correct arguments if any_**

`guessWordMock.mock.calls ---> [ [ 'train' ], [ 'agile' ] ]`

Here mock.calls is an array of arrays.
The element array is an array of the arguments of that mock fn, what mock are called with.
- 'train' is an argument on the first call.
- 'agile' is an argument on the second call.

Mock fn can have multiple arguments. Example -

guessWordMock.mock.calls ---> [ [ 'train', 3 ], [ 'agile', 7 ] ]
- Here, 'train' and '3' are the arguments on the first mock fn call.

### HOOKS AND CONTEXT

##### _Using a Context:_

- Components that use a context need to be wrapped in a provider
- The context value is passed to the provider as a prop
- Provide will update children when children changes
   - Value can be local state for parent component
   - Pattern to embed state into context (custom hook).


### MOCK FUNCTIONS

- In Redux, only spied on mock functions.
- Here, will make some replacement functions.
   - Replacement functions will return values.
- Mocks serve 3 purposes :
   - Keep real fn from running.
      - prevents side defects like network calls.
   - Spy on fn to see when it's called
   - Provide return values.
      - and the returned values can setup test conditions.


### WARNING FOR MOCKS IN JEST

- Reset properties on modules to replace functions with mocks.
- ***No destructuring on imports*** in non-test code.

***Example-1  Mocking useContext will work***

```
import React from 'react';
....
const language = React.useContext(LanguageContext);
```

***Example-2  Mocking useContext will not work***

```
import { useContext } from 'react';
....
const language = useContext(LanguageContext);
```


#### Spy on 'set' method (second element of the returned value from the hook).

*Example - *  lets say you want to spy on ***setCurrentGuess*** fn of:
        ```const [currentGuess, setCurrentGuess] = useState('');```

*test case - *
```
const mockSetCurrentGuess = jest.fn();
React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
```

*Now you can check whether the state has been changed by spying on the mocked setCurrentGuess fn, whether*
*it is called or not*

You can clear the result of mockmockSetCurrentGuess by-
```mockSetCurrentGuess.mockClear();```

#### Mocking an event

```const mockEvent = { target: { value: 'train' } }```


#### Note:

Enzyme Issue - ***https://github.com/airbnb/enzyme/issues/2086***

- ***useEffect*** is not called on ***shallow***.
- ***useEffect*** will only gets called when you are using ***mount***.


### Why not run useState twice ?

- Very difficult to test.
- Need to mock `useState` to setState.
- If it runs twice, test will be brittle.
   - Need to specify order of return value in mock.
   - If order gets changed in the code, tests break (even though code works fine).


### ***useReducer***

- `[state, dispatch] = React.useReducer(reducer, initialState);`
- *dispatch* fn updates state.
   - dispatch(action) ---> reducer(state, action).
   - conventionally, *action* is object with 2 properties: *type* and *payload*.
      - switch on *type*.
      - use *payload* to update state.
      - similar to Redux reducer.
- Allows us to make functions to update a single key.
   - cleaner functions.

#### Test a functionality which is written in *useEffect*

***Case: you need to check some functionality on component update.***

- Will trigger update with Enzyme `setProps()`.
   - there is an `update()` method in Enzyme, but currently *it doesnot trigger `useEffect()` (Enyzme issue)*.



### Course Resources
Course Resources: React Testing with Jest and Enzyme

Note: These are in the order they are presented in the course, with the exception of putting the course repo first.

*GitHub Repository for the course*
https://github.com/flyrightsister/udemy-react-testing-projects

*Creating a React app from scratch*
https://medium.com/@JedaiSaboteur/creating-a-react-app-from-scratch-f3c693b84658

https://jestjs.io/docs/en/webpack.html#handling-static-assets

*Configuring Jest*
https://facebook.github.io/jest/docs/en/configuration.html

*Enzyme shallow wrapper documentation*
http://airbnb.io/enzyme/docs/api/shallow.html

*Enzyme shallow wrapper .find() documentation*
http://airbnb.io/enzyme/docs/api/ShallowWrapper/find.html

*Enzyme shallow wrapper selector documentation*
http://airbnb.io/enzyme/docs/api/selector.html

*Enzyme shallow wrapper state documentation*
http://airbnb.io/enzyme/docs/api/ShallowWrapper/setState.html
http://airbnb.io/enzyme/docs/api/ShallowWrapper/state.html

*Jest expect API*
https://facebook.github.io/jest/docs/en/expect.html

*Bootstrap 4 “get started” docs*
https://getbootstrap.com/docs/4.0/getting-started/introduction/

*Enzyme shallow wrapper .prop() method*
http://airbnb.io/enzyme/docs/api/ShallowWrapper/prop.html

*Kent Dodds Blog Post for Context with Embedded State*
https://kentcdodds.com/blog/application-state-management-with-react


### JSDoc

I mention JSDoc many times during the course; I find it a great way to document JavaScript code. You can find documentation at *http://usejsdoc.org*

Common JSDoc features with React / Redux
These are the JSDoc constructions I use the most with React / Redux:

```
@module: http://usejsdoc.org/tags-module.html
@function: http://usejsdoc.org/tags-function.html
@param: http://usejsdoc.org/tags-param.html
@returns: http://usejsdoc.org/tags-returns.html
classes: http://usejsdoc.org/howto-es2015-classes.html
```

#### Editor Add-Ons

Most code editors have add-ons for JSDoc to make it easier to fill out, and they will create the outline (including parameters) for functions that have already been written. Here are examples for common editors:

***Sublime:*** https://github.com/spadgos/sublime-jsdocs
***Atom:*** https://atom.io/packages/docblockr
***VSCode:*** No plug-in necessary; just type /** on the line above your function and hit TAB; your JSDoc skeleton will appear. (https://code.visualstudio.com/docs/languages/javascript#_jsdoc-support)


### ESLint

It's also helpful to configure your linter to remind you when your JSDoc is invalid, or you've forgotten it entirely. You might look into the valid-jsdoc and require-jsdoc rules for ESLint.