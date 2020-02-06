<template>
  <div class="raul-card">
    <div class="row align-items-center">
      <div class="col-12 col-lg-3 mb-3 mb-lg-0">
        <div class="row no-gutters">
          <div class="col-auto pr-3" v-if="imageSrc">
            <img
              style="width: 48px; height: 48px;"
              class="img-fluid"
              alt="a0"
              :src="imageSrc"
            >
          </div>

          <div class="col">
            <h3 v-if="cardTitle">{{ cardTitle }}</h3>

            <p class="text-charcoal-50 mb-0" v-if="cardDescription">{{ cardDescription }}</p>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-2 mb-3 mb-lg-0" v-if="hasAddress">
        <span class="text-charcoal-70 mb-0">
          <span class="d-inline-block" v-if="address">{{ address }}, </span>

          <span class="d-inline-block">
            <span v-if="suite">{{ suite }}</span>

            <span v-if="city"> {{ city }}</span>,
          </span>

          <span class="d-inline-block">
            <span v-if="state">{{ state }}</span>

            <span v-if="zip"> {{ zip }}</span>,
          </span>

          <span class="d-inline-block" v-if="country">{{ country }}</span>
        </span>
      </div>

      <div class="col-12 col-lg mb-3 mb-lg-0" v-if="phone">
        <a :href="'tel:' + phone" class="text-charcoal-80 d-inline-block">
          <i class="fa fa-phone text-charcoal-70 pr-2" aria-hidden="true"></i>
          {{ phone }}
        </a>
      </div>

      <div class="col-12 col-lg mb-3 mb-lg-0" v-if="email">
        <a :href="'mailto:' + email" class="text-charcoal-80 d-inline-block">
          <i class="fa fa-envelope-o text-charcoal-70 pr-2" aria-hidden="true"></i>
          {{ email }}
        </a>
      </div>

      <div class="col-12 col-lg" v-if="website">
        <a :href="website" target="_blank" class="text-charcoal-80 d-inline-block">
          <i class="fa fa-globe text-charcoal-70 pr-2" aria-hidden="true"></i>
          {{ website }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      imageSrc: String,

      cardTitle: String,
      cardDescription: String,

      address: String,
      suite: String,
      city: String,
      state: String,
      zip: Number,
      country: String,

      phone: String,
      email: String,
      website: String,
    },

    computed: {
      hasAddress() {
        if (
          this.address ||
          this.suite ||
          this.city ||
          this.state ||
          this.zip ||
          this.country
        ) {
          return true
        }
      }
    }
  }
</script>
