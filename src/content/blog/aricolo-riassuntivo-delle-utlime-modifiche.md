---
title: Aricolo riassuntivo delle utlime modifiche
description: Cerco di tenere traccia dei progressi e delle difficoltà
date: 2026-11-03
image: /images/road-1072821_1280.jpg
author: Leonardo
categories:
  - Log Sito
tags:
  - Log
  - Sito
  - Astro
  - Sveltia
  - Mio primo tag
draft: false
---

## Riassunto della situazione, cosa resta da fare:

La prima cosa che noto è che se scivo e faccio errori di battitura non vengono segnalati. Questa è una funzione che normalmente nel mio browser è attiva ma in queste aree testo non funziona. Sarebbe molto utile se fosse possibile attivarla senza dover stravolgere tutto.

Se provo a creare un link e uso la funzione crea nuovo post o nuova pagina in entrambi i casi ottengo l'errore "0 modifiche". È una funzione che non mi interessa e che può essere rimossa dall'interfaccia di creazione link. Nella stessa interfaccia per scegliere a quale pagina o post già esistente preferisco sempre usare il menú a discesa.

Sempre nel selettore tra post pagine o link esterno sarebbe utile che una opzione escludesse automaticamente le altre (un solo link non può puntare a tre fonti diverse).

La funzione per inserire il codice è molto bella e funzione con tanti linguaggi.
Mentre il testo che risulata dalla pressione del tatso <> ha lo stesso provlema di prima:
Appare bianco e preceduto e seguito da \`
\`Questo invece è il codice che si ottiene se uso <>\` 



```plain
Questa è una prova di codice usando il "blocco di codice standard"
```

`Questo invece è il codice che si ottiene se uso <>`

***

<a href="/pagina-di-prova" data-internal-link>Pagina Creata da link a nuova pagina</a>

```html
<ul>
  <li class="nav-item">
    <a class="nav-link" href="/">Home</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="about/">About</a>
  </li>
</ul>
```

```css
img {
  vertical-align: middle;
  border: 0;
  max-width: 100%;
  height: auto;
}
```

```javascript
window.addEventListener("load", (e) => {
  document.querySelector(".preloader").style.display = "none";
});
```
