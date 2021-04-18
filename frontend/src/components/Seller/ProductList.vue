<template>
    <div class="product-list">
            <nav class="navbar shadow p-3 mb-5 bg-body rounded ">
        <a class="navbar-brand"><h4 class="header">AmazingShop</h4></a>
        <form class="form-inline">
          <input class="form-control mr-sm-2 rounded-pill search" type="search" placeholder="&#xF002; Search"/>
        </form>
        <ul class="nav nav-pills">
          <li class="nav-item ">
            <a class="nav-link header"  href="#">Daily</a>
          </li>
          <li class="nav-item ">
            <a class="nav-link header" href="#">Monthly</a>
          </li>
          <li class="nav-item ">
            <a class="nav-link header" href="#">Yearly</a>
          </li>
        </ul>

        <!-- notification -->
        
        <ul class="nav ">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle header" data-toggle="dropdown" href="#" role="button" >
              <i class="fa fa-shopping-bag header" ></i>
              <span class="badge rounded-pill badge-notification bg-danger">1</span>
            </a>
            <div class="dropdown-menu customerOrder">
                <h3 class="dropdown-header">Customers Orders</h3>
                <a class="dropdown-item header" href="#">
                    <div class="row">
                      <div class="col-md-9">
                        <span class="customer">CustomerName</span>
                        <span class="productOrdered">productName</span>
                        <span class="productOrdered">productSize</span>
                        <p>+855 11223344</p>
                      </div>
                      <div class="col-md-1">
                        <span><button class="btn btn-secondary">Reject</button></span>
                        <span><button class="btn opt">Accept</button></span>
                      </div>
                    </div> 
                </a>
                <a class="dropdown-item header" href="#">
                    <div class="row">
                      <div class="col-md-9">
                        <span class="customer">CustomerName</span>
                        <span class="productOrdered">productName</span>
                        <span class="productOrdered">productSize</span>
                        <p>+855 11223344</p>
                      </div>
                      <div class="col-md-1">
                        <span><button class="btn btn-secondary">Reject</button></span>
                        <span><button class="btn opt">Accept</button></span>
                      </div>
                    </div> 
                </a>

            </li>
          <li class="nav-item"> 
            <a href="#" class="nav-link">
              <i class='far fa-comment-dots header'></i>
              <span class="badge rounded-pill badge-notification bg-danger">1</span>
            </a>          
          </li>
          <li class="nav-item">  
            <a href="" class="nav-link">
              <i class="fas fa-bell header"></i>
              <span class="badge rounded-pill badge-notification bg-danger">1</span>
            </a>          
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle header" data-toggle="dropdown" href="#" role="button" >
              <i class="fas fa-user-circle user" style="margin-right: 8%;
              font-size: 1.5vw;"></i>Ginzy
            </a>
            <div class="dropdown-menu">
                <a class="dropdown-item header" href="#">My profile</a>
                <a class="dropdown-item header" href="#">Setting</a>
                <a class="dropdown-item header" href="#">Log out</a>
            </div>
            </li>
        </ul>
    </nav>

    <table class="table productTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="productInfo">1</td>
            <td class="productInfo">Productname</td>
            <td class="productInfo">category1</td>
            <td class="productInfo">10</td>
            <td class="productInfo">$100</td>

            <td>
                <button class="btn btn-light"><i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i></button>
                <button class="btn btn-light"><i class="fa fa-trash fa-lg" aria-hidden="true"></i></button>
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scope>
    .header {
  color: #d60265;
}
.nav-link:active {
  background-color: #f165a7;
}
.nav-link:focus {
  background-color: #f165a7;
}
.form-control {
  border: 1px solid #d60265;
}
.search {
  font-family: Arial, FontAwesome;
}
.search::placeholder {
  color: #d60265;
}
.dropdown-toggle::after {
  content: none;
}
.dropdown-header {
  color: #d60265;
  font-size: 20px;
  font-weight: 900;
}
.btn.opt {
  background-color: #d60265;
  color: white;
}
.customerOrder {
  left: auto;
  right: 0;
  width: 650px;
}
.productOrdered {
  color: black;
}

</style>