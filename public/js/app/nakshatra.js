class Nakshatra {
  constructor() {}
  getDetail(id) {
    $.ajax({
      url: `/api/v1/astro/${id}`,
      method: "GET",
      headers: { Authorization: "Bearer " + Cookies.get("token") }
    }).done(data => {
      $("input[name=birth_moon_nakshatra]").val(data.birth_moon_nakshatra);
      $("textarea[name=health_prediction]").val(data.prediction.health);
      $("textarea[name=emotion_prediction]").val(data.prediction.emotions);
      $("textarea[name=profession_prediction]").val(data.prediction.profession);
      $("textarea[name=luck_prediction]").val(data.prediction.luck);
      $("textarea[name=personallife_prediction]").val(data.prediction.personal_life);
      $("textarea[name=travel_prediction]").val(data.prediction.travel);
      if (data.sentiment) {
         $('select[name="health_sentiment"]').val(data.sentiment.health);
        $('select[name="emotion_sentiment"]').val(data.sentiment.emotions);
        $('select[name="profession_sentiment"]').val(data.sentiment.profession);
        $('select[name="luck_sentiment"]').val(data.sentiment.luck);
        $('select[name="personallife_sentiment"]').val(
          data.sentiment.personal_life
        );
        $('select[name="travel_sentiment"]').val(data.sentiment.travel);
      }
	 $(".js-select2")
          .select2()
          .trigger("change");
    });
  }
  updateSentiment(id) {
    let data = {
      sentiment: {
        health: $("select[name=health_sentiment]").val(),
        emotions: $("select[name=emotion_sentiment]").val(),
        profession: $("select[name=profession_sentiment]").val(),
        luck: $("select[name=luck_sentiment]").val(),
        personal_life: $("select[name=personallife_sentiment]").val(),
        travel: $("select[name=travel_sentiment]").val()
      }
    };
    $.ajax({
      method: "PATCH",
      url: `/api/v1/astro/flag/update/${id}`,
      headers: { Authorization: "Bearer " + Cookies.get("token") },
      data
    })
      .done(d => {
        swal({
          title: "Done",
          text: "Sentiment Updated Successfully!",
          buttons: false,
          timer: 1000
        }).then(() => {
          location.replace("/nakshatralist/" + id);
        });
      })
      .fail(e => {
        $("#msg").show();
        $("#msg").html(e.responseJSON.message);
      });
  }
}
