import React from 'react';
import { completeHtml, textProcessingReport } from './textProcessor';
import { exampleText } from './example'
import copy from 'copy-to-clipboard';
import './App.css'

export const copyHtmlButtonName = 'Copiar HTML completado';
export const useExampleButtonName = 'Inserir HTML exemplo'

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
      if(readyHtml) { 
        copy(readyHtml)
        setReport('Código HTML copiado para a área de transferência!\n'+
        'Agora basta colar o código da tabela na área correspondente do SEI.')
      } else {
        setReport('Não há código HTML pronto para ser copiado.\n'+
        'Insira código HTML para processar, em seguida clique no botão <<'+completeCodeButtonName+'>>.')
      }
    }
    
      return <div className="App">
      <header>
        <h2> Ferramenta para calcular quantidades de horas no HTML da Folha Ponto do SEI IFPR </h2>
      </header>
      <div style={{textAlign: 'center'}} id="mainDiv">
        <section>
          <p>Insira o código HTML da tabela de registro de frequência abaixo <a href='https://docs.google.com/document/d/1x0Sp4mlzEPA3NlKu3XP15NljrMgiLcZA8vqhtlXgHTQ/edit?usp=sharing' target="_blank" rel="noopener">(Instruções detalhadas)</a></p>
          <textarea rows="12" cols="150" value={html} onChange={textAreaOnChange} className='mainTextArea'/>
        </section>
        <section>
            <button onClick={setDefaultHtml}>{useExampleButtonName}</button>
            <button onClick={processText}>{completeCodeButtonName}</button>
            <button enabled={!!readyHtml} onClick={copyText}>{copyHtmlButtonName}</button>
        </section>
        <section>
          <h4>Relatório</h4>
          <textarea disabled rows="8" cols="100" value={report} onChange={textAreaOnChange} className='reportArea'/>
          { readyHtml ?  <h4>Resultado atual</h4> : null }
          <div dangerouslySetInnerHTML={{ __html: readyHtml }}  />
        </section>
      </div>
    
      <footer><span>Desenvolvido por Luciano Urgal Pando </span></footer>
      { /* <span>    Doações de BTC aceitas em bc1qzwlp2yzl783pskg9vrueuwhda7lrfmg3gc6enl</span> */}
    </div>

}



export default App;
