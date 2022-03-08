const express = require('express');
const app = express();

app.get('/', (req, resp) => {
    resp.send('Hello World!')
})

app.listen(8080, () => {
    console.log("demo listening on 8080.")
})