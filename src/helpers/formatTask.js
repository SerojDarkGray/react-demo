


export default function formatTask(str='',maxLength){
    if(!maxLength || str.length<maxLength){
        return str;
    }
    return str.slice(0,maxLength)+'...'
}