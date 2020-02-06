<template>
  <div class="dropdown-search">
    <div class="dropdown-row">
      <div class="form-control-wrapper">
        <input
          type="search"
          class="form-control dropdown-search-input"
          :placeholder="searchText"
        />

        <div class="form-icon-box">
          <i
            class="fa fa-search form-icon form-icon-search form-icon-grey"
            aria-hidden="true"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      searchText: {
        String,
      }
    },
  }
</script>
