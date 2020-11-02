<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1, table"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Saisie des temps</v-toolbar-title>

      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
  import getDays from '../api/getDays.js'

  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Collaborateur',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'janvier', value: 'janvier' },
        { text: 'février', value: 'fevrier' },
        { text: 'Mars', value: 'mars' },
        { text: 'Avril', value: 'avril' },
        { text: 'Mai', value: 'mai', sortable: false },
        { text: 'Juin', value: 'juin', sortable: false },
        { text: 'Juillet', value: 'juillet', sortable: false },
        { text: 'Aout', value: 'aout', sortable: false },
        { text: 'Septembre', value: 'septembre', sortable: false },
        { text: 'Octobre', value: 'octobre', sortable: false },
        { text: 'Novembre', value: 'novembre', sortable: false },
        { text: 'Décembre', value: 'decembre', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.initialize()
    },
    methods: {
      initialize () {
        this.desserts = getDays.getDays()
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Êtes-vous sur de vouloir supprimer cette ligne?') && this.desserts.splice(index, 1)
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

<style scoped>

.table {
  margin-left: 10px;
  margin-right: 10px;
}


</style>