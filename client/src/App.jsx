import { useEffect, useState } from 'react';
import { getBlocks, addBlock } from './api';
import './App.css'; // Importa el archivo CSS
import { Container, TextField, Button, Typography, Grid } from '@mui/material';

export default function App() {
  const [blocks, setBlocks] = useState([]);
  const [newBlockData, setNewBlockData] = useState('');

  // Función para obtener los bloques cuando el componente se monta
  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    const blocks = await getBlocks();
    setBlocks(blocks);
  };

  // Función para manejar la adición de un nuevo bloque
  const handleAddBlock = async () => {
    await addBlock(newBlockData);
    setNewBlockData(''); // Limpiar el campo de entrada después de añadir el bloque
    fetchBlocks(); // Actualizar la lista de bloques
  };

  // Función para truncar el hash
  const truncateHash = (hash) => {
    if (!hash) return '...';
    return `...${hash.slice(-10)}`;
  };

  return (
    <Container className="App">
      <Typography variant="h3" component="h1" gutterBottom color="primary" align="center">
        Blockchain
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <TextField
            label="Enter block data"
            variant="outlined"
            value={newBlockData}
            onChange={(e) => setNewBlockData(e.target.value)}
            InputLabelProps={{ style: { color: '#39ff14' } }} // Cambiar color del texto del marcador de posición
            InputProps={{
              style: { color: '#39ff14', borderColor: '#39ff14' },
            }}
          />
        </Grid>
        <Grid item
          marginBottom={6}
        >
          <Button variant="contained" color="primary" onClick={handleAddBlock}>
            Add Block
          </Button>
        </Grid>
      </Grid>
      <div className="container">
        {blocks.map((block, index) => (
          <div className="block" key={index}>
            <div className="block-content">
              <Typography variant="body1"><strong>Hash:</strong> {truncateHash(block.hash)}</Typography>
              <p><strong>Height:</strong> {block.height}</p>
              <p><strong>Data:</strong> {index === 0 ? "Genesis Block" : block.body}</p> {/* Mostrar "Genesis Block" para el primer bloque */}
              <p><strong>Time:</strong> {block.time}</p>
              <p><strong>Previous Hash:</strong> {truncateHash(block.previousBlockHash)}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
