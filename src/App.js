import React from 'react';
import { completeHtml, textProcessingReport } from './textProcessor';
import { exampleText } from './example'
import copy from 'copy-to-clipboard';
import './App.css'

export const copyHtmlButtonName = 'Copiar HTML completado';
export const useExampleButtonName = 'Inserir HTML exemplo'

const App = () => {

  const completeCodeButtonName = 'Completar Folha Ponto'
  const [lastMonth, setLastMonth] = React.useState(false);
  const [grayWeekends, setGrayWeekends] = React.useState(true);
  const [html, setHtml] = React.useState('');
  const [readyHtml, setReadyHtml] = React.useState('');
  const [report, setReport] = React.useState('')
  const [tolerance, setTolerance] = React.useState(15);

  const processText = () => {
    const ready = completeHtml(html, tolerance, lastMonth, grayWeekends);
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
    setReport('Código HTML de exemplo inserido na área de texto.\n' +
      'Experimente clicar no botao <<' + completeCodeButtonName + '>> para ver o resultado.')
  }
  const copyText = () => {
    if (readyHtml) {
      copy(readyHtml)
      setReport('Código HTML copiado para a área de transferência!\n' +
        'Agora basta colar o código da tabela na área correspondente do SEI.')
    } else {
      setReport('Não há código HTML pronto para ser copiado.\n' +
        'Insira código HTML para processar, em seguida clique no botão <<' + completeCodeButtonName + '>>.')
    }
  }

  return <div className="App">
    <header>
      <div className='headerBlock' style={{ textAlign: 'right' }}>
        <a href='https://reitoria.ifpr.edu.br/' target="_blank" rel="noopener noreferrer">
          <img src='https://eventocientificoifpr.vpeventos.com/uploads/uploads_11484/site/logo_1_280399.png' alt='IFPR logo' />
        </a>
      </div>
      <div className='headerBlock'>
        <h1 id='mainTitle'> Completa Ponto </h1>
      </div>
      <div className='headerBlock' style={{ textAlign: 'left' }}>
        <a href='https://sei.ifpr.edu.br/' target="_blank" rel="noopener noreferrer">
          <img src='https://www.defesa.gov.br/arquivos/sei/sei.jpg' alt='SEI logo' />
        </a>
      </div>
    </header>
    <div style={{ textAlign: 'center' }} id="mainDiv">
      <section id="userInput">
        <p>Insira o código HTML da tabela de registro de frequência abaixo <a href='https://docs.google.com/document/d/1x0Sp4mlzEPA3NlKu3XP15NljrMgiLcZA8vqhtlXgHTQ/edit?usp=sharing'
          target="_blank" rel="noopener noreferrer">(Instruções detalhadas)</a></p>
        <textarea rows="12" cols="150" value={html} onChange={textAreaOnChange} className='mainTextArea' />
      </section>
      <section>
        <div>
          <span className='bodyText'>Tolerância em minutos: </span>
          <input type='number' value={tolerance} onChange={(e) => setTolerance(e.target.value)} />
          <span style={{ marginLeft: '15px' }} className='bodyText'>Finais de semana em cinza: </span>
          <input type='checkbox' value={grayWeekends} checked={grayWeekends} onChange={() => setGrayWeekends(!grayWeekends)} />
          <span style={{ marginLeft: '15px' }} className='bodyText'>Calendário do mês passado: </span>
          <input type='checkbox' value={lastMonth} checked={lastMonth} onChange={() => setLastMonth(!lastMonth)} />
        </div>
        <button onClick={setDefaultHtml}>{useExampleButtonName}</button>
        <button onClick={processText}>{completeCodeButtonName}</button>
        <button enabled={String(!!readyHtml)} onClick={copyText}>{copyHtmlButtonName}</button>
      </section>
      <section>
        <h3 className='bodyText'>Relatório</h3>
        <textarea readOnly rows="8" cols="100" value={report} onChange={textAreaOnChange} className='reportArea' />
        {readyHtml ? <h4 className='bodyText'>Resultado atual</h4> : null}
        <div className='center' dangerouslySetInnerHTML={{ __html: readyHtml }} />
      </section>
    </div>

    <footer><span id='developedBy'>Desenvolvido por Luciano Urgal Pando </span></footer>
    { /* <span>    Doações de BTC aceitas em bc1qzwlp2yzl783pskg9vrueuwhda7lrfmg3gc6enl</span> */}
  </div>

}



export default App;
