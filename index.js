require('dotenv').config() //importação do module dotenv
const express = require('express') //importacao do express
const { MongoClient } = require('mongodb') //importacao do mongoclient
const app = express() //instancia o aplicativo express na variável app
app.use(express.json()) // parse de json para objeto javascript

//variaveis de conexao ao mongodb
const dbUrl = process.env.DATABASE_URL
const dbName = process.env.DATABASE_NAME

const client = new MongoClient(dbUrl) //instancia o mongoclient passando a url de conexao dburl


async function main(){

try {
    console.log('conectando ao DB');
    await client.connect()
    console.log('conectado ao DB');
    const db = client.db(dbName)
    const collection = db.collection('eventos')
} catch (error) {
    console.log(`erro na conexao ao DB: ${error.message}`);
}


}
main()


app.listen(3000) //configura o app para o listen na porta 3000