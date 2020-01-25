import React from 'react';
import { completeHtml, textProcessingReport } from './textProcessor';
import { exampleText } from './example'
import copy from 'copy-to-clipboard';
import './App.css'

export const copyHtmlButtonName = 'Copiar HTML completado';
export const useExampleButtonName = 'Inserir HTML exemplo'

const App = () =>  {

    const completeCodeButtonName = 'Completar Folha Ponto'
    const [lastMonth, setLastMonth] = React.useState(false);
    const [grayWeekends, setGrayWeekends] = React.useState(true);
    const [html, setHtml] = React.useState('');
    const [readyHtml, setReadyHtml] = React.useState('');
    const [report, setReport] = React.useState('')
    const [tolerance, setTolerance] = React.useState(15);

    const processText = () => {
      const ready = completeHtml(html,tolerance, lastMonth, grayWeekends);
      setHtml(ready);
      setReadyHtml(ready);
      setReport(textProcessingReport);
    }
    const textAreaOnChange = (event) => {
      setHtml(event.target.value);
    }
    const setDefaultHtml = () => {
      setHtml(exampleText);
      setReadyHtml(exampleText);
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
        <h2 id='mainTitle'> Ferramenta para calcular quantidades de horas no HTML da Folha Ponto do SEI IFPR </h2>
      </header>
      <div style={{textAlign: 'center'}} id="mainDiv">
        <section id="userInput">
          <p>Insira o código HTML da tabela de registro de frequência abaixo <a href='https://docs.google.com/document/d/1x0Sp4mlzEPA3NlKu3XP15NljrMgiLcZA8vqhtlXgHTQ/edit?usp=sharing' 
          target="_blank" rel="noopener noreferrer">(Instruções detalhadas)</a></p>
          <textarea rows="12" cols="150" value={html} onChange={textAreaOnChange} className='mainTextArea'/>
        </section>
        <section>
            <div>
              <span>Tolerância em minutos: </span>
              <input type='number' value={tolerance} onChange={(e) => setTolerance(e.target.value)}/>
              <span style={{marginLeft: '15px'}}>Finais de semana em cinza: </span>
              <input type='checkbox' value={grayWeekends} checked={grayWeekends} onChange={() => setGrayWeekends(!grayWeekends)}/>
              <span style={{marginLeft: '15px'}}>Calendário do mês passado: </span>
              <input type='checkbox' value={lastMonth} checked={lastMonth} onChange={() => setLastMonth(!lastMonth)}/>
            </div>
            <button onClick={setDefaultHtml}>{useExampleButtonName}</button>
            <button onClick={processText}>{completeCodeButtonName}</button>
            <button enabled={String(!!readyHtml)} onClick={copyText}>{copyHtmlButtonName}</button>
        </section>
        <section>
          <h3>Relatório</h3>
          <textarea disabled rows="8" cols="100" value={report} onChange={textAreaOnChange} className='reportArea'/>
          { readyHtml ?  <h4>Resultado atual</h4> : null }
          <div dangerouslySetInnerHTML={{ __html: readyHtml }}  />
        </section>
      </div>
    
      <footer><span id='developedBy'>Desenvolvido por Luciano Urgal Pando </span></footer>
      { /* <span>    Doações de BTC aceitas em bc1qzwlp2yzl783pskg9vrueuwhda7lrfmg3gc6enl</span> */}
    </div>

}



export default App;
