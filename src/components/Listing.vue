<template>
  <v-data-table
    :headers="headers"
    :items="getListingData"
    :search="search"
    sort-by="u_id"
    class="elevation-1 ma-3"
  >
    <template v-slot:top>
      <!---------Tool Bar----------->
      <v-toolbar color="primary" flat>
          <v-toolbar-title class="white--text" 
            >Table Listing
          </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-card-title class="mr-15">
        </v-card-title>
        <!---------Text Fields Used to Display Data in the Data Table----------->
        <v-dialog v-model="dialog" max-width="500px" persistent>
          <v-card>
            <v-divider></v-divider>
            <br />
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" >
                    <v-text-field
                      outlined
                      dense
                      persistent-hint
                      v-model="donorDetail.u_id"
                      label="Donor Id"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" >
                    <v-text-field
                      outlined
                      dense
                      persistent-hint
                      v-model="donorDetail.blood_group"
                      label="Blood Group"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      dense
                      persistent-hint
                      v-model="donorDetail.name"
                      label="Donor Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      dense
                      persistent-hint
                      v-model="donorDetail.city"
                      label="Donor Address"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Listing",
  data: () => ({
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
      // { text: "Id", value: "name", sortable: false },
      { text: "User Id", value: "userId",sortable: false, },
      { text: "Title", value: "title",  sortable: false,},
      { text: "Body", value: "body",  sortable: false,},
      // { text: "City", value: "city"},
      // { text: "Contact Number", value: "phone", sortable: false },
      // { text: "Actions", value: "actions", sortable: false },
    ],
    donorId: -1,
    editedIndex: -1,
    donorDetail: {},
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
mounted()
{
    console.log("Mounted:"+this.getListingData)
  this.fetchData();
},
  methods: {
    ...mapActions(["fetchListingData"]),
    save() {
      if (this.editedIndex > -1) {
        this.updateDonor({
          donorIndex: this.editedIndex,
          updatedData: this.donorDetail,
        });
      } else {
        this.addDonor(this.donorDetail);
      }
      this.close();
    },

    fetchData()
    {
      console.log("Fetch Data")
      this.fetchListingData().then(
          (response) => {
            if (response.status == 200) {
               console.log("Response is:"+response);
               console.log("Response is:"+this.getListingData);
               //this.getListingData=response.data;
            }
          },
          (error) => {
            console.log("error::", error);
            this.loader = false;
          }
        );


    },
    chat()
    {
      this.$router.push("/Chat")
    },
  },
};
</script>
