import 'dotenv/config'

const {
    MONGO_URI,
    MONGO_URI_TEST,
    NODE_ENV
} = process.env

//use if the database is located on a cloud server
export const MONGO_URL = NODE_ENV === 'test'
    ? MONGO_URI_TEST
    : MONGO_URI

export const MONGO_OPTIONS = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}

