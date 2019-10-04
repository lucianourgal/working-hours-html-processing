
export const completeHtml = (str) => {

    if(!str) return 'Nenhuma string foi fornecida'
    let trSplit = str.split('<tr>')
    if(trSplit.length < 1) return 'Não há <tr> no texto.'
    
    trSplit = trSplit.map((tr,i) =>{
        // get third <tr> and beyond
        if(i >= 2) {
            return completeTd(tr,i);
        } else {
            return tr;
        }
    })

    return trSplit.join('<tr>');
}

export const completeTd = (str,i) => {
    
    const tdSplitString = '<p class="Tabela_Texto_Alinhado_Justificado">'
    if(!str) {
        console.log('Tr '+i + ' nula')
        return 'TD nula'
    }
    let tdSplit = str.split(tdSplitString)
    const lastIndex = tdSplit.length-1;
    let minutesSum = 0;

    // get 2-3°, 5°-6°, 8-9° collumns (if exists)  <td><p>
    minutesSum += hoursMinutesToMinutes(tdSplit[3]) - hoursMinutesToMinutes(tdSplit[2])
    if(lastIndex > 7)
        minutesSum += hoursMinutesToMinutes(tdSplit[6]) - hoursMinutesToMinutes(tdSplit[5])
    if(lastIndex > 9)
        minutesSum += hoursMinutesToMinutes(tdSplit[9]) - hoursMinutesToMinutes(tdSplit[8])
    
    // post result to last collumn
    if(minutesSum && minutesSum > 0) {
        console.log('Linha '+ i +  ' tem ' + minutesSum + ' minutos.')
        tdSplit[lastIndex] = minutesToHoursMinutes(minutesSum) + tdSplit[lastIndex].replace('&nbsp;','');
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
    const prettyHours = (rhours < 10) ? '0'+rhours : rhours
    const prettyMinutes = (rminutes < 10) ? '0'+rminutes : rminutes

    return prettyHours+":"+prettyMinutes
}
