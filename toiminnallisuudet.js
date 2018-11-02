var viestiketjuid;
var lomakkeenPiilotusStatus;

// Haetaan kaikki PIKAISET viestit, ja tehdään niistä taulukko.
$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/pikaiset/"
    }).then(function(data) {
        console.dir(data);
        for (var rivi = 0; rivi < data.length; rivi++) {
            if(!(data[rivi].topic == null)) {
                var aihe = (data[rivi].topic);
                var teksti = (data[rivi].text);
                var nimi = (data[rivi].name);
                var iidee = data[rivi].messageId;
                var $taulukonrivit = $('#pikaisettaulukonrivit');


                var $tr = $('<tr></tr>').attr('id', iidee).attr('onclick', 'myFunctionPikaiset' + '(' + iidee + ')');

                $tr.append($('<td></td>').text(aihe));
                $tr.append($('<td></td>').text(nimi));
                $tr.append($('<td></td>').text(teksti));

                $taulukonrivit.append($tr);
            }

            viestiketjuid = iidee;


        }
    });
});
// Haetaan kaikki KEVYET viestit, ja tehdään niistä taulukko.
$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/kevyet/"
    }).then(function(data) {
        console.dir(data);
        for (var rivi = 0; rivi < data.length; rivi++) {
            if(!(data[rivi].topic == null)) {
                var aihe = (data[rivi].topic);
                var teksti = (data[rivi].text);
                var nimi = (data[rivi].name);
                var iidee = data[rivi].messageId
                var $taulukonrivit = $('#kevyettaulukonrivit');


                var $tr = $('<tr></tr>').attr('id', iidee).attr('onclick', 'myFunctionKevyet' + '(' + iidee + ')');

                $tr.append($('<td></td>').text(aihe));
                $tr.append($('<td></td>').text(nimi));
                $tr.append($('<td></td>').text(teksti));

                $taulukonrivit.append($tr);
            }

            viestiketjuid = iidee;


        }
    });
});
// Haetaan kaikki VAKAVAT viestit, ja tehdään niistä taulukko.
$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/vakavat/"
    }).then(function(data) {
        console.dir(data);
        for (var rivi = 0; rivi < data.length; rivi++) {
            if(!(data[rivi].topic == null)) {
                var aihe = (data[rivi].topic);
                var teksti = (data[rivi].text);
                var nimi = (data[rivi].name);
                var iidee = data[rivi].messageId
                var $taulukonrivit = $('#vakavattaulukonrivit');


                var $tr = $('<tr></tr>').attr('id', iidee).attr('onclick', 'myFunctionVakavat' + '(' + iidee + ')');

                $tr.append($('<td></td>').text(aihe));
                $tr.append($('<td></td>').text(nimi));
                $tr.append($('<td></td>').text(teksti));

                $taulukonrivit.append($tr);
            }

            viestiketjuid = iidee;


        }
    });
});

// Luodaan uusi aihe
    $("#vakavalomake").submit(function (e) {
// $("#testibuttoni").on("click", function(e){ <<---- TESTIHOMMIA

        $.ajax({
            url: "http://localhost:8080/vakavat/"
        }).then(function (kokodata) {
            console.dir(kokodata);
            var generoituid = kokodata.length + 1;

            // get values from textboxs
            var aihe = $('#aiheboksi').val();
            var teksti = $('#tekstiboksi').val();
            var nimi = $('#nimiboksi').val();

            var data = {name: nimi, text: teksti, topic: aihe, messageId: generoituid};

            $.ajax({
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                url: "http://localhost:8080/vakavat/",
                type: "POST",
                dataType: "json",
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
// Luodaan uusi pikainen aihe
$("#pikainenlomake").submit(function (e) {
// $("#testibuttoni").on("click", function(e){ <<---- TESTIHOMMIA

    $.ajax({
        url: "http://localhost:8080/pikaiset/"
    }).then(function (kokodata) {
        console.dir(kokodata);
        var generoituid = kokodata.length + 1;

        // get values from textboxs
        var aihe = $('#aiheboksi').val();
        var nimi = $('#nimiboksi').val();
        var teksti = $('#tekstiboksi').val();


        var data = {name: nimi, text: teksti, topic: aihe, messageId: generoituid};

        $.ajax({
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            url: "http://localhost:8080/pikaiset/",
            type: "POST",
            dataType: "json",
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
// Luodaan uusi kevyt aihe
$("#kevytlomake").submit(function (e) {
// $("#testibuttoni").on("click", function(e){ <<---- TESTIHOMMIA

    $.ajax({
        url: "http://localhost:8080/kevyet/"
    }).then(function (kokodata) {
        console.dir(kokodata);
        var generoituid = kokodata.length + 1;

        // get values from textboxs
        var aihe = $('#aiheboksi').val();
        var teksti = $('#tekstiboksi').val();
        var nimi = $('#nimiboksi').val();

        var data = {name: nimi, text: teksti, topic: aihe, messageId: generoituid};

        $.ajax({
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            url: "http://localhost:8080/kevyet/",
            type: "POST",
            dataType: "json",
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

// Haetaan messageId:n perusteella viestit - PIKAISET
function myFunctionPikaiset(id) {

    // Näytetään lomake
    lomakkeenPiilotusStatus.style.display = "block";

    viestiketjuid=id;

    $.ajax({
        url: "http://localhost:8080/pikaiset/idt/" + id
    }).then(function(data) {
        console.dir(data);
        var $aiherivi = $('#' + id);
        var $vastauslomake = $('#vastauslomake');

        var $vastausdivi = $('<tr></tr>').attr({
            id:"vastausdiv" + id,
            class:"vastausdivi"
        });


        // etsitään viestiketjuun liittyvät vastausviestit
        // for(var viesti = data.length-1; viesti > 0; viesti--) {
        for(var viesti = 1; viesti < data.length; viesti++) {
            var teksti = data[viesti].text;
            var nimi = data[viesti].name;

            // var $taulukonrivit = $('#taulukonrivit');
            var $tr = $('<tr></tr>').attr({
                id:"kohde" + viesti,
                // rowspan:"3"
            });

            $tr.append($('<td></td>').text(teksti));
            $tr.append($('<td></td>').text(nimi));

            $vastausdivi.append($tr);

        }
        var $divitr = $('<tr></tr>').attr({
            id:"divitr" + id,
            class:"keskitettydivi"
        });

        $vastausdivi.append($vastauslomake);

        //nappi

        var $buttoni = $('<button>Piilota</button>').attr({
            type:"button",
            id:"buttoni" + id,
            onclick:"piilota(" + id + ")"
        });

        // uusi td -->

        var $teedee = $('<td></td>').attr({
            id:"teedee" + id,
            colspan:"5"
            // class:"keskitettydivi"
        });

        $teedee.append($buttoni);
        $teedee.append($vastausdivi);
        $divitr.append($teedee);

        $aiherivi.after($divitr);
    });
}

// Haetaan messageId:n perusteella viestit - KEVYET
function myFunctionKevyet(id) {

    // Näytetään lomake
    lomakkeenPiilotusStatus.style.display = "block";

    viestiketjuid=id;

    $.ajax({
        url: "http://localhost:8080/kevyet/idt/" + id
    }).then(function(data) {
        console.dir(data);
        var $aiherivi = $('#' + id);
        var $vastauslomake = $('#vastauslomake');

        var $vastausdivi = $('<tr></tr>').attr({
            id:"vastausdiv" + id,
            class:"vastausdivi"
        });


        // etsitään viestiketjuun liittyvät vastausviestit
        // for(var viesti = data.length-1; viesti > 0; viesti--) {
        for(var viesti = 1; viesti < data.length; viesti++) {
            var teksti = data[viesti].text;
            var nimi = data[viesti].name;

            // var $taulukonrivit = $('#taulukonrivit');
            var $tr = $('<tr></tr>').attr({
                id:"kohde" + viesti,
                // rowspan:"3"
            });

            $tr.append($('<td></td>').text(teksti));
            $tr.append($('<td></td>').text(nimi));

            $vastausdivi.append($tr);

        }
        var $divitr = $('<tr></tr>').attr({
            id:"divitr" + id,
            class:"keskitettydivi"
        });

        $vastausdivi.append($vastauslomake);

        //nappi

        var $buttoni = $('<button>Piilota</button>').attr({
            type:"button",
            id:"buttoni" + id,
            onclick:"piilota(" + id + ")"
        });

        // uusi td -->

        var $teedee = $('<td></td>').attr({
            id:"teedee" + id,
            colspan:"5"
            // class:"keskitettydivi"
        });

        $teedee.append($buttoni);
        $teedee.append($vastausdivi);
        $divitr.append($teedee);

        $aiherivi.after($divitr);
    });
}

// Haetaan messageId:n perusteella viestit
function myFunctionVakavat(id) {

    // Näytetään lomake
    lomakkeenPiilotusStatus.style.display = "block";

    viestiketjuid=id;

    $.ajax({
        url: "http://localhost:8080/vakavat/idt/" + id
    }).then(function(data) {
        console.dir(data);
        var $aiherivi = $('#' + id);
        var $vastauslomake = $('#vastauslomake');

        var $vastausdivi = $('<tr></tr>').attr({
            id:"vastausdiv" + id,
            class:"vastausdivi"
        });


        // etsitään viestiketjuun liittyvät vastausviestit
        // for(var viesti = data.length-1; viesti > 0; viesti--) {
        for(var viesti = 1; viesti < data.length; viesti++) {
            var teksti = data[viesti].text;
            var nimi = data[viesti].name;

            // var $taulukonrivit = $('#taulukonrivit');
            var $tr = $('<tr></tr>').attr({
                id:"kohde" + viesti,
                // rowspan:"3"
            });

            $tr.append($('<td></td>').text(teksti));
            $tr.append($('<td></td>').text(nimi));

            $vastausdivi.append($tr);

        }
        var $divitr = $('<tr></tr>').attr({
            id:"divitr" + id,
            class:"keskitettydivi"
        });

        $vastausdivi.append($vastauslomake);

        //nappi

        var $buttoni = $('<button>Piilota</button>').attr({
            type:"button",
            id:"buttoni" + id,
            onclick:"piilota(" + id + ")"
        });

        // uusi td -->

        var $teedee = $('<td></td>').attr({
            id:"teedee" + id,
            colspan:"5"
            // class:"keskitettydivi"
        });

        $teedee.append($buttoni);
        $teedee.append($vastausdivi);
        $divitr.append($teedee);

        $aiherivi.after($divitr);
    });
}

    jQuery(document).ready(function ($) {
        $(".clickable-row").click(function () {
            window.location = $(this).data("href");
        });
    });

$(document).ready(function lomakkeenpiilotus() {
    lomakkeenPiilotusStatus = document.getElementById("vastauslomake");
    lomakkeenPiilotusStatus.style.display = "none";
});

function piilota(id) {
    var x = document.getElementById('divitr' + id);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}


