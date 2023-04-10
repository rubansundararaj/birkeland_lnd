

const mongoose = require('mongoose');
const mongoatlasUrl = "mongodb://localhost:27017/birkeland_lnd_events";
mongoose.connect(mongoatlasUrl, {
useNewUrlParser: true,
useUnifiedTopology: true,
retryWrites: false
})
.then(() => console.log('Connection to MongoDB Success'))
.catch((err) => console.error(err));


