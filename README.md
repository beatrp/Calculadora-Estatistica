https://drive.google.com/drive/folders/1rQc0rlq-yRigfmrFYsx6JvYJ6flRw-MA

# Calculadora Estatistica - Grupo X v1.0

Aplicacao full stack com frontend em React e backend em Spring Boot para calcular estatisticas descritivas a partir de uma lista de numeros.

## Estrutura do projeto

```text
/backend
  pom.xml
  /src/main/java/com/grupox/calculadora
    CalculadoraEstatisticaApplication.java
    /controller
    /service
    /model
    /exception
  /src/main/resources
    application.properties

/frontend
  package.json
  vite.config.js
  index.html
  /src
    main.jsx
    App.jsx
    /components
    /pages
    /services
    /styles
```

## Funcionalidades

- Entrada de numeros separados por virgula
- Calculo de media, mediana, moda multipla, amplitude e desvio padrao populacional
- Geracao de tabela de frequencias
- Validacao de entrada no frontend e backend
- Tratamento padronizado de erros na API
- Interface responsiva e simples de usar

## Backend

### Requisitos

- Java 17+
- Maven 3.9+

### Como executar

```bash
cd backend
mvn spring-boot:run
```

A API ficara disponivel em `http://localhost:8080`.

### Endpoint principal

`POST /api/stats`

Payload:

```json
{
  "data": [2.5, 3.0, 1.5]
}
```

Resposta:

```json
{
  "mean": 2.3333333333,
  "median": 2.5,
  "mode": [1.5, 2.5, 3.0],
  "amplitude": 1.5,
  "stdDev": 0.6236095645,
  "frequency": [
    { "value": 1.5, "count": 1 },
    { "value": 2.5, "count": 1 },
    { "value": 3.0, "count": 1 }
  ]
}
```

## Frontend

### Requisitos

- Node.js 20+
- npm 10+

### Como executar

```bash
cd frontend
npm install
npm run dev
```

O frontend sera servido em `http://localhost:5173`.

## Integracao

Por padrao, o Vite esta configurado para encaminhar chamadas `/api` para `http://localhost:8080` durante o desenvolvimento.

## Passo a passo rapido

1. Inicie o backend em `http://localhost:8080`
2. Inicie o frontend em `http://localhost:5173`
3. Informe uma lista como `10, 12, 12, 18, 20`
4. Clique em `Calcular`
