
// Função para carregar as tarefas do backend
async function carregarTarefas() {
  try {
    const resposta = await fetch("http://localhost:3000/tarefas");
    const tarefas = await resposta.json();
    atualizarTabela(tarefas);
  } catch (erro) {
    console.error("Erro ao carregar tarefas:", erro);
  }
}

// Função para atualizar a tabela no HTML
function atualizarTabela(tarefas) {
  const tbody = document.querySelector("#tabela-tarefas tbody");
  tbody.innerHTML = "";

  tarefas.forEach((tarefa) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${tarefa.titulo}</td>
      <td>${tarefa.responsavel}</td>
      <td>${tarefa.status}</td>
      <td>
        <button onclick="alterarStatus(${tarefa.id})">Alterar Status</button>
        <button onclick="removerTarefa(${tarefa.id})">Remover</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  atualizarResumo(tarefas);
}

// Função para atualizar o resumo de status
function atualizarResumo(tarefas) {
  const contagem = { "Pendente": 0, "Em Andamento": 0, "Concluída": 0 };
  tarefas.forEach(t => contagem[t.status]++);
  document.getElementById("resumo-status").textContent =
    `Pendente: ${contagem["Pendente"]} | Em Andamento: ${contagem["Em Andamento"]} | Concluída: ${contagem["Concluída"]}`;
}

// Evento de envio do formulário
document.getElementById("tarefa-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const responsavel = document.getElementById("responsavel").value;

  try {
    const resposta = await fetch("http://localhost:3000/tarefas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, descricao, responsavel })
    });

    if (!resposta.ok) throw new Error("Erro ao cadastrar tarefa.");

    e.target.reset();
    carregarTarefas(); // Recarrega a tabela
  } catch (erro) {
    alert("Erro: " + erro.message);
  }
});

// Função para alterar o status da tarefa
async function alterarStatus(id) {
  try {
    await fetch(`http://localhost:3000/tarefas/${id}/status`, {
      method: "PATCH"
    });
    carregarTarefas();
  } catch (erro) {
    console.error("Erro ao alterar status:", erro);
  }
}

// Função para remover uma tarefa
async function removerTarefa(id) {
  try {
    await fetch(`http://localhost:3000/tarefas/${id}`, {
      method: "DELETE"
    });
    carregarTarefas();
  } catch (erro) {
    console.error("Erro ao remover tarefa:", erro);
  }
}

// Inicializa a aplicação
carregarTarefas();
