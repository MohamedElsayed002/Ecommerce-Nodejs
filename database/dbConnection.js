
import mongoose from 'mongoose'





export function dbConnection () {
    mongoose.connect(process.env.CONNECTION)
        .then(() => console.log('Connected to database'))
        .catch((error) => console.log(error))
}