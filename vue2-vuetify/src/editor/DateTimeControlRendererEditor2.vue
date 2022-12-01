<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
  >
    <CustomControlWrapper
      v-bind="{ labelOrientation, computedLabel, labelCols }"
    >
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
            :id="control.id + '-input'"
            :class="styles.control.input"
            :disabled="!control.enabled"
            :autofocus="appliedOptions.focus"
            :placeholder="placeholder"
            :persistent-placeholder="labelOrientation() == 'inherit'"
            :label="labelOrientation() == 'inherit' ? computedLabel : null"
            :persistent-hint="persistentHint()"
            hint=""
            :required="control.required"
            :error-messages="control.errors"
            :value="valueChangeFormat"
            @focus="isFocused = true"
            @blur="
              blurChangeFormat();
              isFocused = false;
            "
            append-icon="mdi-calendar"
            v-bind="attrs"
            v-on="on"
            readonly
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          v-if="inputFormat === 'date' || inputFormat === 'date-time'"
          :max="maxDate"
          :min="minDate"
          @input="inputFormat !== 'date-time' ? (menu = false) : (menu = true)"
          no-title
          scrollable
          @change="onChange"
        >
        </v-date-picker>
        <v-time-picker
          @change="onChange"
          v-model="time"
          v-if="inputFormat === 'time' || inputFormat === 'date-time'"
          @input="inputFormat !== 'date-time' ? (menu = false) : (menu = true)"
        ></v-time-picker>
      </v-menu>
    </CustomControlWrapper>
  </control-wrapper>
</template>

<script lang="ts">
//@ts-nocheck
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent, ref } from '../vue';
import {
  rendererProps,
  useJsonFormsControl,
  RendererProps,
} from '@jsonforms/vue2';
import { default as ControlWrapper } from '../controls/ControlWrapper.vue';
import { useVuetifyControl } from '../util';
import { VTextField, VMenu, VDatePicker, VTimePicker, VBtn } from 'vuetify/lib';
import CustomControlWrapper from '../controls/CustomControlWrapper.vue';
import {
  dateNow,
  dateTimeNow,
  timeNow,
  formatDate,
  parseDate,
  formatTime,
  formatDateTime,
  parseDateTime,
} from '../util/composableDateTime';

const controlRenderer = defineComponent({
  name: 'date-time-control-renderer-editor',
  components: {
    ControlWrapper,
    VTextField,
    VMenu,
    VDatePicker,
    VTimePicker,
    VBtn,
    CustomControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    let date = ref(dateNow());
    let dateFormatted = ref(formatDate(dateNow()));
    let time = ref(timeNow());
    let timeFormatted = ref(formatTime(timeNow()));
    let dateTime = ref(dateTimeNow().replace('T', ' '));
    let dateTimeFormatted = ref(
      formatDateTime.apply(this, [dateTimeNow().replace('T', ' ')])
    );

    function blurChangeFormat(this: any) {
      if (this.inputFormat === 'date') {
        this.date = parseDate(
          'value' in dateFormatted ? dateFormatted.value : dateFormatted
        );
      }
      if (this.inputFormat === 'time') {
        this.time = formatTime(
          'value' in timeFormatted ? timeFormatted.value : timeFormatted
        );
      }
      if (this.inputFormat === 'date-time') {
        this.dateTime = parseDateTime(
          'value' in dateFormatted ? dateFormatted.value : dateFormatted,
          'value' in timeFormatted ? timeFormatted.value : timeFormatted
        );
      }
    }

    return {
      ...useVuetifyControl(useJsonFormsControl(props)),
      menu: false,
      date,
      dateFormatted,
      time,
      timeFormatted,
      dateTime,
      dateTimeFormatted,
      formatDate,
      parseDate,
      formatTime,
      formatDateTime,
      parseDateTime,
      blurChangeFormat,
    };
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
      if (this.inputFormat === 'date-time') {
        this.dateTimeFormatted = this.formatDateTime(
          this.date + ' ' + this.time
        );
      }
    },
    time() {
      this.timeFormatted = this.formatTime(this.time);
      if (this.inputFormat === 'date-time') {
        this.dateTimeFormatted = this.formatDateTime(
          this.date + ' ' + this.time
        );
      }
    },
    dateTime() {
      this.dateTimeFormatted = this.formatDateTime(this.dateTime);
    },
  },
  computed: {
    hint(): string {
      return this.control.uischema.options?.hint ?? '';
    },
    placeholder(): string {
      return this.control.uischema.options?.placeholder ?? '';
    },
    inputFormat(): string | undefined {
      return this.control.schema?.format ?? '';
    },
    valueChangeFormat(): string | null {
      if (this.inputFormat === 'date') {
        return this.dateFormatted;
      }
      if (this.inputFormat === 'time') {
        return this.timeFormatted;
      }
      if (this.inputFormat === 'date-time') {
        return this.dateTimeFormatted;
      }

      return null;
    },
    maxDate(): string {
      let max = this.control.uischema.options?.maxDate;
      if (max) {
        let min = this.control.uischema.options?.minDate;
        let current = new Date(this.date);
        max = new Date(max);

        if (current > max) {
          min = min ? new Date(min) : '';
          if (!min || !(max < min)) {
            this.date = max.toISOString().split('T')[0];
          }
        }

        if (min) {
          max = max < min ? min.toISOString() : new Date(max).toISOString();
          return max;
        }

        return max.toISOString() ?? '';
      }
      return max ?? '';
    },
    minDate(): string {
      let min = this.control.uischema.options?.minDate;
      if (min) {
        let max = this.control.uischema.options?.maxDate;
        let current = new Date(this.date);
        min = new Date(min);

        if (current < min) {
          max = max ? new Date(max) : '';
          if (!max || !(min > max)) {
            this.date = min.toISOString().split('T')[0];
          }
        }

        if (max) {
          min = min > max ? max.toISOString() : new Date(min).toISOString();
          return min;
        }

        return min.toISOString() ?? '';
      }
      return min ?? '';
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, uiTypeIs('DateTime')),
};
</script>
