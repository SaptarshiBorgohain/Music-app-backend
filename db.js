const mongoose = require('mongoose');

module.exports = async() => {
      const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
      }
      try{
            await mongoose.connect(process.env.DB, connectionParams);
            console.log('Connected to DB');
      }catch(error){
            console.log('Error connecting to DB');
      }
}