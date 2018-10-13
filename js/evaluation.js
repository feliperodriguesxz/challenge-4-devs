
 var rating = document.getElementById('rating');
 var question = document.getElementById('question');
 var reference = document.getElementById('reference');
 var save = document.getElementById('save');

 save.addEventListener('click', function () {
    create(rating.value, question.value, reference.value);
});

function create(rating, question, reference) {

   var id = firebase.database().ref().child('evaluations').push().key;

    var data = {
        rating: rating,
        question: question,
        reference: reference,
        id: id
    };

    var updates = {};
    updates['/evaluations/' + id] = data;
    return firebase.database().ref().update(updates);

}

firebase.database().ref('evaluations').on('value', function (snapshot) {

    snapshot.forEach(function (item) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(item.val().id + ': ' +item.val().rating + ': ' + item.val().question + ': ' + item.val().reference));

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