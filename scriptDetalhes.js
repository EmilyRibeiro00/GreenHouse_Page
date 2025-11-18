// ===========================================
// 🌿 Detalhes da Planta
// ===========================================

const idSelecionado = localStorage.getItem("plantaSelecionada");

if (!idSelecionado) {
  document.getElementById("detalhes-container").innerHTML =
    "<p>Nenhuma planta selecionada.</p>";
} else {
  fetch("plantas.json")
    .then(resp => resp.json())
    .then(dados => {
      const planta = dados.find(p => p.id == idSelecionado);
      if (!planta) {
        document.getElementById("detalhes-container").innerHTML =
          "<p>Planta não encontrada.</p>";
        return;
      }

      document.getElementById("fotoPlanta").src = planta.fotoURL;
      document.getElementById("nomePlanta").textContent = planta.nome;
      document.getElementById("tipoPlanta").textContent = planta.tipo;
      document.getElementById("tamanhoPlanta").textContent = planta.tamanho;
      document.getElementById("precoPlanta").textContent = planta.preco.toFixed(2);
      document.getElementById("cuidadosPlanta").textContent = planta.cuidados;
      document.getElementById("facilPlanta").textContent = planta.facilCuidar
        ? "🌼 Fácil de cuidar"
        : "🌿 Requer mais atenção";
    })
    .catch(() => {
      document.getElementById("detalhes-container").innerHTML =
        "<p>Erro ao carregar os detalhes da planta.</p>";
    });
}

function voltar() {
  window.location.href = "index.html";
}
