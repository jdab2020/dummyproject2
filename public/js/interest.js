$(document).ready(function (){
    $(document).on("click","button.addSymbol",addSymbol);

    function addSymbol (event) {
        let symbol = $(".addSymbol");
        $.ajax("/api/symbols", {
            method: "POST",
            data: {symbol: symbol.val().trim()}
        }).then(()=>{
            location.reload();
        })
    }
})