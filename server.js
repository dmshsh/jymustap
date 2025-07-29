const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.txt');

app.use(express.json());
app.use(express.static('.'));

app.put('/names/:name/:id/', async (req, res) => {
  const { id, name } = req.params;
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const updatedLines = data.split(/\r?\n/);
    
    for (let i = 0; i < updatedLines.length; i++) {
      if (updatedLines[i].trim() === '') continue;
      const match = updatedLines[i].match(/^(\d+)\)\s*(.+)$/);
      if (match && match[1] === id) {
        updatedLines[i] = `${id}) ${name}`;
        break;
      }
    }
    
    await fs.writeFile(DATA_FILE, updatedLines.join('\n'), 'utf-8');

    const items = updatedLines
      .filter(line => line.trim() !== '')
      .map(line => {
        const match = line.match(/^(\d+)\)\s*(.+)$/);
        return {
          id: Number(match[1]),
          name: match[2]
        };
      });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});