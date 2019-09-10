<template>
  <footer>
    <div class="subscript bg-primary py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div
            class="col-lg-5 d-flex align-items-center justify-content-md-start justify-content-center"
          >
            <!-- <img src="/img/logo-light.svg" width="40" alt="logo white"> -->
            <span class="text-white h4 mb-0 mx-4 text-nowrap">Subscribe To Learn More.</span>
          </div>
          <div class="col-lg-5 mt-4 mt-lg-0">
            <form
              class="form-square form-square-withicon d-flex align-items-center justify-content-between"
              action="#"
              method="POST"
            >
              <label for="subscription" class="material-icons form-square-icon-left">email</label>
              <input class="form-input" type="email" id="email" />
              <a href="javascript:;" class="bg-accent btn btn-lg d-flex" >
                <i class="material-icons">arrow_forward</i>
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom bg-light">
      <div class="container pt-5 pb-5">
        <div class="contact row justify-content-center d-flex">
          <div class="col-md-5">
            <a class=".h1" href="#">皮客幫</a>
            <div class="contact-info mt-3 list-unstyled">
              <li>服務時間：週一至週五 10:00-18:30</li>
              <li>
                <a href="tel:+01-1234-5678">01-1234-5678</a>
              </li>
              <li>110 台北市信義區光復南路133號</li>
            </div>
    
          </div>
          <div class="col-md-5 text-right d-none d-md-block">
          </div>
        </div>
      </div>
    </div>
    <div class="py-3">
      <div class="align-self-end mt-4 mt-sm-0 mr-auto text-center">
        <div class="px-2">資料、圖片來源皆來自網路，非商業使用，僅用來做為學習用途。</div>
        <div>&copy;2019 HongJyun - All Rights Reserved</div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Mainfooter"
};
</script>
