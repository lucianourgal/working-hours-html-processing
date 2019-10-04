import React from 'react';
import { completeHtml } from './textProcessor';

const taStyle = {
  width: '100%'
}

const App = () =>  {

    const [html, setHtml] = React.useState("HTML da tabela aqui");
    const processText = () => {
      setHtml(completeHtml(html));
    }

      return <div className="App">
      <header className="App-header">
        <h2>
          Ferramenta para calcular quantidades de horas no HTML da ficha ponto do SEI IFPR
        </h2>
        <p>Desenvolvido por Luciano Urgal Pando</p>
      </header>
      <div style={{textAlign: 'center'}}>
        <textarea rows="25" cols="150" value={html} onChange={(event) => setHtml(event.target.value)} style={taStyle}/>
        <button onClick={processText}>Completar folha ponto</button>
      </div>
    </div>

}



export default App;
