$(document).ready(function (){
    $(document).on("click",".addSymbol",addSymbol);

    function addSymbol (event) {
        let symbol = $("#addSymbol");
        // console.log(symbol.val().trim(), "smybol===========");
        $.ajax("/api/symbols", {
            method: "POST",
            data: {symbol: symbol.val().trim()}
        }).then(()=>{
            location.reload();
        })
    }

    // $("#addSymbol").on("click", (event) => {
    //     let symbol = $("#addSymbol");
    //     console.log(symbol.val().trim());

    // })

})