
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

// $("#lomake").attr("action", "lomakefunktio()");
// function lomakefunktio() {
//     alert('toimii');
// } {
    // stop the regular form submission
    // e.preventDefault();
    // alert('toimii');

    // collect the form data while iterating over the inputs
    // var data = {};
    // for (var i = 0, ii = form.length; i < ii; ++i) {
    //     var input = form[i];
    //     if (input.name) {
    //         data[input.name] = input.value;
    //     }
    // }
    // addData();
}

// var lomakedata = JSON.stringify($("#lomake").serializeArray());
//
//
// $.ajax({
//     type: "POST",
//     url: "http://localhost:8080/",
//     data: lomakedata,
//     // success: function(){},
//     dataType: "json",
//     contentType : "application/json"
// });