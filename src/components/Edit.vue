<template>
    <v-card max-width="600" class="pa-8 mt-8 mb-8 rounded mx-auto" outlined>
        <v-card-text xs4>
            <v-layout row class=" mb-n6" wrap justify-space-between>
                <v-flex xs12>
                    <v-layout row wrap justify-space-between>
                        <v-flex xs12 lg12 class="mb-4">
                            <h2 class="font-weight-medium"> Edit Record</h2>
                        </v-flex>
                        <!--Name TextField-->
                        <v-flex xs12 lg12 class="mb-n1">
                            <v-text-field v-model="model.user.title" label="Title" type="text" outlined dense
                                :rules="[() => !!model.user.title || 'This field is required']"></v-text-field>
                        </v-flex>
                        <v-flex xs12 lg12 class="mb-n1">
                            <v-textarea v-model="model.user.body" name="input-7-1" outlined label="Body" auto-grow
                                :rules="[() => !!model.user.body || 'This field is required']"></v-textarea>
                        </v-flex>

                        <v-btn @click="goBack" class="me-4">
                            Back
                        </v-btn>
                        <v-btn :disabled="!model.user.title || !model.user.body" @click="editRecord" class="white--text" color="primary">
                            Save
                        </v-btn>
                        <!-- <v-flex lg2 class=" mt-8 mr-n12">
                            <v-btn :disabled="!model.user.title || !model.user.body" class="mt-n8 white--text" width="100" color="primary" link @click="editRecord">
                                Save
                            </v-btn>
                        </v-flex>
                        <v-flex lg2 class=" mt-8">
                            <v-btn :disabled="!model.user.title || !model.user.body" class="mt-n8 white--text" width="100" color="primary" link @click="editRecord">
                                Save
                            </v-btn>
                        </v-flex> -->
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import axios from 'axios';
export default {
    // props:{
    //     userObj

    // },
    props: ['userObj'],
    data() {
        return {
            model: {
                user: {
                    title: "",
                    body: "",

                }
            },
        };
    },
    computed:
    {
    },

    mounted() {
        this.model.user = this.userObj;
    },
    methods:
    {
        ...mapActions(["Registrations"]),
        editRecord() {
            axios.put(`https://jsonplaceholder.typicode.com/posts/${this.userObj.id}`, this.model.user).then(res => {
                console.log(res.data);
                alert("Record Edited Successfully");
            }).catch(function (error) {
                alert(error);

            })
        },

        goBack() {
            this.$emit('goBack',false);
            //this.$router.push("/")
        },
    },
};
</script>
<style scoped>
.addSpaceRight {
    margin-right: 250px;
}

.reducewidth {
    width: 198px;
}
</style>
  