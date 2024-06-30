// frontend/src/App.jsx
import { useEffect, useState } from 'react';
import { getBlocks, addBlock } from './api';
import './App.css'; // Importa el archivo CSS

function App() {
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

  return (
    <div className="App">
      <h1>Blockchain</h1>
      <input
        type="text"
        value={newBlockData}
        onChange={(e) => setNewBlockData(e.target.value)} // Actualizar el estado cuando el usuario escribe
        placeholder="Enter block data" // Texto de marcador de posición
      />
      <button onClick={handleAddBlock}>Add Block</button>
      <div className="container">
        {blocks.map((block, index) => (
          <div className="block" key={index}>
            <p><strong>Hash:</strong> {block.hash}</p>
            <p><strong>Height:</strong> {block.height}</p>
            <p><strong>Data:</strong> {block.body}</p>
            <p><strong>Time:</strong> {block.time}</p>
            <p><strong>Previous Hash:</strong> {block.previousBlockHash}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
