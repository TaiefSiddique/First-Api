const express = require('express');
const cors = require('cors');

require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://first-api:first-api@cluster0.nebbavw.mongodb.net`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        await client.connect();
        const textCollection = client.db('TextDB').collection('Texts');

        app.get('/texts', async (req, res) => {
            const cursor = textCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })


        app.post('/texts', async (req, res) => {
            const newTexts = req.body;
            const result = await textCollection.insertOne(newTexts);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

    } finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Text server is running');
});

app.listen(port, () => {
    console.log(`Text Server is running on port: ${port}`);
});






// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
