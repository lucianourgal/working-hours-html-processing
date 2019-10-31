import { copyHtmlButtonName, useExampleButtonName } from './App'

export let totalMinutes;
export let textProcessingReport;
let activeDays;
let dailyHours;
let twoTurnsDays;
let prettyTotalHours;
let minimumMinutes;
let positiveDay;
let negativeDay;
let minutesInEachDay;
let problems;

const tdSplitString = '<p class="Tabela_Texto_Alinhado_Justificado">'
const completionComment = '<!-- Essa folha ponto teve seus minutos calculados utilizando  a' +
' ferramenta disponivel em https://working-hours-html-processing.herokuapp.com -->\n'

export const completeHtml = (str, tolerance, isLastMonth, grayWeekends) => {

    textProcessingReport = '';
    problems = '';
    totalMinutes = 0;
    activeDays = 0;
    positiveDay = 0;
    negativeDay = 0;
    //dailyHours = 0;
    twoTurnsDays = 0;
    minutesInEachDay = []
    const trSpliter = '<tr'

    if(!str) {
        textProcessingReport = 'Não há nenhum texto para ser processado.\n' +
            'Cole seu HTML de folha ponto, ou experimente usando o botão <<'+useExampleButtonName+'>>';
        return ''
    }

    if((str.toLowerCase().replace(' ','')).includes('script')) {
        textProcessingReport = 'Scripts não são permitidos.'
        return ''
    }
    
    let trSplit = str.split(trSpliter)
    if(trSplit.length < 20) {
        textProcessingReport = 'Não há <Tr> suficientes no HTML';
        return ''
    }
    const lastTrIndex = trSplit.length-1;
    
    trSplit = trSplit.map((tr,i) =>{
        // get third <tr> and beyond
        if(i === lastTrIndex) {
           return completeLastTr(tr)
        } else if(i >= 2) {
            return completeTr(tr,i, isLastMonth, grayWeekends);
        } else {
            return tr;
        }
    })

    if(activeDays<1) {
        textProcessingReport = 'Não há registros de dias ativos. \n' + textProcessingReport
        return ''
    }

    const dailyMinutes = dailyHours*60

    minutesInEachDay.forEach(minutes => {
        if(minutes < dailyMinutes) {
            negativeDay++;
            if( (dailyMinutes - minutes) < tolerance ) { // meets tolerance
                totalMinutes += dailyMinutes;
            } else { // exceeds tolerance
                totalMinutes += minutes;
            }
        } else if(minutes > dailyMinutes) {
            positiveDay++;
            if( (minutes - dailyMinutes) < tolerance ) { // meets tolerance
                totalMinutes += dailyMinutes;
            } else { // exceeds tolerance
                totalMinutes += minutes;
            }
        } else {
            totalMinutes += minutes;
        }
    })

    trSplit[lastTrIndex] = completeLastTr(trSplit[lastTrIndex]);

    textProcessingReport = 'Processamento de texto completo!'+
    ' Verifique o resultado abaixo antes de clicar no botão <<'+copyHtmlButtonName+'>> e copiar o código.'+
    '\n\nDias com registros e completados: '+ activeDays +
    '\nDias de dois turnos ou mais: ' + twoTurnsDays +
    '\nSua carga horária é de ' + dailyHours + 'h por dia, ou ' + (dailyHours*5) + 'h semanais.' +
    '\nContabilizou ' + minutesToHoursMinutes(totalMinutes) + ' de ' + 
    minutesToHoursMinutes(minimumMinutes) + ' esperadas, deixando um saldo de ' + prettyTotalHours +
    '.\nFez minutos a mais em ' + positiveDay + ' dias, e a menos em ' + negativeDay + ' dias.\n' +
    (problems ? 'Problemas encontrados: ' + problems : '')

    return problems ? '' :  ( trSplit[0].startsWith('<!--') ? '' : completionComment) + 
    trSplit.join(trSpliter);
}

const completeLastTr = (str) => {

    if(!str) {
        console.log('Ultima tr nula')
        problems += 'Ultima tr nula, '
        return 'TR nula'
    }
    let tdSplit = str.split(tdSplitString)
    const lastIndex = tdSplit.length-2;
    if(lastIndex < 3) {
        const prb = 'ultima <tr> tem apenas '+(lastIndex+2)+' <td>s: espera-se 5,'
        problems += prb;
        return prb;
    }

    if(twoTurnsDays > (activeDays/2)) {
        dailyHours = 8;
    } else {
        dailyHours = 6;
    }
    minimumMinutes = (activeDays * dailyHours)*60;

    prettyTotalHours = minutesToHoursMinutes(totalMinutes - minimumMinutes)
    console.log('Tempo restante do mês: ' + prettyTotalHours + '; tdSplit.length = ' + tdSplit.length)

    if(totalMinutes)
    tdSplit[lastIndex] = 'Saldo: ' +prettyTotalHours +'</p>'+ tdSplit[lastIndex].split('</p>')[1];
    return tdSplit.join(tdSplitString)
}


const completeTr = (str,i, isLastMonth, grayWeekends) => {
    
    if(!str) {
        console.log('Tr '+i + ' nula')
        problems += '<tr> '+ i + ' nula, '
        return 'Tr nula'
    }
    let tdSplit = str.split(tdSplitString)
    const lastIndex = tdSplit.length-1;
    if(lastIndex < 4) {
        const prb = '<tr> '+i+' tem apenas '+(lastIndex+1)+' <td>s: espera-se 5,'
        problems += prb;
        return prb;
    }
    let minutesSum = 0;

    // get 2-3°, 5°-6°, 8-9° collumns (if exists)  <td><p>
    let isTwoTurns = false;
    minutesSum += hoursMinutesToMinutes(tdSplit[3]) - hoursMinutesToMinutes(tdSplit[2])
    if(lastIndex > 7) {
        const secondTurnMinutes = hoursMinutesToMinutes(tdSplit[6]) - hoursMinutesToMinutes(tdSplit[5]);
        if(secondTurnMinutes) {
            minutesSum += secondTurnMinutes;
            isTwoTurns = true;
        }
        if(lastIndex > 9) {
            const thirdTurnMinutes = hoursMinutesToMinutes(tdSplit[9]) - hoursMinutesToMinutes(tdSplit[8])
            if(thirdTurnMinutes) {
                minutesSum += thirdTurnMinutes
                isTwoTurns = true;
            }
        }
    }
    if(isTwoTurns) twoTurnsDays++;
    
    // post result to last collumn
    if(minutesSum && minutesSum > 0) {
        activeDays++;
        minutesInEachDay.push(minutesSum);
        //totalMinutes += minutesSum;
        console.log('Linha '+ i +  ' tem ' + minutesSum + ' minutos.')
        tdSplit[lastIndex] = minutesToHoursMinutes(minutesSum) + '</' + tdSplit[lastIndex].split('</')[1];
    } else if(i <= 33) {
        const date = new Date();
        if(isLastMonth) {
            date.setMonth(date.getMonth()-1);
        }
        date.setDate(i-2);

        const weekday = date.getDay();
        const weekendColor = '#e3e3e3"'

        if(weekday === 0) {
            tdSplit[2] = tdSplit[2].replace('&nbsp;','Domingo')
            if(tdSplit[0].startsWith('>') && grayWeekends) {
                tdSplit[0] = ' style="background-color: '+ weekendColor + tdSplit[0]
            }
        } else if(weekday === 6) {
            tdSplit[2] = tdSplit[2].replace('&nbsp;','Sábado')
            if(tdSplit[0].startsWith('>') && grayWeekends) {
                tdSplit[0] = ' style="background-color: ' + weekendColor + tdSplit[0]
            }
        } 
    }


    return tdSplit.join(tdSplitString)
}

const hoursMinutesToMinutes = (str) => {
    if(!str || str.startsWith('&nbsp;')) return ''
    //console.log('hoursMinutesToMinutes: ' +str)
    const spl = str.replace(' ','').split(':');
    if(!spl || !(spl.length > 1)) {
        //console.log('Passou pelo teste hoursMinutesToMinutes parcialmente: '+ spl.join(':'))
        return ''
    }
    const res = parseInt(spl[0])*60 + parseInt((spl[1].split('<'))[0])
    //console.log(res)
    return res
}

const minutesToHoursMinutes = (num) => {
    if(!num) return ''
    const hours = (num / 60);
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes)
    const prettyHours = ((rhours < 10) ? 
    ((rhours < 0 ) ? rhours : '0'+rhours) : rhours)
    const prettyMinutes = ((rminutes < 10) ? '0'+rminutes : rminutes)

    return prettyHours+":"+prettyMinutes
}
