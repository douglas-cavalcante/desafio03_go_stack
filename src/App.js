import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [title, setTitle] = useState("");
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const repository = {
      title,
      url: "https://github.com/uuidjs/uuid",
      techs: ["javascript", "node"],
    };

    await api
      .post("repositories", repository)
      .then((response) => setRepositories([...repositories, response.data]));
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newRepositories = repositories.filter(
      (repository) => repository.id !== id
    );

    setRepositories(newRepositories);
  }

  useEffect(() => {
    api.get("repositories").then((response) => setRepositories(response.data));
  }, []);

  return (
    <div>
      <form onSubmit={handleAddRepository}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>

      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
