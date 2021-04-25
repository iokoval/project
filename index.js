'use strict';

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    class MyComponentClass extends React.Component {
        render() {
          return <h1>Hello world</h1>;
        }
      }
    ReactDOM.render(
        <MyComponentClass />,
        req.body,
    )
});

app.listen(3000, () => {
    console.log(`App stated`);
})