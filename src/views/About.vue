<template>
  <div class="about">
    <section class="hero">
      <div class="bd-example">
        <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-caption d-none d-md-block">
              <h1>LOVE x TECH x LIFE</h1>
              <h2>All the quality products you need.</h2>
            </div>
            <div class="carousel-item active">
              <div
                style="background-image:url(https://images.unsplash.com/photo-1500726726099-3f759a2eaa99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60)"
                class="d-block w-100"
              ></div>
            </div>
            <div class="carousel-item">
              <div
                style="background-image:url(https://images.unsplash.com/photo-1504610926078-a1611febcad3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80)"
                class="d-block w-100"
                alt="..."
              ></div>
            </div>
            <div class="carousel-item">
              <div
                style="background-image:url(https://images.unsplash.com/photo-1518719028738-e7262020a932?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=525&q=60)"
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

    <section class="types py-5 mt-sm-6">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-lg-4 mt-1">
            <router-link to="/shop/tech" class="btn btn-link text-white card-hover">
              <div class="card border-0 text-center text-white">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                  alt="Card image"
                  class="card-img"
                />
                <div class="card-img-overlay d-flex align-items-center">
                  <div class="w-100">
                    <h2 class="display-4 mb-4">Tech</h2>Shop now
                    <i class="fa-arrow-right fa ml-2"></i>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-md-6 col-lg-4 mt-1">
            <router-link to="/shop/game" class="btn btn-link text-white card-hover">
              <div class="card border-0 text-center text-white">
                <img
                  src="https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                  alt="Card image"
                  class="card-img"
                />
                <div class="card-img-overlay d-flex align-items-center">
                  <div class="w-100">
                    <h2 class="display-4 mb-4">Game</h2>Shop now
                    <i class="fa-arrow-right fa ml-2"></i>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-md-6 col-lg-4 mt-1">
            <router-link to="/shop/outdoor" class="btn btn-link text-white card-hover">
              <div class="card border-0 text-center text-white">
                <img
                  src="https://images.unsplash.com/photo-1480434945668-94be06bbd507?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80"
                  alt="Card image"
                  class="card-img"
                />
                <div class="card-img-overlay d-flex align-items-center">
                  <div class="w-100">
                    <h2 class="display-4 mb-4">Outdoor</h2>Shop now
                    <i class="fa-arrow-right fa ml-2"></i>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "about"
};
</script>
