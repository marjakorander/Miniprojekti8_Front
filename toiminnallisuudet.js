var viestiketjuid;
// Haetaan kaikki viestit, ja tehdään niistä taulukko.
$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/"
    }).then(function(data) {
        console.dir(data);
        for (var rivi = 0; rivi < data.length; rivi++) {
            if(!(data[rivi].topic == null)) {
                var aihe = (data[rivi].topic);
                var teksti = (data[rivi].text);
                var nimi = (data[rivi].name);
                var iidee = data[rivi].messageId
                var $taulukonrivit = $('#taulukonrivit');


                var $tr = $('<tr></tr>').attr('id', iidee).attr('onclick', 'myFunction' + '(' + iidee + ')');

                $tr.append($('<td></td>').text(aihe));
                $tr.append($('<td></td>').text(teksti));
                $tr.append($('<td></td>').text(nimi));
                $taulukonrivit.append($tr);
            }


        }
    });
});

// Haetaan messageId:n perusteella viestit
function myFunction(id) {
    // var x = document.getElementById(id);
    // if (x.style.display === "none") {
    //     x.style.display = "block";
    // } else {
    //     x.style.display = "none";
    // }
    viestiketjuid=id;
    console.log("myF");
    $.ajax({
        url: "http://localhost:8080/idt/" + id
    }).then(function(data) {
        console.dir(data);
        var $aiherivi = $('#' + id);
        var $vastauslomake = $('#vastauslomake');

        var pastekohde = $aiherivi;

        // etsitään viestiketjuun liittyvät vastausviestit
        for(var viesti = 0; viesti < data.length; viesti++) {
            var teksti = data[viesti].text;
            var nimi = data[viesti].name;

            // var $taulukonrivit = $('#taulukonrivit');
            var $tr = $('<tr></tr>').attr('id', 'kohde' + viesti);

            $tr.append($('<td></td>').text(teksti));
            $tr.append($('<td></td>').text(nimi));
            // $aiherivi.append($tr);
            // $aiherivi.insertAfter($tr);
            if(viesti > 0) {
                $aiherivi.after($tr);
            } else {
                $('#kohde' + (viesti-1)).after($tr);
            }
            //pastekohde = viimeisin;

            $aiherivi.after($vastauslomake);
        }

        // TONIN KOODI:
       //  var $trlomake = $('<tr></tr>');
       //
       //  $trlomake.append($('<td></td>').append($vastauslomake));
       //
       // $aiherivi.after($trlomake);
       // console.dir($trlomake);
       // <--- TONIN KOODI
       //-----------------------------------------------------
       /* $tr.append($('<td></td>').text(nimi));
        var lomake = $('<form></form>').attr('method', 'post');
        var tekstiboksi = $('<input></input>').attr({
            type:"text",
            id:"tekstiboksi"
        });
        var nimiboksi = $('<input></input>').attr({
            type:"text",
            id:"nimiboksi"
        });
        var submitbuttoni = $('<button></button>').attr({
            type:"submit",
            id:"submitbuttoni"
        });

        lomake.append(tekstiboksi);
        lomake.append(nimiboksi);
        lomake.append(submitbuttoni);

        var $uusitr = $('<tr></tr>');
        $uusitr.append(lomake);
        $aiherivi.after($uusitr);*/




        // $('#vastauslomake').appendTo($aiherivi);


    });
}
function kommentoi(){
    console.log("Kommentoi...");
    console.log(viestiketjuid);
}
// Luodaan uusi aihe
$("#lomake").submit(function(e){
// $("#testibuttoni").on("click", function(e){ <<---- TESTIHOMMIA

    $.ajax({
        url: "http://localhost:8080/"
    }).then(function(kokodata) {
        console.dir(kokodata);
        var generoituid = kokodata.length + 1;

        // get values from textboxs
        var aihe = $('#aiheboksi').val();
        var teksti = $('#tekstiboksi').val();
        var nimi = $('#nimiboksi').val();

        var data = {name:nimi, text:teksti, topic:aihe, messageId:generoituid};

        $.ajax({
            headers: {
                "Accept": "application/json",
                "Content-Type":"application/json",
            },
            url:"http://localhost:8080/",
            type:"POST",
            dataType:"json",
            data: JSON.stringify(data),


            // success: function(response){
            //     // alert(JSON.stringify(response));
            // },
            // error: function(err){
            //     // alert(JSON.stringify(err));
            // }
        })

    });

});

jQuery(document).ready(function($) {
    $(".clickable-row").click(function() {
        window.location = $(this).data("href");
    });
});

