<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-expand-md navbar-light py-0">
        <button
          class="navbar-toggler d-flex d-md-none align-items-center"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">
          <img
            src="img/logo-all-dark.svg"
            width="220"
            height="40"
            alt
            class="d-none d-md-inline-block"
          />
          <img
            src="img/logotype-sm-dark.svg"
            width="114"
            height="18"
            alt
            class="d-inline-block d-md-none"
          />
        </a>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto font-weight-bold">
            <li class="nav-item active">
              <router-link class="nav-link" to="/">首頁</router-link>
              <span class="sr-only">首頁</span>
            </li>
            <li class="nav-item active">
              <router-link class="nav-link" to="/about">About</router-link>
              <span class="sr-only">首頁</span>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >商品列表</a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">登入</router-link>
            </li>
          </ul>
        </div>
        <a class="nav-link d-flex align-items-center" href="#" tabindex="-1">
          <i class="material-icons">shopping_cart</i>
        </a>
      </nav>
    </header>
    
    <router-view />
  </div>
</template>

<style lang="scss" lang='scss'>
@import "./assets/scss/all.scss";
</style>
