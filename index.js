require('dotenv').config() //importação do module dotenv
const express = require('express') //importacao do express
const { MongoClient, ObjectId } = require('mongodb') //importacao do mongoclient
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
    
} catch (error) {
    console.log(`erro na conexao ao DB: ${error.message}`);
}

const db = client.db(dbName)
const collection = db.collection('eventos')

//implementação dos endpoints
//endpoint POST/eventos
app.post('/eventos', async (req,res)=>{
   const evento = req.body
    await collection.insertOne(evento)
    res.send('evento cadastrado com sucesso')
})

//endpoint GET/all
app.get('/eventos', async (req,res)=>{
    const eventos = await collection.find().toArray()
    res.send(eventos)
})

//endpoint GET/id
app.get('/eventos/:id', async (req,res)=>{
    const id = req.params.id
    const evento = await collection.findOne({_id: new ObjectId(id)})
    res.send(evento)
})

//endpoint PUT/id
app.put('/eventos/:id', async (req,res)=>{
    const id = req.params.id
    const novoEvento = req.body
    const evento = await collection.findOne({_id: new ObjectId(id)})
    
    if(!evento){
        return res.send('erro ao buscar evento')}
    if(!novoEvento.nome || !novoEvento.data || !novoEvento.local){
        return res.send('corpo da requisição inválido')    }

    await collection.updateOne({_id: new ObjectId(id)}, {$set: novoEvento})
    res.send('evento atualizado com sucesso')
})




app.listen(3000) //configura o app para o listen na porta 3000
}
main()


