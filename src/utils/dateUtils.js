
export default {
    returnTimeString(dateString){
        if (dateString.length < 19) {
            return ''
        }

        let s = dateString.substring(0,19).replace('T',' ').split(" ");
        let s1 = s[0].split("-");
        let s2 = s[1].split(":");
        if(s2.length==2){
            s2.push("00");
        }

        let localDate = new Date(s1[0],s1[1]-1,s1[2],s2[0],s2[1],s2[2]);
        let localTime = localDate.getTime();
        let localOffset = 28800000;//一个时区 8小时的毫秒数
        let utc = localTime + localOffset;
        let date = new Date(utc);

        let year = `${date.getFullYear()}`;
        let month = `${date.getMonth() + 1}`;
        let day = `${date.getDate()}`;
        let hour = `${date.getHours()}`;
        let minute = `${date.getMinutes()}`;
        let seconds = `${date.getSeconds()}`;

        month = month.length < 2 ? `0${month}` : month;
        day = day.length < 2 ? `0${day}` : day;
        hour = hour.length < 2 ? `0${hour}` : hour;
        minute = minute.length < 2 ? `0${minute}` : minute;
        seconds = seconds.length < 2 ? `0${seconds}` : seconds;

        return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
    }
}
