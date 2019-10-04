
export let totalMinutes;
let activeDays;
let dailyHours;
let twoTurnsDays;

const tdSplitString = '<p class="Tabela_Texto_Alinhado_Justificado">'

export const completeHtml = (str) => {

    totalMinutes = 0;
    activeDays = 0;
    //dailyHours = 0;
    twoTurnsDays = 0;

    if(!str) return 'Nenhuma string foi fornecida'
    let trSplit = str.split('<tr>')
    if(trSplit.length < 1) return 'Não há <tr> no texto.'
    const lastTrIndex = trSplit.length-1;
    
    trSplit = trSplit.map((tr,i) =>{
        // get third <tr> and beyond
        if(i === lastTrIndex) {
            return completeLastTr(tr)
        } else if(i >= 2) {
            return completeTr(tr,i);
        } else {
            return tr;
        }
    })

    return trSplit.join('<tr>');
}

const completeLastTr = (str) => {

    if(!str) {
        console.log('Ultima tr nula')
        return 'TR nula'
    }
    let tdSplit = str.split(tdSplitString)
    const lastIndex = tdSplit.length-2;
    if(twoTurnsDays > (activeDays/2)) {
        dailyHours = 8;
    } else {
        dailyHours = 6;
    }
    const minimumMinutes = (activeDays * dailyHours)*60;

    const prettyTotalHours = minutesToHoursMinutes(totalMinutes - minimumMinutes)
    console.log('Tempo restante do mês: ' + prettyTotalHours + '; tdSplit.length = ' + tdSplit.length)

    if(totalMinutes)
    tdSplit[lastIndex] = 'Saldo: ' +prettyTotalHours +'</p>'+ tdSplit[lastIndex].split('</p>')[1];
    return tdSplit.join(tdSplitString)
}


const completeTr = (str,i) => {
    
    if(!str) {
        console.log('Tr '+i + ' nula')
        return 'Tr nula'
    }
    let tdSplit = str.split(tdSplitString)
    const lastIndex = tdSplit.length-1;
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
        totalMinutes += minutesSum;
        console.log('Linha '+ i +  ' tem ' + minutesSum + ' minutos.')
        tdSplit[lastIndex] = minutesToHoursMinutes(minutesSum) + '</' + tdSplit[lastIndex].split('</')[1];
    }
    return tdSplit.join(tdSplitString)
}

const hoursMinutesToMinutes = (str) => {
    if(!str || str.startsWith('&nbsp;')) return ''
    //console.log('hoursMinutesToMinutes: ' +str)
    const spl = str.split(':');
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
