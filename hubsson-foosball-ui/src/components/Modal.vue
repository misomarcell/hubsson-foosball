<template>
    <!-- <div class="ui modal"> -->
        <!-- {{ message }}
        <div class="actions">
            <div v-if="negativeOption" class="ui black deny button">
                {{ negativeOption }}
            </div>
            <div class="ui positive right labeled icon button">
                {{ positiveOption }}
            <i class="checkmark icon"></i>
            </div>
        </div> -->

    <sui-modal v-model="open">
      <sui-modal-header>Modal!</sui-modal-header>
      <sui-modal-content image>
        <sui-image wrapped size="medium" src="static/images/avatar/large/rachel.png" />
        <sui-modal-description>
          <sui-header>Default Profile Image</sui-header>
          <p>We've found the following gravatar image associated with your e-mail address.</p>
          <p>Is it okay to use this photo?</p>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive @click.native="toggle">
          OK
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    props: {
        message: {
            type: String,
            required: true,
        },
        negativeOption: {
            type: String,
            required: false,
            default: null,
        },
        positiveOption: {
            type: String,
            required: false,
            default: 'OK',
        },
    },
    data() {
        return { open: false };
    },
    methods: {
        toggle() {
            this.open = !this.open;
        },
    },
});
</script>

<style scoped>

</style>
