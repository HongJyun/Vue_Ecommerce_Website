<template>
  <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <router-link to="/" class="navbar-brand col-sm-3 col-md-2 mr-0">Tech gadgets</router-link>
    <input
      class="form-control form-control-dark w-100"
      type="text"
      placeholder="Search"
      aria-label="Search"
    />
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a href="#" class="nav-link" @click.prevent="signout">登出</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Dashboard_Navbar",
  methods: {
    signout() {
      const api = `${process.env.VUE_APP_API}/logout`;
      const vm = this;
      this.$http.post(api).then(res => {
        console.log(res);
        if (res.data.success) {
          vm.$router.push("/login");
        }
      });
    }
  }
};
</script>
