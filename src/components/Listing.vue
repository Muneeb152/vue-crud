<template>
  <div>
    <div v-if="!editComp">
      <v-data-table :headers="headers" :items="getListingData" sort-by="id" class="elevation-1 ma-3">
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
              <v-card>
                <v-card-title>
                  <span class="text-h5">fffas</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="getListingData.name" label="Dessert name"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="getListingData.calories" label="Calories"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="getListingData.fat" label="Fat (g)"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="getListingData.protein" label="Protein (g)"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue-darken-1" variant="text" @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue-darken-1" variant="text" @click="save">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
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
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    ...mapGetters(["getListingData"]),
  },

  watch: {
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
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions(["fetchListingData"]),

    fetchData() {
      this.fetchListingData().then(
        (response) => {
          if (response.status == 200) {
            console.log(response);
          }
        },
        (error) => {
          console.log("Error:", error);
        }
      );


    },
    editItem(item) {
      console.log("Item is:" + item.title)
      this.editedIndex = this.getListingData.indexOf(item)
      this.editedItem = Object.assign({}, item);
      this.userObj = {};
      this.userObj = item;
      console.log("Item 2 is:" + this.userObj.title)
      this.editComp = true;
      //this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.getListingData.indexOf(item)
      this.editedItem = Object.assign({}, item);
      this.delObj=item;
      console.log("Del ID:"+item.id)
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      // this.desserts.splice(this.editedIndex, 1)
      // this.closeDelete()
      this.dialogDelete = false;
      axios.delete(`https://jsonplaceholder.typicode.com/posts/${this.delObj.id}`).then(res=>{
            this.fetchData();
            alert("User Deleted Successfully!");
           
                
            }).catch(function(error){
              this.dialogDelete = false;
              if(error.response)
          {
            if(error.response.data.status==404)
            {
              alert(error.response.data.message);
            }
          }
          else
          {
            console.log('Error',error.message)
          }
        });
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
    createNew() {
      this.$router.push("/create")
    },
    handleEmit() {
      this.editComp = false;

    },

  },
};
</script>
