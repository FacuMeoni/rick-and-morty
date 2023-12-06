const app = require('./src/app');
const { conn } = require('./src/db');
const { saveCharactersOnDb } = require('./src/Controllers/SaveCharactersOnDb');

app.listen(3001, async () => {
    try {
        saveCharactersOnDb();
        await conn.sync({force: false})
        console.log('Listening on 3001')
    } catch (error) {
        console.log(error.message)
    }
})