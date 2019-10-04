import React from 'react';

const App = () =>  <div className="App">
      <header className="App-header">
        <h2>
          Ferramenta para calcular quantidades de horas no HTML da ficha ponto do SEI IFPR
        </h2>
        <p>Desenvolvido por Luciano Urgal Pando</p>
      </header>
      <body>
        <textarea rows="10" cols="150" id='ta'/>
        <button onClick={processText}>Completar folha ponto</button>
      </body>
    </div>

const processText = () => {

}

export default App;
