
// Haetaan kaikki viestit, ja tehdään niistä taulukko.
$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/"
    }).then(function(data) {
        console.dir(data);

        for (var rivi = 0; rivi < data.length; rivi++) {
            var aihe = (data[rivi].topic);
            var teksti = (data[rivi].text);
            var nimi = (data[rivi].name);
            var $taulukonrivit = $('#taulukonrivit');
            var $tr = $('<tr></tr>');

            $tr.append($('<td></td>').text(aihe));
            $tr.append($('<td></td>').text(teksti));
            $tr.append($('<td></td>').text(nimi));
            $taulukonrivit.append($tr);

        }
    });
});

// Lähetetään dataa lomakkeella
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
            alert(JSON.stringify(response));
        },
        error: function(err){
            alert(JSON.stringify(err));
        }
    })
});