<template>
  <div class="my-2">
    <v-btn
      class="vpm-action-editor-btn justify-end"
      color="primary"
      plain
      small
      @click="backPanel"
    >
      <v-icon class="me-1" small>mdi-arrow-left</v-icon>
      Back
    </v-btn>
    <v-card-title>
      <span class="caption font-weight-bold">Validations</span>
    </v-card-title>

    <v-card elevation="0" color="transparent" class="mx-4">
      <v-row>
        <v-col cols="9">
          <v-combobox
            class="caption"
            persistent-placeholder
            v-model="select"
            :items="rules"
            label="Rules"
            outlined
            dense
          >
          </v-combobox>
        </v-col>
        <v-col cols="3">
          <v-btn class="vpm-btn float-end" color="primary" @click="addRule">
            Add
          </v-btn>
        </v-col>
      </v-row>

      <v-data-iterator
        :items="rulesSelected"
        item-key="id"
        :items-per-page="4"
        hide-default-footer
      >
        <template v-slot:no-data
          ><span class="caption"> This field have not rules</span>
        </template>
        <template v-slot:default="{ items, isExpanded, expand }">
          <v-card v-for="item in items" :key="item.id" class="caption" outlined>
            <v-card-title>
              <span class="caption">{{ item.text }}</span>
              <v-spacer></v-spacer>
              <v-btn
                v-if="item?.rule != undefined"
                icon
                small
                color="warning"
                :input-value="isExpanded(item)"
                @click="
                  () => {
                    if (isExpanded(item)) {
                      expand(item, false);
                    } else {
                      expand(item, true);
                    }
                  }
                "
              >
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
              <v-btn @click="deleteRule(item)" icon small color="error">
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text v-if="isExpanded(item) && item?.rule != undefined">
              <v-row>
                <v-col>
                  <v-text-field
                    outlined
                    dense
                    holder
                    v-model="item.rule"
                    :placeholder="item.ruleOptions.placeholder"
                    :messages="item.messages"
                    class="caption"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </template>
      </v-data-iterator>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { dynamicPropertyDefault } from '../PropertiesPanelComp';
const rulesDefault = [
  {
    id: 'required',
    text: 'Required',
  },
  {
    id: 'requiredIf',
    text: 'Required If',
    rule: '',
    messages: ['The field under validation must be present and not empty'],
  },
  {
    id: 'maxLength',
    text: 'Max lenght',
    rule: '',
    messages: ['Validate that an attribute is no greater than a given length'],
  },
  {
    id: 'minLength',
    text: 'Min lenght',
    rule: '',
    messages: ['Validate that an attribute is at least a given length'],
  },
  {
    id: 'regExp',
    text: 'Regular expression',
    rule: '',
    messages: ['Validate that a regular expression'],
  },
  {
    id: 'afterDate',
    text: 'After Date',
    rule: '',
    ruleOptions: {
      placeholder: 'YYYY/MM/DD',
    },
    messages: ['The field under validation must be afer given date'],
  },
  {
    id: 'afterEqualDate',
    text: 'After or equal to date',
    rule: '',
    ruleOptions: {
      placeholder: 'YYYY/MM/DD',
    },
    messages: ['The field under validation must be after given date'],
  },
  {
    id: 'beforeDate',
    text: 'Before Date',
    rule: '',
    ruleOptions: {
      placeholder: 'YYYY/MM/DD',
    },
    messages: ['The field under validation must be before given date'],
  },
  {
    id: 'beforeEqualDate',
    text: 'Before or equal to date',
    rule: '',
    ruleOptions: {
      placeholder: 'YYYY/MM/DD',
    },
    messages: ['The field under validation must be before given date'],
  },
  {
    id: 'alpha',
    text: 'Alpha',
    messages: ['The field under validation must be alpha'],
  },
  {
    id: 'alphanumeric',
    text: 'Alphanumeric',
    messages: ['The field under validation must be alphanumeric'],
  },
  {
    id: 'url',
    text: 'URL',
    messages: ['The field under validation must be url'],
  },
  {
    id: 'email',
    text: 'Email',
    messages: ['The field under validation must be email format'],
  },
  {
    id: 'date',
    text: 'Date',
    messages: ['The field under validation must be date format'],
  },
];

const ValidationPropExt = defineComponent({
  name: 'ValidationPropExt',
  components: {},
  emits: ['input', 'change', 'backPanel'],
  props: ['value', 'config'],
  setup(props: any, context: any) {
    //References Reactive
    const rules = ref(rulesDefault);
    const rulesSelected = ref([]);
    let select: any = ref({
      id: null,
      text: null,
    });
    //Methods
    const addRule = () => {
      if (select.value.id) {
        rulesSelected.value.push(select.value);
      }
    };
    const deleteRule = (item) => {
      const index = rulesSelected.value.findIndex(
        (rule: any) => rule.id == item.id
      );
      if (index != -1) {
        rulesSelected.value.splice(index, 1);
      }
    };

    onMounted(() => {
      //Set orientation
      const rls = [];
      if (props?.config?.forEach) {
        props.config.forEach((rule: any) => {
          const index = rulesDefault.findIndex(
            (ruleDef) => ruleDef.id == rule.id
          );
          if (index != -1) {
            rls.push(rulesDefault[index]);
          }
        });
        rulesSelected.value = rls;
      }
    });

    return {
      ...dynamicPropertyDefault(props, context),
      backPanel() {
        const rulesFormat = rulesSelected.value.map((r) => {
          return { id: r.id, value: r.rule };
        });
        context.emit('backPanel', {
          validation: rulesFormat,
        });
      },
      select,
      rulesSelected,
      deleteRule,
      rules,
      addRule,
    };
  },
});
export default ValidationPropExt;
</script>
<style>
.vpm-btn {
  text-transform: initial;
  letter-spacing: normal;
}
</style>
