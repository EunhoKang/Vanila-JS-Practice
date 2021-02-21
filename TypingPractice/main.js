window.onload = function() {
    console.log($("display").innerHTML);
    $("input").observe("input",log);
};

function log(){
    console.log($("input").value,$("display").innerHTML);
}