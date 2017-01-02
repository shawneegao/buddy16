function getTreatNum() {

    $.ajax({
        url: 'php/getTreatNum.php',
        dataType: "text",
        method: "GET",
        success: function(treatNum) {
          $(function() {
              /*$(".dial").knob({
                width: '125px',
                height: '125px',
                "readOnly": true
              });
              $(".dial").val(treatNum).trigger('change');*/
              $("#totalTreatNum").text(treatNum);
              return treatNum;

          });
        },
    });
}

function getDonations(getAll) {
    /*set interval for this*/
    $.ajax({
        url: 'php/getDonations.php',
        dataType: "text",
        method: "GET",
        success: function(data) {
            data = JSON.parse(data);
            console.log(getAll);
            if (getAll == true) {
                $.each(data, function(i, v) {
                    $(".thank-you-list").append($("<div class = 'thank-you-item col-sm-12 col-md-6 col-lg-3'> <img class = 'icon' src = 'img/star.png'></img><span class= 'thank-you-item'>" + "  " + v[0]+ "</span></div>"));
                });
            } else {
                $(".thank-you-list").append($("<div class = 'thank-you-item col-sm-12 col-md-6 col-lg-3'><img class = 'icon' src = 'img/star.png'></img><span class = 'current-donation'>" + " " +data[data.length - 1][0]+"</span></div>"));
            }
        }
    });
}

function recordDonations() {
    $("#giveTreats").click(function() {
        name = $("#name").val();
        treatNum = parseInt($('input[name="treatNum"]:checked').val());

        original_treatNum = parseInt($("#totalTreatNum").text());
        total_treatNum = treatNum + original_treatNum;

        if (name == "" || treatNum < 1) {
            console.log("user hit submit button without filling out the form")
            $('#oops-modal').modal('show');
        } else {
            $('#thank-you-modal').modal('show');
            $(this).attr('disabled', 'disabled');
            $(this).text("Thanks!");
            $("#totalTreatNum").text(total_treatNum);
            writeDonation(name, treatNum, total_treatNum);

        }
    });
}

function writeDonation(name, treatNum, total_treatNum) {
    var donateInfo = {}
    donateInfo.name = name;
    donateInfo.treatNum = treatNum;
    var donateInfo = JSON.stringify(donateInfo);
    $.ajax({
        url: "php/recordDonations.php",
        data: {
            data: donateInfo
        },
        dataType: "text",
        method: "POST",
        success: function() {
            console.log("we did it!");
            getDonations(false); //WORKS, just make sure to grab the most recent one.
        }
    });
    $.ajax({
        url: "php/record_total_treatNum.php",
        data: {
            data: total_treatNum
        },
        dataType: "text",
        method: "POST",
        success: function() {
            console.log("Recorded total treatNum!");
        }
    });
}

/*MAIN FUNCTION */
$(document).ready(
    function() {
       $("#hideAll").show();
       $(window).load(function() {$("#hideAll").hide(); });
        getTreatNum();
        getDonations(true);
        recordDonations();

    }
);
