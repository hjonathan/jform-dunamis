<template>
  <div>
    <v-container>
      <v-row><v-col>Direction</v-col></v-row>
      <v-row>
        <v-col>
          <v-btn-toggle
            v-model="$vuetify.rtl"
            borderless
            mandatory
            group
            color="primary"
            style="display: grid; grid-template-columns: 1fr 1fr"
          >
            <v-btn :value="false">
              <span class="hidden-sm-and-down">LTR</span>

              <v-icon right> mdi-format-textdirection-l-to-r</v-icon>
            </v-btn>

            <v-btn :value="true">
              <span class="hidden-sm-and-down">RTL</span>

              <v-icon right> mdi-format-textdirection-r-to-l </v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-container>

    <v-divider />

    <v-container>
      <v-row><v-col>Validation</v-col></v-row>
      <v-row>
        <v-col>
          <v-select
            outlined
            persistent-hint
            dense
            v-model="validationMode"
            :items="validationModes"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>

    <v-divider />

    <v-container>
      <v-row><v-col>Locale</v-col></v-row>
      <v-row>
        <v-col>
          <v-select
            :key="keyLocale"
            outlined
            persistent-hint
            dense
            v-model="locale"
            :items="locales"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>

    <v-divider />

    <v-container>
      <v-row><v-col>Options</v-col></v-row>
      <v-row>
        <v-col>
          <v-tooltip bottom>
            <template v-slot:activator="{ on: onTooltip }">
              <v-switch
                v-model="hideRequiredAsterisk"
                label="Hide Required Asterisk"
                v-on="onTooltip"
              ></v-switch>
            </template>
            If asterisks in labels for required fields should be hidden
          </v-tooltip>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-tooltip bottom>
            <template v-slot:activator="{ on: onTooltip }">
              <v-switch
                v-model="readonly"
                label="Read-Only"
                v-on="onTooltip"
              ></v-switch>
            </template>
            If true, sets all controls to read-only
          </v-tooltip>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { sync } from 'vuex-pathify';

export default defineComponent({
  name: 'Common-Settings',

  computed: {
    validationMode: sync('app/jsonforms@validationMode'),
    hideRequiredAsterisk: sync('app/jsonforms@config.hideRequiredAsterisk'),
    showUnfocusedDescription: sync(
      'app/jsonforms@config.showUnfocusedDescription'
    ),
    restrict: sync('app/jsonforms@config.restrict'),
    readonly: sync('app/jsonforms@readonly'),
    locale: sync('app/jsonforms@locale'),
    locales() {
      return this.$store.getters['locales/getSummaryLocales']();
    },
  },

  data: function () {
    return {
      keyLocale: 1,
      validationModes: [
        { text: 'Validate And Show', value: 'ValidateAndShow' },
        { text: 'Validate And Hide', value: 'ValidateAndHide' },
        { text: 'No Validation', value: 'NoValidation' },
      ],
    };
  },
});
</script>
