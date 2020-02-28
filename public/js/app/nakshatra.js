class Nakshatra {
  constructor() {}
  getDetail(id) {
    $.ajax({
      url: `/api/v1/astro/${id}`,
      method: "GET"
    }).done(data => {
      $("input[name=birth_moon_nakshatra]").val(data.birth_moon_nakshatra);
      $("textarea[name=health_prediction]").val(data.prediction.health);
      $("textarea[name=emotion_prediction]").val(data.prediction.emotions);
      $("textarea[name=profession_prediction]").val(data.prediction.profession);
      $("textarea[name=luck_prediction]").val(data.prediction.luck);
      $("textarea[name=personallife_prediction]").val(data.prediction.personal_life);
      $("textarea[name=travel_prediction]").val(data.prediction.travel);
      if (data.sentiment) {
        $(`select[name=health_sentiment] option[value=${data.sentiment.health}]`).prop(
          "selected",
          true
        );
        $(`select[name=emotion_sentiment] option[value=${data.sentiment.emotions}]`).prop(
          "selected",
          true
        );
        $(`select[name=profession_sentiment] option[value=${data.sentiment.profession}]`).prop(
          "selected",
          true
        );
        $(`select[name=luck_sentiment] option[value=${data.sentiment.luck}]`).prop(
          "selected",
          true
        );
        $(`select[name=personallife_sentiment] option[value=${data.sentiment.personal_life}]`).prop(
          "selected",
          true
        );
        $(`select[name=travel_sentiment] option[value=${data.sentiment.travel}]`).prop(
          "selected",
          true
        );
      }
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
