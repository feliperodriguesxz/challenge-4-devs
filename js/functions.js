
var tableCustomers = document.getElementById('tableCustomers');
var databaseRef = firebase.database().ref('customers/');
var rowIndex = 1;

databaseRef.once('value', function (snapshot) {
  snapshot.forEach(function (childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();

    var row = tableCustomers.insertRow(rowIndex);
    var cellCustomerId = row.insertCell(0);
    var cellcustomerCompanyName = row.insertCell(1);
    var cellcustomerNameContact = row.insertCell(2);
    var cellCustomerDate = row.insertCell(3);
    cellCustomerId.appendChild(document.createTextNode(childKey));
    cellcustomerCompanyName.appendChild(document.createTextNode(childData.customerCompanyName));
    cellcustomerNameContact.appendChild(document.createTextNode(childData.customerNameContact));
    cellCustomerDate.appendChild(document.createTextNode(childData.customerDate));

    rowIndex = rowIndex + 1;
  });
});

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
  reloadPage();
}

function updateCustomer() {
  var customerCompanyName = document.getElementById('customerCompanyName').value;
  var customerId = document.getElementById('customerId').value;
  var customerNameContact = document.getElementById('customerNameContact').value;
  var customerDate = document.getElementById('customerDate').value;

  var data = {
    customerId: customerId,
    customerCompanyName: customerCompanyName,
    customerNameContact: customerNameContact,
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

function searchCustomerNameContact() {
  var customerNameContact = document.getElementById('customerNameContact').value;

  databaseRef.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();

      if (customerNameContact == childData.customerNameContact) {
        alert('Cliente ' + customerNameContact + ' encontrado! ');

      } else {
        alert('Cliente ' + customerNameContact + ' não encontrado!\n encontrado: ' + childData.customerNameContact);
      }
    });
  });
}




