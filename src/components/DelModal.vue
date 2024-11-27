<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            刪除{{ item.title }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">確定要刪除{{ item.title }}?</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            再想一下
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('delete-item')"
          >
            確定刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modelMixins from "../mixins/modalMixins.vue";
export default {
  props: {
    item: {},
  },
  data() {
    return {
      modal: "",
    };
  },

  mixins: [modelMixins],
};
</script>