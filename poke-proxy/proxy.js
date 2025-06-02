const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.get('/pokeapi/*', async (req, res) => {
  const path = req.params[0];
  try {
    const response = await axios.get(`https://pokeapi.co/${path}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur avec la PokeAPI' });
  }
});

app.use('/pokeapi', async (req, res) => {
  const path = req.url.replace('/', '');
  try {
    const response = await axios.get(`https://pokeapi.co/${path}`);
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Erreur avec la PokeAPI' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy opérationnel ici : http://localhost:${PORT}`);
});