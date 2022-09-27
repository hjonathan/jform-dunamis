<template>
  <div class="text-center">
    <v-card
      class="pt-6 mx-auto"
      flat
      color="transparent"
      v-if="forms && forms.length === 0"
    >
      <v-card-text>
        <v-icon style="opacity: 0.7; font-size: 80px">mdi-drawing-box</v-icon>

        <h3 class="text-h5 mb-2 grey--text text--darken-2">
          Welcome to Json Forms
        </h3>
        <div class="grey--text mb-2">
          All your forms live here, You can create a form
        </div>

        <v-btn
          class="vpm-action-editor-btn"
          color="primary"
          elevation="0"
          plain
          small
          @click="showTemplates"
        >
          <v-icon class="me-1" small>mdi-square-edit-outline</v-icon>
          Create
        </v-btn>
      </v-card-text>
      <v-divider></v-divider>
    </v-card>

    <v-card v-else class="pt-6 mx-auto" flat color="transparent">
      <v-data-table
        :headers="headers"
        :items="forms"
        sort-by="name"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-icon style="opacity: 0.7; font-size: 40px"
              >mdi-drawing-box</v-icon
            >
            <v-spacer></v-spacer>
            <div class="d-flex justify-center">
              <v-card
                flat
                class="pa-2 ma-2 d-flex justify-center"
                min-width="600"
                min-height="60"
              >
                <v-row align="center" justify="center">
                  <v-col align="center">
                    <v-text-field
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                      v-model="search"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card>
            </div>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 dark"
          >Are you sure you want to delete this item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import { computed, defineComponent, reactive, ref } from '@vue/composition-api';
import store from '../../store';

const MainPanelDashboard = defineComponent({
  name: 'MainPanelDashboard',
  components: {},
  setup(props: any) {
    let search = ref(''),
      dialg = ref(false),
      dialogDelete = ref(false),
      headers = ref([
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Description', value: 'description' },
        { text: 'Category', value: 'category' },
        { text: 'Type', value: 'type' },
        { text: 'Modified', value: 'modified' },
        { text: 'Created', value: 'created' },
        { text: 'Actions', value: 'actions', sortable: false },
      ]),
      editedIndex = ref(-1),
      editedItem = ref({
        name: '',
        description: '',
        category: '',
        type: '',
      }),
      defaultItem = ref({
        name: '',
        description: '',
        category: '',
        type: '',
      });
    return {
      search,
      dialg,
      dialogDelete,
      headers,
      editedIndex,
      editedItem,
      defaultItem,
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
    forms: function () {
      return this.$store.get('dashboard@forms');
    },
  },

  watch: {
    dialog(val: any) {
      val || this.close();
    },
    dialogDelete(val: any) {
      val || this.closeDelete();
    },
  },

  methods: {
    editItem(item: any) {
      this.$store.dispatch('app/setSchema', {
        schema: item.schemas.schema,
      });
      this.$store.dispatch('app/setUiSchema', {
        uiSchema: item.schemas.uiSchema,
      });
      //set form information
      this.$store.dispatch('app/setInfomation', {
        name: item.name,
        description: item.description,
        category: item.category,
        type: item.type,
      });
      // Load the form editor view with the 'Use This Template' button.
      let activityBar = { id: 'activity-json-form-editor' },
        mainPanel = { id: 'main-editor' },
        actionsBar = { id: 'actions-editor' },
        sideBar = { id: 'side-bar-pallete' };
      store.dispatch('viewManager/setAllViews', {
        activityBar,
        sideBar,
        mainPanel,
        actionsBar,
      });
    },

    deleteItem(item: any) {
      this.editedIndex = this.forms.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.forms.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.forms[this.editedIndex], this.editedItem);
      } else {
        this.forms.push(this.editedItem);
      }
      this.close();
    },
    showTemplates() {
      let mainPanel = { id: 'main-dashboard-templates' };
      store.dispatch('viewManager/setAllViews', {
        mainPanel,
      });
    },
  },
});
export default MainPanelDashboard;
</script>
<style>
.vpm-action-dashboard-btn {
  text-transform: initial;
  letter-spacing: normal;
}
</style>
