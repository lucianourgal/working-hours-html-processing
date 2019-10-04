import React from 'react';
import { completeHtml, textProcessingReport } from './textProcessor';
import { exampleText } from './example'
import copy from 'copy-to-clipboard';

const taStyle = {
  width: '100%'
}

export const copyHtmlButtonName = 'Copiar HTML completado';

const App = () =>  {

    const completeCodeButtonName = 'Completar Folha Ponto'
    const [html, setHtml] = React.useState('');
    const [readyHtml, setReadyHtml] = React.useState('');
    const [report, setReport] = React.useState('')

    const processText = () => {
      const ready = completeHtml(html);
      setHtml(ready);
      setReadyHtml(ready);
      setReport(textProcessingReport);
    }
    const textAreaOnChange = (event) => {
      setHtml(event.target.value);
    }
    const setDefaultHtml = () => {
      setHtml(exampleText);
      setReport('Código HTML de exemplo inserido na área de texto.\n'+
      'Experimente clicar no botao <<'+ completeCodeButtonName + '>> para ver o resultado.')
    }
    const copyText = () => {
      copy(readyHtml)
      setReport('Código HTML copiado para a área de transferência!\n'+
      'Agora é só colar no campo correspondente do SEI.')
    }
    
      return <div className="App">
      <header className="App-header" style={{textAlign: 'center'}}>
        <h2>
          Ferramenta para calcular quantidades de horas no HTML da ficha ponto do SEI IFPR
        </h2>
      </header>
      <div style={{textAlign: 'center'}}>
        <p>Insira o código HTML da tabela abaixo</p>
        <textarea rows="15" cols="150" value={html} onChange={textAreaOnChange} style={taStyle}/>
        <button onClick={setDefaultHtml}>Usar código exemplo</button>
        <button onClick={processText}>{completeCodeButtonName}</button>
        <button onClick={copyText}>{copyHtmlButtonName}</button>
        <h4>Relatório</h4>
        <textarea disabled rows="8" cols="100" value={report} onChange={textAreaOnChange} style={taStyle}/>
        { readyHtml ?  <h4>Resultado atual</h4> : null }
        <div dangerouslySetInnerHTML={{ __html: readyHtml }}  />
      </div>
    
      <footer style={{textAlign: 'right', verticalAlign: 'bottom'}}>Desenvolvido por Luciano Urgal Pando utilizando React.js</footer>
    </div>

}



export default App;
