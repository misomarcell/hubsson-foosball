<template>
  <sui-modal v-model="open">
    <sui-modal-header>{{ title }}</sui-modal-header>
    <sui-modal-content>
      <sui-modal-description>
        <h4>{{ message }}</h4>
      </sui-modal-description>
    </sui-modal-content>
    <sui-modal-actions>
      <sui-button negative @click.native="toggle()" v-if="negativeOption">{{ negativeOption }}</sui-button>
      <sui-button positive @click.native="$emit('positive')">{{ positiveOption }}</sui-button>
    </sui-modal-actions>
  </sui-modal>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    message: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: "Are you sure?"
    },
    negativeOption: {
      type: String,
      required: false,
      default: null
    },
    positiveOption: {
      type: String,
      required: false,
      default: "OK"
    }
  },
  data() {
    return {
      open: false
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    }
  }
});
</script>

<style scoped>
</style>
