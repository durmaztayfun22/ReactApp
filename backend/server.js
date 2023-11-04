import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Blog from './models/blog.js';// Modelin yolunu düzelttim

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 5050;

const dbURI = 'mongodb+srv://tayfunDurmaz:t1234@todoapp.pqvymtb.mongodb.net/todoApp?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('Veritabanına bağlanıldı');
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/api/veri', async (req, res) => { 
  const veri = await Blog.find().sort({ createdAt: -1 })
  console.log(typeof(veri))

  res.json(veri)
    
});

app.post('/', async (req, res) => {
  try {
    const newBlog = new Blog({
      body: req.body.isim,
      // Diğer alanları ekleyin
    });

    const result = await newBlog.save();
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Veri kaydedilemedi.' });
  }
});

app.delete('/api/veri/:id', (req, res) => { // Rota düzeltildi
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`Sunucu dinleniyor: ${port}`);
});
