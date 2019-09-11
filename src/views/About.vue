<template>
  <div class="about">
    <section class="hero">
      <div class="bd-example">
        <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-caption">
              <h1>LEATHER x LIFE x STORY</h1>
              <h2 class="d-none d-md-block">An unique product for you.</h2>
            </div>
            <div class="carousel-item active">
              <div
                style="background-image:url(https://images.unsplash.com/photo-1490427712608-588e68359dbd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)"
                class="d-block w-100"
              ></div>
            </div>
            <div class="carousel-item">
              <div
                style="background-image:url(https://images.unsplash.com/photo-1473445361085-b9a07f55608b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1384&q=80)"
                class="d-block w-100"
                alt="..."
              ></div>
            </div>
            <div class="carousel-item">
              <div
                style="background-image:url(https://images.unsplash.com/photo-1504884060002-619141ede057?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)"
                class="d-block w-100"
                alt="..."
              ></div>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </section>
    <section class="bg-light history py-6">
      <div class="container container text-center">
        <h1 class="mb-3">關於皮客幫</h1>
        <p
          class="history_content"
        >皮客幫於1965 年創立，堅持所有皮革製品在當地進行製造生產。為了更加貼近使用者的日常需求，職人們將嚴謹的匠藝精神逐一投入其中，致力打造出最舒適、耐用的皮革製品。我們期望您能在生活裡愛用職人親手製作的皮革物品，相信在未來的五年、十年中，皮革製品都將會是您的最佳夥伴。</p>
      </div>
    </section>

    <section class="categories types py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 mt-1">
            <router-link to="/shop/斜肩背包" class="text-white card-hover">
              <div class="card border-0 text-center text-white">
                <img
                  src="https://images.unsplash.com/photo-1510783891783-80cda42ebfd2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80"
                  alt="Card image"
                  class="card-img"
                />
                <div class="card-img-overlay d-flex align-items-center">
                  <div class="w-100">
                    <h2 class="display-4 mb-4">斜背包</h2>Shop now
                    <i class="fa-arrow-right fa ml-2"></i>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-lg-4 mt-1">
            <router-link to="/shop/後背包" class="text-white card-hover">
              <div class="card border-0 text-center text-white">
                <img
                  src="https://images.unsplash.com/photo-1549943872-f7ff0b2b51be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                  alt="Card image"
                  class="card-img"
                />
                <div class="card-img-overlay d-flex align-items-center">
                  <div class="w-100">
                    <h2 class="display-4 mb-4">後背包</h2>Shop now
                    <i class="fa-arrow-right fa ml-2"></i>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-lg-4 mt-1">
            <router-link to="/shop/皮革配件" class="text-white card-hover">
              <div class="card border-0 text-center text-white">
                <img
                  src="https://images.unsplash.com/photo-1504193374995-f7da76b87f13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=676&q=80"
                  alt="Card image"
                  class="card-img"
                />
                <div class="card-img-overlay d-flex align-items-center">
                  <div class="w-100">
                    <h2 class="display-4 mb-4">皮革配件</h2>Shop now
                    <i class="fa-arrow-right fa ml-2"></i>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div class="col-md-6 mx-auto">
          <router-link to="/shop" class="d-block btn btn-lg btn-primary mx-auto my-5">前往所有商品</router-link>
        </div>
      </div>
    </section>

    <section class="bg-light location py-5">
      <div class="container text-center">
        <h1 class="my-3">實體店面</h1>
        <iframe
          class="mb-3"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57814.91903898905!2d121.49606973267963!3d25.08721889499535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abbf23ce4b3b%3A0xc82b0f87ff7df9dc!2z5p2-5bGx5paH5Ym15ZyS5Y2A!5e0!3m2!1szh-TW!2stw!4v1568020153774!5m2!1szh-TW!2stw"
          width="600"
          height="450"
          frameborder="0"
          style="border:0;"
          allowfullscreen
        ></iframe>
        <p class="history_content">110 台北市信義區光復南路133號</p>
        <p class="history_content">01-1234-5678</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'about'
}
</script>
