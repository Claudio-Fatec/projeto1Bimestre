# 📱 ProjetoDSM4 — App React Native (Expo)

Aplicação desenvolvida em **React Native com Expo** que implementa:

- Tela de **Login**
- Tela de **Cadastro de Usuário** (com persistência local usando AsyncStorage)
- Tela de **Cards** (consumo da API da Marvel, exibindo personagens com opção de adicionar, excluir e ver detalhes)
- Tela de **Detalhes** (mostra informações adicionais de cada personagem)

---

## 🚀 Funcionalidades

### 🔑 **Login**
- Campos: Usuário, Senha  
- Botões:  
  - **Entrar** → vai para a tela de Cards  
  - **Cadastrar Usuário** → abre a tela de Cadastro  
  - **Ver Usuários** → abre a tela com todos os usuários salvos  

---

### 📝 **Cadastro de Usuário**
- Campos: Nome, Telefone, CPF, E-mail, Curso, Senha  
- Botão **Salvar** → armazena o usuário localmente (AsyncStorage)  
- Suporta **múltiplos usuários**  

---

### 🃏 **Cards**
- Busca personagens da **Marvel API**  
- Exibe: imagem, nome e descrição resumida  
- Botões:  
  - **ADD** → adiciona novos cards (carrega mais personagens)  
  - **Excluir** → remove o card da lista  
  - **Ver Mais Detalhes** → abre a tela de detalhes  
  - **Voltar para Login** (logout)  

---

### 📖 **Detalhes**
- Exibe informações completas do personagem selecionado  
- Mostra imagem, nome, descrição e estatísticas de comics, séries e histórias  
- Botão **Voltar para Login**  

---

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)  
- [Expo](https://expo.dev/)  
- [React Navigation](https://reactnavigation.org/)  
- [Axios](https://axios-http.com/)  
- [CryptoJS](https://www.npmjs.com/package/crypto-js)  
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)  

---

## 🔗 API Utilizada — Marvel Developer API

- Endpoint base: `https://gateway.marvel.com/v1/public`  
- Autenticação necessária:  
  - `ts` → timestamp  
  - `apikey` → sua Public Key  
  - `hash` → MD5(`ts + privateKey + publicKey`)  

Documentação oficial: [https://developer.marvel.com](https://developer.marvel.com)

---

## 📂 Estrutura do Projeto

```
src/
 ├─ routes/
 │   └─ index.js         # Configuração das rotas
 ├─ screens/
 │   ├─ Login.js         # Tela de Login
 │   ├─ Register.js      # Tela de Cadastro
 │   ├─ Cards.js         # Tela de Cards
 │   ├─ Details.js       # Tela de Detalhes
 │   └─ Users.js         # Tela de listagem de usuários
 └─ services/
     └─ marvel.js        # Comunicação com a API Marvel
```
