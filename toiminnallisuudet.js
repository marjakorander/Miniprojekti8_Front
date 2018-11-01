
// Haetaan kaikki viestit, ja tehdään niistä taulukko.
$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/"
    }).then(function(data) {
        console.dir(data);

        for (var rivi = 0; rivi < data.length; rivi++) {
            if(data[rivi].hasAttribute("topic")) {
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

    $.ajax({
        url: "http://localhost:8080/idt/" + id
    }).then(function(data) {
        console.dir(data);

        for(var viesti = 0; viesti <= data.length; viesti++) {
            var teksti = data[viesti].text;
            var nimi = data[viesti].name;

            console.log(teksti);
            console.log(nimi);

            var $aiherivi = $('#' + id);
            var $tr = $('<tr></tr>');

            $tr.append($('<td></td>').text(teksti));
            $tr.append($('<td></td>').text(nimi));
            $aiherivi.append($tr);
        }


    });
}

// Luodaan uusi aihe
$("#lomake").submit(function(e){
// $("#testibuttoni").on("click", function(e){ <<---- TESTIHOMMIA

    // e.preventDefault();

    // get values from textboxs
    var aihe = $('#aiheboksi').val();
    var teksti = $('#tekstiboksi').val();
    var nimi = $('#nimiboksi').val();

    var data = {name:nimi, text:teksti, topic:aihe};

    $.ajax({
        headers: {
            "Accept": "application/json",
            "Content-Type":"application/json",
        },
        url:"http://localhost:8080/",
        type:"POST",
        dataType:"json",
        data: JSON.stringify(data),
        success: function(response){
            // alert(JSON.stringify(response));
        },
        error: function(err){
            alert(JSON.stringify(err));
        }
    })
});