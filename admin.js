let updatedAmount;
let updatedName;
let updatedId;
let deleteProductId;
class Product {
  constructor(name, id, amount) {
      this.name = name;
      this.id = id;
      this.amount = amount;
  }
}
class UpdateProduct {
  constructor(updateName, updateId, updateAmount) {
      this.updateName = updateName;
      this.updateId = updateId;
      this.updateAmount = updateAmount;
  }
   // udate product values
   static updateProductsValue(updateProduct){
    document.querySelector('#update-name').value = updateProduct.updateName;
    document.querySelector('#update-id').value = updateProduct.updateId;
    document.querySelector('#update-amount').value = updateProduct.updateAmount;
    updatedName = updateProduct.updateName;
    updatedAmount = updateProduct.updateAmount;
    updatedId = updateProduct.updateId;
  }
}
// UI Class
class UI{
  addProductToList(product){
    const tbody = document.querySelector('#table-body');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td id="tdId">${product.id}</td>
    <td>${product.name}</td>
    <td>${product.amount}</td>
    <td><a href="#" class="update" data-bs-toggle="modal" data-bs-target="#update"><i class="fas fa-edit"></i></a></td>
    <td><a href="#" class = "delete delete-item" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fas fa-trash-alt"></i></a></td>
    `;
    tbody.appendChild(row);
  }
  static showAlert(msg, className) {
    const div = document.getElementById("alert-box")
    div.className = `alert ${className}`;
    div.innerText = msg
    setTimeout(() => {
        document.querySelector("#alert-box").className = ""
        document.querySelector("#alert-box").innerText = "";
    }, 3000);
}
  static showAlertUpdate(msg, className) {
    const div = document.getElementById("alert-box-update")
    div.className = `alert ${className}`;
    div.innerText = msg
    setTimeout(() => {
        document.querySelector("#alert-box-update").className = ""
        document.querySelector("#alert-box-update").innerText = "";
    }, 3000);
}
static deleteFromUI(){
  const rowToDeletes = document.querySelectorAll('#tdId');
  rowToDeletes.forEach((rowToDelete) =>{
    if(rowToDelete.textContent === deleteProductId){
      rowToDelete.parentElement.remove();
    }
  })
}
static clearField(){
  document.querySelector('#product-name').value = ''
  document.querySelector('#product-id').value = ''
  document.querySelector('#product-amount').value = ''
}
}

class StoreLs{
    static getProducts() {
      let products;
      if(localStorage.getItem('products') === null) {
        products = [];
      } else {
        products = JSON.parse(localStorage.getItem('products'));
      }
  
      return products;
    }
  
    static displayProducts() {
      const products = StoreLs.getProducts();
  
      products.forEach(function(product){
        const ui  = new UI;

      // Add book to UI
      ui.addProductToList(product);
      });
    }
  
    static checkProduct(product) {
      const products = StoreLs.getProducts();
      if(products.length !== 0){
        for(let i = 0; i < products.length; i++){
          const currentProducts = products[i];
          if(currentProducts.id === product.id || currentProducts.name === product.name){
            UI.showAlert('Product ID or Name Must not be duplicate', 'error')
            break;
          }
          if(i === products.length - 1){
            StoreLs.addProduct(product);
            const ui = new UI;
            ui.addProductToList(product);
            UI.clearField();
          }
      }
    }
    else{
      StoreLs.addProduct(product);
      const ui = new UI;
      ui.addProductToList(product);
      UI.clearField();
    }
    }
  static addProduct(product){
    const products = StoreLs.getProducts();
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    UI.showAlert('Product Added Successfully', 'success')
  }
}
document.querySelector('#product-form').addEventListener('submit', addProduct);

function addProduct(e){
  e.preventDefault()
  const name = document.querySelector('#product-name').value;
  const id = document.querySelector('#product-id').value;
  const amount = document.querySelector('#product-amount').value;
  const product = new Product(name, id, amount);
  
  if(name ==='' || id === '' || amount === ''){
    UI.showAlert("Please fill in all field", "error");
        return false;
    } else {
    StoreLs.checkProduct(product);
    }
}

// delete event
document.querySelector('#table-body').addEventListener('click',function(e){
  if(e.target.parentElement.className === 'update'){
    const updateAmount = e.target.parentElement.parentElement.previousElementSibling.textContent;
    const updateName = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.textContent;
    const updateId = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    
    const updateProduct = new UpdateProduct(updateName,updateId, updateAmount);
    UpdateProduct.updateProductsValue(updateProduct);
  }else if(e.target.parentElement.classList.contains('delete-item')){
    const deleteProductIds = e.target.parentElement.parentElement.parentElement.children[0].textContent;
    const deleteProductName = e.target.parentElement.parentElement.parentElement.children[1].textContent;
    const alertMessageBox = document.querySelector('#alert-message-box');
    alertMessageBox.textContent = `Are you sure you want to delete ${deleteProductName} with product ID ${deleteProductIds}?`
    deleteProductId = deleteProductIds;
  }
  e.preventDefault();
})

// listen to update form
document.querySelector('#update-form').addEventListener('submit', function(e){
  e.preventDefault()
  const newUpdateName = document.querySelector('#update-name').value;
  const newUpdateId = document.querySelector('#update-id').value;
  const newUpdateAmount = document.querySelector('#update-amount').value;
  const lsDatas = StoreLs.getProducts();
  for(let i = 0; i < lsDatas.length; i++ ){
    currentLsData = lsDatas[i];
    if(currentLsData.name === updatedName){
      currentLsData.name = newUpdateName;
      currentLsData.id = newUpdateId;
      currentLsData.amount = newUpdateAmount;
      let counter = 0;
      lsDatas.forEach((item)=>{
        if(item.name === newUpdateName || item.id === newUpdateId){
          counter ++;
        }
      })
      if(counter === 1){
        localStorage.setItem('products', JSON.stringify(lsDatas))
        UI.showAlertUpdate('Product Updated Successfully', 'success');
        setTimeout(function(){window.location.reload();},3000)
      }else{
        UI.showAlertUpdate("You cant't update to already exist product name or id", 'error')
      }
    }
  }
})

// delete product
document.querySelector('#delete-product-btn').addEventListener('click', function(e){
  UI.deleteFromUI();
  const lsDatas = StoreLs.getProducts();
  lsDatas.forEach(function(item, index){
    if(item.id === deleteProductId) {
     lsDatas.splice(index, 1);
    }
   });
   document.querySelector('#alert-message-box').textContent = 'Deleted';
   localStorage.setItem('products', JSON.stringify(lsDatas))
   setTimeout(function(){window.location.reload();},1000);
})
// Dom content loaded
document.addEventListener('DOMContentLoaded', StoreLs.displayProducts);