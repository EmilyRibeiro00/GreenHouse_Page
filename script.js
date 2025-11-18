// ===========================================
// 🌿 GreenHome - Script principal
// ===========================================

let plantas = [];

// Carregar o JSON com as plantas
fetch("plantas.json")
  .then((resp) => resp.json())
  .then((dados) => {
    plantas = dados;
    mostrarPlantas(plantas);
  })
  .catch(() => {
    const lista = document.getElementById("lista-plantas");
    if (lista) {
      lista.innerHTML = "<p>Erro ao carregar as plantas 😢</p>";
    }
  });

// ===========================================
// 🪴 Exibir lista de plantas (grid 4 colunas)
// ===========================================
function mostrarPlantas(lista) {
  const div = document.getElementById("lista-plantas");
  if (!div) return;

  div.innerHTML = "";

  if (!lista || lista.length === 0) {
    div.innerHTML = "<p>Nenhuma planta encontrada.</p>";
    return;
  }

  lista.forEach((planta) => {
    const card = document.createElement("article");
    card.classList.add("produto-card");

    const precoFormatado = planta.preco.toFixed(2).replace(".", ",");

    card.innerHTML = `
      <div class="produto-img-wrapper">
        <img 
          src="${planta.fotoURL}" 
          alt="${planta.nome}" 
          class="produto-img"
        >
      </div>

      <h3 
        class="produto-nome link-nome" 
        onclick="verDetalhes(${planta.id})"
      >
        ${planta.nome}
      </h3>

      <p class="produto-tag">${planta.tipo} • ${planta.tamanho}</p>
      <p class="produto-preco">R$ ${precoFormatado}</p>
      ${
        planta.facilCuidar
          ? '<p class="produto-badge">🌼 Fácil de cuidar</p>'
          : ""
      }
    `;

    div.appendChild(card);
  });
}

// ===========================================
// 🔍 Filtros e Ordenação
// ===========================================
const filtroNome = document.getElementById("filtroNome");
const filtroTipo = document.getElementById("filtroTipo");
const filtroTamanho = document.getElementById("filtroTamanho");
const ordenar = document.getElementById("ordenar");
const limpar = document.getElementById("limpar");

// Só adiciona listeners se os elementos existirem
if (filtroNome) filtroNome.addEventListener("input", filtrar);
if (filtroTipo) filtroTipo.addEventListener("change", filtrar);
if (filtroTamanho) filtroTamanho.addEventListener("change", filtrar);
if (ordenar) ordenar.addEventListener("change", filtrar);
if (limpar) limpar.addEventListener("click", limparFiltros);

function filtrar() {
  let lista = [...plantas];

  const nome = filtroNome ? filtroNome.value.toLowerCase() : "";
  const tipo = filtroTipo ? filtroTipo.value : "";
  const tamanho = filtroTamanho ? filtroTamanho.value : "";
  const ordem = ordenar ? ordenar.value : "";

  if (nome) {
    lista = lista.filter((p) =>
      p.nome.toLowerCase().includes(nome)
    );
  }

  if (tipo) {
    lista = lista.filter((p) => p.tipo === tipo);
  }

  if (tamanho) {
    lista = lista.filter((p) => p.tamanho === tamanho);
  }

  if (ordem === "precoMenor") {
    lista.sort((a, b) => a.preco - b.preco);
  } else if (ordem === "precoMaior") {
    lista.sort((a, b) => b.preco - a.preco);
  } else if (ordem === "facilidade") {
    lista.sort((a, b) => Number(b.facilCuidar) - Number(a.facilCuidar));
  }

  mostrarPlantas(lista);
}

function limparFiltros() {
  if (filtroNome) filtroNome.value = "";
  if (filtroTipo) filtroTipo.value = "";
  if (filtroTamanho) filtroTamanho.value = "";
  if (ordenar) ordenar.value = "";
  mostrarPlantas(plantas);
}

// ===========================================
// 📋 Ver detalhes da planta
// ===========================================
function verDetalhes(id) {
  localStorage.setItem("plantaSelecionada", id);
  window.location.href = "plantaDetalhes.html";
}