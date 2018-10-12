//setting variables
var customerCompanyName = document.getElementById('customerCompanyName');
var customerNameContact = document.getElementById('customerNameContact');
var customerDate = document.getElementById('customerDate');
var save = document.getElementById('save');

var tableCustomers = document.getElementById('tableCustomers');
var databaseRef = firebase.database().ref('customers/');
var rowIndex = 1;

databaseRef.once('value', function (snapshot) {
  snapshot.forEach(function (childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();

    var row = tableCustomers.insertRow(rowIndex);
    var cellCustomerId = row.insertCell(0);
    var cellCustomerName = row.insertCell(1);
    var cellCustomerContact = row.insertCell(2);
    var cellCustomerDate = row.insertCell(3);
    cellCustomerId.appendChild(document.createTextNode(childKey));
    cellCustomerName.appendChild(document.createTextNode(childData.customerCompanyName));
    cellCustomerContact.appendChild(document.createTextNode(childData.customerNameContact));
    cellCustomerDate.appendChild(document.createTextNode(childData.customerDate));

    rowIndex = rowIndex + 1;
  });
});


save.addEventListener('click', function () {
    var customerNameContact = document.getElementById('customerNameContact');
    create(customerCompanyName.value, customerNameContact.value, customerDate.value);
});

function create(customerCompanyName, customerNameContact, customerDate) {
    var data = {
        customerCompanyName: customerCompanyName,
        customerNameContact: customerNameContact,
        customerDate: customerDate
    };

    return firebase.database().ref().child('customers').push(data);
}

firebase.database().ref('customers').on('value', function (snapshot) {
    //customersList.innerHTML = '';
    snapshot.forEach(function (item) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(item.val().customerCompanyName + ': ' + item.val().customerNameContact + ': ' + item.val().customerDate));
       // customersList.appendChild(li);
    });
});