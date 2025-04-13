<script setup lang="ts">
defineProps<{
  label: string
  placeholder: string
}>()
const model = defineModel()
</script>
<template>
  <div class="form__group field">
    <input type="input" v-model="model" class="form__field" :placeholder="placeholder" />
    <label for="name" class="form__label">{{ label }}</label>
  </div>
</template>
<style scoped>
.form__group {
  position: relative;
  padding: 20px 0 0;
  width: 100%;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: none;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 17px;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}

.form__field::placeholder {
  color: transparent;
}

.form__field:placeholder-shown ~ .form__label {
  font-size: 17px;
  cursor: text;
  top: 20px;
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 17px;
  color: #9b9b9b;
  pointer-events: none;
}

.form__field:focus {
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, oklch(0.837 0.128 66.29), oklch(0.705 0.213 47.604));
  border-image-slice: 1;
}

.form__field:focus ~ .form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 17px;
  color: oklch(0.705 0.213 47.604);
  font-weight: 700;
}

.form__field:required,
.form__field:invalid {
  box-shadow: none;
}
</style>
