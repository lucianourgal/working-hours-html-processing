import React from 'react';
import { completeHtml, textProcessingReport } from './textProcessor';
import { exampleText } from './example'
import copy from 'copy-to-clipboard';
import './App.css'


const taStyle = {
  width: '100%'
}

const ButtonStyle = {

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
          Ferramenta para calcular quantidades de horas no HTML da <b>folha ponto</b> do SEI IFPR
        </h2>
      </header>
      <div style={{textAlign: 'center'}} id="mainDiv">
        <section>
          <p>Insira o código HTML da tabela abaixo</p>
          <textarea rows="12" cols="150" value={html} onChange={textAreaOnChange} className='mainTextArea'/>
        </section>
        <section>
            <button onClick={setDefaultHtml}>Usar código exemplo</button>
            <button onClick={processText}>{completeCodeButtonName}</button>
            <button onClick={copyText}>{copyHtmlButtonName}</button>
        </section>
        <section>
          <h4>Relatório</h4>
          <textarea disabled rows="8" cols="100" value={report} onChange={textAreaOnChange} className='reportArea'/>
          { readyHtml ?  <h4>Resultado atual</h4> : null }
          <div dangerouslySetInnerHTML={{ __html: readyHtml }}  />
        </section>
      </div>
    
      <footer><span>Desenvolvido por Luciano Urgal Pando utilizando React.js</span></footer>
    </div>

}



export default App;
