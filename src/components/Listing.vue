<template>
  <div>
    <div v-if="!editComp">
      <v-data-table :headers="headers" :items="getListingData" :options.sync="options" :loading="loading" sort-by="id"
        class="elevation-1 ma-3">
        <template v-slot:top>
          <!---------Tool Bar----------->
          <v-toolbar color="primary" flat>
            <v-toolbar-title class="white--text">Table Listing
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ props }">
                <v-btn color="success" dark class="mb-2" v-bind="props" @click="createNew">
                  Create New
                </v-btn>
              </template>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                  <v-btn color="error" variant="text" @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon size="small" class="me-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon size="small" @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </div>
    <div v-else>
      <Edit :userObj="userObj" @goBack="handleEmit" />
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from "vuex";
import Edit from '@/components/Edit.vue'

export default {
  name: "Listing",
  components: { Edit },
  data: () => ({
    options: {
      sortBy: 'id',
      descending: false,
      page: 1,
      itemsPerPage: 5
    },
    loading: false,
    editComp: false,
    userObj: {
    },
    delObj: {
    },
    dialog: false,
    search: "",
    dialogDelete: false,
    dialoginfo: false,
    headers: [
      {
        text: "Id",
        sortable: false,
        value: "id",
      },
      { text: "User Id", value: "userId", sortable: false, },
      { text: "Title", value: "title", sortable: false, },
      { text: "Body", value: "body", sortable: false, },
      { text: "Actions", value: "actions", sortable: false, },
    ],
    donorId: -1,
    editedIndex: -1,
    donorDetail: {},
  }),

  computed: {
    ...mapGetters(["getListingData"]),
  },

  watch: {
    options: {
      handler() {
        this.fetchData();
      },
      deep: true
    },

    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialoginfo(val) {
      val || this.close();
    },
  },
  created() {
   
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions(["fetchListingData"]),

    fetchData() {
      this.loading=true;
      this.fetchListingData(this.options).then(
        (response) => {
          if (response.status == 200) {
            this.loading=false;
          }
        },
        (error) => {
          this.loading=false;
          console.log("Error:", error);
        }
      );


    },
    editItem(item) {
      this.userObj = {};
      this.userObj = item;
      this.editComp = true;
    },

    deleteItem(item) {
      this.delObj = {};
      this.delObj = item;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.dialogDelete = false;
      axios.delete(`https://jsonplaceholder.typicode.com/posts/${this.delObj.id}`).then(res => {
        this.fetchData();
        alert("User Deleted Successfully!");


      }).catch(function (error) {
        this.dialogDelete = false;
        if (error.response) {
          if (error.response.data.status == 404) {
            alert(error.response.data.message);
          }
        }
        else {
          console.log('Error', error.message)
        }
      });
    },

    close() {
      this.dialog = false;
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    createNew() {
      this.$router.push("/create")
    },
    handleEmit() {
      this.editComp = false;
      this.fetchData();
    },

  },
};
</script>
