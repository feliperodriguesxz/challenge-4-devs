//setting variables
var customerCompanyName = document.getElementById('customerCompanyName');
var customerNameContact = document.getElementById('customerNameContact');
var customerDate = document.getElementById('customerDate');
var save = document.getElementById('save');
var idCustomer;

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

        rowIndex += 1;
    });
});

/*
save.addEventListener('click', function () {
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

    snapshot.forEach(function (item) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(item.val().customerCompanyName + ': ' + item.val().customerNameContact + ': ' + item.val().customerDate));

    });
});
*/
function saveCustomer() {
    var customerCompanyName = document.getElementById('customerCompanyName').value;
    var customerNameContact = document.getElementById('customerNameContact').value;
    var customerDate = document.getElementById('customerDate').value;
    var customerDateEvaluation = 0;
    var customerId = firebase.database().ref().child('customers').push().key;

    var data = {
        customerId: customerId,
        customerCompanyName: customerCompanyName,
        customerNameContact: customerNameContact,
        customerDate: customerDate,
        customerDateEvaluation, customerDateEvaluation

    }

    var updates = {};
    updates['/customers/' + customerId] = data;
    firebase.database().ref().update(updates);

    alert('Cliente cadastrado com sucesso!!');

    //reloadTable();
    location.reload();
}

function updateCustomer() {

    var customerCompanyName = document.getElementById('customerCompanyName').value;
    var customerNameContact = document.getElementById('customerNameContact').value;
    var customerDate = document.getElementById('customerDate').value;

    searchCustomerNameContact();

    var customerId = idCustomer;


    var data = {
        customerId: customerId,
        customerCompanyName: customerCompanyName,
        customerNameContact: customerNameContact,
        customerDate: customerDate
    }

    var updates = {};
    updates['/customers/' + customerId] = data;
    firebase.database().ref().update(updates);

    location.reload();
    // idCustomer = 0;

    //alert('Cliente atualizado com sucesso!');

    // reloadTable();
}

function deleteCustomer() {

    searchCustomerNameContact();

    var customerId = idCustomer;

    firebase.database().ref().child('/customers/' + customerId).remove();
    location.reload();

    //idCustomer = 0;

    //  alert('Cliente deletado com sucesso!');

    // reloadTable();
}

function searchCustomerNameContact() {
    var customerNameContact = document.getElementById('customerNameContact').value;
    var cont = 0;
    databaseRef.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();

            if (customerNameContact == childData.customerNameContact) {
                idCustomer = childData.customerId;
                nameContactCustomer = childData.customerNameContact;
                cont += 1;
                alert('--Cliente ' + nameContactCustomer + ' encontrado! Id: ' + idCustomer);

            }
        });
    });


    //reloadTable();
}
