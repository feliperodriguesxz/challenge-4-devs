//setting variables
var clientName = document.getElementById('clientName');
var clientContact = document.getElementById('clientContact');
var clientDate = document.getElementById('clientDate');
var save = document.getElementById('save');

save.addEventListener('click', function () {
    var clientContact = document.getElementById('clientContact');
    create(clientName.value, clientContact.value, clientDate.value);
});

function create(clientName, clientContact, clientDate) {
    var data = {
        clientName: clientName,
        clientContact: clientContact,
        clientDate: clientDate
    };

    return firebase.database().ref().child('customers').push(data);
}

firebase.database().ref('customers').on('value', function (snapshot) {
    customersList.innerHTML = '';
    snapshot.forEach(function (item) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(item.val().clientName + ': ' + item.val().clientContact + ': ' + item.val().clientDate));
        customersList.appendChild(li);
    });
});