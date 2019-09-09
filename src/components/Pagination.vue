<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li v-if="pages.has_pre != undefined &&pages.has_pre" class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="getPagination(pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        :class="{active : page === pages.current_page}"
        v-for="page in pages.total_pages"
        :key="page"
      >
        <a class="page-link" href="#" @click.prevent="getPagination(page)">{{ page }}</a>
      </li>

      <li v-if="pages.has_next != undefined && pages.has_next" class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="getPagination(pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    getPagination (page = 1) {
      this.$emit('emitPagination', page)
    }
  }
}
</script>
