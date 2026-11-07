---
title: Nuova Pagina
meta_title: nuova=pagina
description: Descrizione nuova pagina
date: 2026-11-07
image: https://picsum.photos/id/849/1920/1280.webp
draft: false
---

# Bene, anche nella creazione delle pagine posso usare la funzione Focus

### Creo questa pagina solo a scopo di test

## Ora incollo molto testo preso a caso per verificare come viene graficamente.


## **Sveltia CMS** è un Headless CMS open-source basato su **Svelte**, pensato originariamente come un'alternativa moderna, leggera e compatibile a **Decap CMS** (precedentemente noto come Netlify CMS). È progettato specificamente per siti web basati su file (come quelli generati con **Astro, Hugo o Jekyll**), in cui i contenuti sono salvati come file di testo strutturati (Markdown, MDX, JSON o YAML) all'interno di un repository Git.

### 1. Come funziona l'architettura (Git-Based & Jamstack)

A differenza dei CMS tradizionali come WordPress, Sveltia CMS **non richiede un database SQL né un server backend dedicato** per girare.

* **Tutto è Git:** Il CMS gira interamente nel browser dell'utente come un'applicazione a pagina singola (SPA) costruita in Svelte. Quando un utente crea o modifica un articolo tramite l'interfaccia grafica, Sveltia non fa altro che convertire l'input in file di testo e **commitarli direttamente sul repository remoto** (es. GitHub, GitLab o Bitbucket) tramite le API del provider.
* **Zero Costi di Hosting per il Backend:** Essendo un'applicazione client-side che si collega direttamente alle API di Git, può essere ospitata ovunque (Cloudflare Pages, Netlify, Vercel) insieme al sito statico.

***

### 2. Configurazione e Avvio

La configurazione di Sveltia CMS riprende lo standard di Decap CMS, basandosi su un unico file di configurazione principale (`config.yml`).

* In questo file definisci:
* **Il Backend:** Quale servizio Git utilizzare (es. `github`) e il repository di riferimento.
* **Le Collezioni (`collections`):** Come sono strutturati i contenuti (es. articoli del blog, pagine fisse, prodotti). Per ogni collezione specifichi il percorso dei file, il formato (Markdown con frontmatter YAML) e i campi del form.
* L'interfaccia grafica si adatta dinamicamente alla struttura definita in questo file YAML, generando automaticamente i campi di input (campi di testo, editor Markdown, selettori di immagini, date).

***

### 3. Vantaggi principali rispetto ad altre soluzioni

* **Leggerezza e Velocità:** Sfruttando Svelte, l'interfaccia è estremamente reattiva, leggera e priva del bloatware tipico di altri CMS JavaScript più pesanti.
* **Compatibilità nativa con Decap CMS:** Se un progetto usa già la configurazione standard di Decap CMS, Sveltia può spesso sostituirlo all'istante senza dover riscrivere il file `config.yml`.
* **Supporto avanzato per i media:** Gestisce in modo fluido il caricamento e l'archiviazione delle immagini direttamente nel repository o su servizi di storage esterni compatibili.
* **Ottimo per l'editing in mobilità:** L'interfaccia pulita e moderna si adatta molto bene anche all'uso da dispositivi mobili o tablet, rendendolo comodo per modifiche rapide "on the go".
