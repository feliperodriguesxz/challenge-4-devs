
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
    cellCustomerName.appendChild(document.createTextNode(childData.customerName));
    cellCustomerContact.appendChild(document.createTextNode(childData.customerContact));
    cellCustomerDate.appendChild(document.createTextNode(childData.customerDate));

    rowIndex = rowIndex + 1;
  });
});

function saveCustomer() {
  var customerName = document.getElementById('customerName').value;
  var customerContact = document.getElementById('customerContact').value;
  var customerDate = document.getElementById('customerDate').value;
  var customerId = firebase.database().ref().child('customers').push().key;

  var data = {
    customerId: customerId,
    customerName: customerName,
    customerContact: customerContact,
    customerDate: customerDate

  }

  var updates = {};
  updates['/customers/' + customerId] = data;
  firebase.database().ref().update(updates);

  alert('Cliente cadastrado com sucesso!!');
  reloadPage();
}

function updateCustomer() {
  var customerName = document.getElementById('customerName').value;
  var customerId = document.getElementById('customerId').value;
  var customerContact = document.getElementById('customerContact').value;
  var customerDate = document.getElementById('customerDate').value;

  var data = {
    customerId: customerId,
    customerName: customerName,
    customerContact: customerContact,
    customerDate: customerDate
  }

  var updates = {};
  updates['/customers/' + customerId] = data;
  firebase.database().ref().update(updates);

  alert('Cliente atualizado com sucesso!');

  reloadPage();
}

function deleteCustomer() {
  var customerId = document.getElementById('customerId').value;

  firebase.database().ref().child('/customers/' + customerId).remove();
  alert('Cliente deletado com sucesso!');
  reloadPage();
}

function reloadPage() {
  window.location.reload();
}
