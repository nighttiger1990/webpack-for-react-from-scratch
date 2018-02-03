# Tutorial: How to set up React, Webpack 3, and Babel, in 2017
React is mostly used for creating Single Page Applications. But it’s possible to integrate the library into any website by using Webpack and Babel.

Most beginners don’t know how to glue React and Webpack together so here is a short tutorial for you.

## Table of Contents
1. How to set up React, Webpack, and Babel: what you will learn
2. How to set up React, Webpack, and Babel: setting up the project
3. How to set up React, Webpack, and Babel: setting up Webpack
4. How to set up React, Webpack, and Babel: setting up Babel
5. How to set up React, Webpack, and Babel: writing React components
6. How to set up React, Webpack, and Babel: the HTML webpack plugin
7. How to set up React, Webpack, and Babel: Webpack Dev Server
8. How to set up React, Webpack, and Babel: wrapping up

## 1. How to set up React, Webpack, and Babel: what you will learn

- how to install and configure Webpack
- how to install and configure Babel
- how to install React
- how to create two React components by following the Container / - Presentational principle
- how to include the resulting bundle into an HTML page
- how to install and configure Webpack Dev Server

`React` is not limited to full blown SPA. It’s possible to integrate the library into any existing website.

React can be pulled in either with a CDN or with a module bundler.

For most of my projects I use Webpack so combining React and Webpack has been a matter of minutes.

The following article was born as a guide for myself. I hope it’ll be useful for you too!

## 2. How to set up React, Webpack, and Babel: setting up the project

Start off by creating a directory for the project:

```
mkdir webpack-react-tutorial && cd webpack-react-tutorial
```

Create a minimal directory structure for holding the code:

```
mkdir -p src/js
```

Inizialize the project by running:

```
npm init -y
```

and you’re good to go.

## 3. How to set up `React`, `Webpack`, and `Babel`: setting up Webpack

`Webpack` is one of the pillars of modern Web Development. It’s an incredibly powerful tool even if some people hate it.

There are alternatives: Brunch is one of the contenders. Either way knowing how to use Webpack is fundamental for working with React.

Webpack will ingest my raw React components for producing Javascript code that (almost) every browser can understand.

Let’s install it by running:

```
npm i webpack --save-dev
```

Now add the webpackcommand inside package.json:
```json
"scripts": {
  "build": "webpack"
}
```
Whenever you run webpack it will automatically look for a configuration file. Create a new file named `webpack.config.js` inside the project folder:

```
touch webpack.config.js
```

Right now the file is empty but we will add a meaningful configuration in the next section.

## 4. How to set up React, Webpack, and Babel: setting up Babel

`React components` are mostly written in `Javascript ES6`.

Since the browser can’t understand React components as they come there is the need for some kind of transformation.

Webpack doesn’t know how to make the transformation but it has this concept of `loaders`: think of them as of transformers.

A `Webpack loader` takes something as the input and produces something else as the output.

`babel-loader` is the Webpack loader responsible for taking in the ES6 code and making it understandable by the browser of choice.

Obsviusly `babel-loader` makes use of Babel. And Babel must be configured to use a bunch of presets:

1. `babel-preset-env` for compiling Javascript ES6 code down to ES5 (please note that `babel-preset-es2015` is now `deprecated`. Note: <a href="https://babeljs.io/docs/plugins/transform-class-properties/">**babel-plugin-transform-class-properties**</a> is This plugin `transforms es2015 static class properties` as well as properties declared with the `es2016 property initializer syntax`.)
2. `babel-preset-react` for compiling JSX and other stuff down to Javascript

Let’s pull in the dependencies with:

```
npm i babel-loader babel-core babel-preset-env babel-preset-react babel-plugin-transform-class-properties --save-dev
```

Don’t forget to configure Babel! Create a new file named .babelrcinside the project folder:

```
{
  "presets": ["env", "react"]
}
```

At this point we’re ready to define a minimal Webpack configuration.

Open up `webpack.config.js` and fill it like the following:

```javascript
const path = require("path");
module.exports = {
  entry: ["./src/js/app.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
          options: {
            // presets: ['@babel/preset-env'],
            plugins: ['transform-class-properties']
          }
        }
      }
    ]
  }
};
```

The above configuration is quite simple.

It takes `./src/js/app.js` as the entry point to produce an ouput into `./dist/js/main.js`

Plus, for every file with a `.js` or `.jsx` extension Webpack pipes the code through `babel-loader` for transforming ES6 down to ES5.

**NOTE:** If you’re completely new to Webpack I suggest taking this short introduction: <a href="https://webpack.academy/p/the-core-concepts" title="Title">***webpack core concepts by Sean Larkin***</a>. Then come back here.

With this in place we’re ready to write our React components. We’ll see how in the next section.

## 5. How to set up React, Webpack, and Babel: writing React components

I like writing my React components by following the `Container / Presentational` principle.

I suggest taking a look at <a href="https://medium.com/@learnreact/container-components-c0e67432e005" title="Title">***container components***</a> and <a href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0" title="Title">***smart and dumb components***</a> by Dan Abramov for learning more.

In brief, the Container / Presentational principle is a pattern for React components.

The `container component` is the one that carries all the logic: `functions for handling state changes`, internal `component state` and so on.

In contrast a `presentational component` is merely used for `displaying` the desired markup. Presentational components are usually `plain arrow functions` and receive data from the container component as `props`.

You’ll see how they look like in the following example.

For this post’s scope I’d like to build a super simple React `form` with a single `text input`.

Before touching any code let’s pull in React by running:

```
npm i react react-dom --save-dev
```

Then create a minimal directory structure for organizing the components:

```
mkdir -p src/js/components/{container,presentational}
```

Next up let’s create a container component that:

- has its own state
- renders an HTML form

Create the component into src/js/components/container/:

```
touch src/js/components/container/FormContainer.js
```

The component will look like the following:

```javascript
import React, { Component } from "react";
import ReactDOM from "react-dom";
class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }
  render() {
    return (
      <form id="article-form">
      </form>
    );
  }
}
export default FormContainer;
```

The component does nothing at this moment. It’s just a skeleton for wrapping up child components.

In fact a container component without its presentational child is almost useless.

Let’s fix that.

Create a new component inside `src/js/components/presentational/`:

```
touch src/js/components/presentational/Input.js
```

Our first presentational React component will be a text input. We know that an HTML input takes the following attributes:

- type
- class
- id
- value
- required

All of these will become `props that the container component will pass down to its presentational child`.

Since the input holds its own state we must be sure that React will take care of it. An HTML input becomes a controlled component in React.

Speaking of props, it is good practice to document your React components with Prop Types.

Install the package by running:

```
npm i prop-types --save-dev
```

Back to React, our presentational component for an HTML input will look like the following:

``` javascript
import React from "react";
import PropTypes from "prop-types";

const Input = ({ label, text, type, id, value, handleChange }) => (
  <div className="form-group">
    <label htmlFor={label}>{text}</label>
    <input
      type={type}
      className="form-control"
      id={id}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Input;
```

At this point we’re ready to update our container component to include the text input:

``` javascript
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input";

class FormContainer extends Component {
  constructor() {
    super();

    this.state = {
      seo_title: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    const { seo_title } = this.state;
    return (
      <form id="article-form">
        <Input
          text="SEO title"
          label="seo_title"
          type="text"
          id="seo_title"
          value={seo_title}
          handleChange={this.handleChange}
        />
      </form>
    );
  }
}

export default FormContainer;
```

Time to wire things up.

Webpack expects the entry point to be `./src/js/app.js`

Create `./src/js/app.js` and place an import directive into it for requiring the container component:

```
import FormContainer from "./components/container/FormContainer";
```

With this in place we’re ready to create our bundle by running:

```
npm run build
```

Give Webpack a second:

<img src='https://www.valentinog.com/blog/wp-content/uploads/2017/12/react-webpack-bundle.png'>

and see the bundle come to life!

The bundle will be placed into

```
./dist/js/main.js
```

Please be aware the resulting bundle is `not suitable for production`! It requires some more steps before being pushed to production: check out Optimizing Performance.

In the meantime we can see `how the application looks like by including the bundle into an HTML page`.

## 6. How to set up React, Webpack, and Babel: the HTML webpack plugin

To display our React form we must tell Webpack to produce an HTML page. The resulting bundle will be placed inside a <script></script>tag.

Webpacks needs two additional components for processing HTML: `html-webpack-plugin` and `html-loader`.

Add the dependencies with:

```
npm i html-webpack-plugin html-loader --save-dev
```

Then update the Webpack configuration:

``` javascript
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./src/js/app.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // presets: ['@babel/preset-env'],
            plugins: ['transform-class-properties']
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
```


Next up create an HTML file into `./src/index.html` (feel free to use whichever CSS library you like):

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" >
    <title>How to set up React, Webpack, and Babel</title>
</head>

<body>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-4 offset-md-1">
                <p>Create a new article</p>
                <div id="create-article-form">
                    <!-- form -->
                </div>

            </div>

        </div>
    </div>
</body>

</html>
```

One last thing is missing! We must tell our React component to hook itself into ``` <div id="create-article-form"></div>.```

Open up `./src/js/components/container/FormContainer.js` and add the following at the `bottom` of the file:

```javascript
const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;
```

Close and save the file.

Now run the build again with:

```
npm run build
```

and take a look at the `./dist` folder. You should see the resulting HTML.

With Webpack there’s no need to include your Javascript inside the HTML file: the bundle will be automatically injected into the page.

Open up `./dist/index.html` in your browser: you should see the React form.

## 7. How to set up React, Webpack, and Babel: Webpack Dev Server

You don’t want to type `npm run build` every time you change a file.

It takes only 3 lines of configuration to have a `development server` up and running.

Once configured Webpack will launch your application inside a browser.

Also, every time you save a file after a modification Webpack Dev Server will automagically refresh the browser’s window.

To set up Webpack Dev Server install the package with:

```
npm i webpack-dev-server --save-dev
```

Configure the server by adding the following lines inside `webpack.config.js` (the snippet can be placed right after the output section):

```
devServer: {
  contentBase: "./dist",
  port: 8888
}
```

Save the file and close it.

Open up `package.json` to add the start script:

```
"scripts": {
  "start": "webpack-dev-server --open",
  "build": "webpack"
}
```

save and close the file.

Now, by running:

```
npm start
```

you should see Webpack launching your application inside the browser.

<img src="https://www.valentinog.com/blog/wp-content/uploads/2017/12/react-webpack-babel-webpack-dev-server.png">

Webpack Dev Server will automagically refresh the window upon every modification to a file!

## 8. How to set up React, Webpack, and Babel: wrapping up

React is mostly used for creating Single Page Applications. But it can also fit into any website.

By combining Webpack and Babel it is possible to transform a bunch of React components into a bundle suitable for being distributed.

In the above guide we’ve seen:

- how to install and configure Webpack
- how to install and configure Babel
- how to install React
- how to create two React components by following the Container / Presentational principle
- how to include the resulting bundle into an HTML page
- how to install and configure Webpack Dev Server
By the end you should be able to start from scratch with React, Webpack and Babel.

Stay tuned on this blog for more about React.

Go build <a href="https://www.valentinog.com/blog/socket-io-node-js-react/">nice things with React!</a>


Source: https://www.valentinog.com/blog/react-webpack-babel/#How_to_set_up_React_Webpack_and_Babel_wrapping_up