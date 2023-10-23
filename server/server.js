// const express = require('express');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.static('../client/dist'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// require('./routes/htmlRoutes')(app);

// app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));


const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Define the absolute path to your static files
const staticPath = path.join(__dirname, '../client/dist');

app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
