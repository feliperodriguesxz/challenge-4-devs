var rating = document.getElementById('rating');
var question = document.getElementById('question');
var monthYear = document.getElementById('monthYear');
var save = document.getElementById('save');

save.addEventListener('click', function () {
//var rating = document.getElementById('rating');
    create(rating.value, question.value, monthYear.value);
});

function create(rating, question, monthYear) {
    var data = {
        rating: rating,
        question: question,
        monthYear: monthYear
    };

    return firebase.database().ref().child('evaluations').push(data);
}

firebase.database().ref('evaluations').on('value', function (snapshot) {
   //evaluationList.innerHTML = '';
    snapshot.forEach(function (item) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(item.val().rating + ': ' + item.val().question + ': '+ item.val.monthYear));
       // evaluationList.appendChild(li);
    });
});

/*
evaluations {

    "reference" : "month-year",
    "customers" : {idCustomer1, idCustomer2, etc}

}

customers {
    ....
    type: "detrator-promotor-neutro-null",
    dateLastEvaluation : "month-year"


}
*/