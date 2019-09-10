var i=0;
function act(){
    i++
    return i
}
function clear(){
    i=0
}

module.exports = {
    act:act,
    clear:clear
}