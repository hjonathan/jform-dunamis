<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        persistent-placeholder
        ref="text"
        dense
        class="caption"
        :value="formatDate(value)"
        readonly
        :label="config.name"
        v-on="on"
        v-bind="attrs"
        @blur="date = parseDate(formatDate(value))"
      >
        <v-icon small slot="append" color="secondary"> mdi-calendar </v-icon>
      </v-text-field>
    </template>
    <v-date-picker
      ref="datePicker"
      no-title
      elevation="12"
      show-current
      v-model="date"
      @change="onDateChange"
    >
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="clearDate">Clear</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script lang="ts">
//@ts-nocheck
import { defineComponent, onMounted, ref } from 'vue';
import { dynamicPropertyDefault } from '../PropertiesPanelComp';
import { VBtn } from 'vuetify/lib';
import { formatDate, parseDate } from '../../Composables/composableDateTime';
const DateProp = defineComponent({
  name: 'DateProp',
  components: { VBtn },
  emits: ['input', 'change', 'visible'],
  props: ['value', 'config'],
  setup(props: any, context: any) {
    let date = ref(null);
    let menu = ref(false);
    let text = ref(null);
    const { twoBind } = dynamicPropertyDefault(props, context);
    const onDateChange = () => {
      menu.value = false;
      twoBind(new Date(date.value).toISOString());
    };

    const clearDate = () => {
      text.value.reset();
      menu.value = false;
      twoBind('');
    };

    onMounted(() => {
      if (props.value) {
        date.value = parseDate(formatDate(props.value));
      }
    });

    return {
      date,
      menu,
      formatDate,
      parseDate,
      onDateChange,
      clearDate,
      text,
    };
  },
});
export default DateProp;
</script>
<style></style>
