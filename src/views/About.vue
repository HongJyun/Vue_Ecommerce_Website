<template>
  <div class="about">
    <section class="hero">
      <div class="bd-example">
        <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="https://fakeimg.pl/1920x1024/" class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src="https://fakeimg.pl/1920x1024/" class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src="https://fakeimg.pl/1920x1024/" class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </div>
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
            <div class="card border-0 text-center text-white">
              <img
                src="https://d19m59y37dris4.cloudfront.net/sell/1-2-5/img/photo/benjamin-voros-260869-unsplash.b4e74271.jpg"
                alt="Card image"
                class="card-img"
              />
              <div class="card-img-overlay d-flex align-items-center">
                <div class="w-100">
                  <h2 class="display-4 mb-4">Jackets</h2>
                  <a href="category.html" class="btn btn-link text-white">
                    Shop now
                    <i class="fa-arrow-right fa ml-2"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 mt-1">
            <div class="card border-0 text-center text-white">
              <img
                src="https://d19m59y37dris4.cloudfront.net/sell/1-2-5/img/photo/benjamin-voros-260869-unsplash.b4e74271.jpg"
                alt="Card image"
                class="card-img"
              />
              <div class="card-img-overlay d-flex align-items-center">
                <div class="w-100">
                  <h2 class="display-4 mb-4">Jackets</h2>
                  <a href="category.html" class="btn btn-link text-white">
                    Shop now
                    <i class="fa-arrow-right fa ml-2"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 mt-1">
            <div class="card border-0 text-center text-white">
              <img
                src="https://d19m59y37dris4.cloudfront.net/sell/1-2-5/img/photo/benjamin-voros-260869-unsplash.b4e74271.jpg"
                alt="Card image"
                class="card-img"
              />
              <div class="card-img-overlay d-flex align-items-center">
                <div class="w-100">
                  <h2 class="display-4 mb-4">Jackets</h2>
                  <a href="category.html" class="btn btn-link text-white">
                    Shop now
                    <i class="fa-arrow-right fa ml-2"></i>
                  </a>
                </div>
              </div>
            </div>
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
