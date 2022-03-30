<template>
  <CContainer sm class="mt-2">
    <h1>Cat Browser</h1>
    <label for="breed-select">Breed</label>
    <CFormSelect 
      size="lg"  
      class="mb-3"
      name="breed-select"
      :options=breeds
      v-model=selected_breed>
    </CFormSelect>
    <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 5}" >
      <CCol xs v-if="images.length === 0">
        No cats available
      </CCol>
      <CCol xs v-for="(image) in images" :key="image.id">
        <CCard class="mt-2">
          <CCardImage orientation="top" :src="image.url" />
          <CCardBody>
            <CCardText class="mt-2 mb-2 " align="center"><CButton color="primary" @click="showSinglePage(image.id)">Show details</CButton></CCardText>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CButton color="primary" @click="loadMore()" v-if="!isHidden">Load More</CButton>
  </CContainer>
</template>

<script>
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { 
  CButton,
  CFormSelect,
  CContainer,
  CCard, 
  CRow,
  CCol,
  CCardImage,
  CCardText,
} from '@coreui/bootstrap-vue'
import axios from 'axios';

export default defineComponent({
  name: 'Home',
  components: {
    CButton,
    CContainer,
    CFormSelect,
    CCard,
    CRow,
    CCol,
    CCardImage,
    CCardText,
  },
  data: function () {
    return {
        breeds:[
            'Select Breed',
            ],
        selected_breed: {}, 
        images: [],    
        order:'Desc', 
        page: 1,
        limit: 10,
        pagination_count: 0,
        numpages : 0,
    }
  },
  created(){
    this.getBreeds();
    console.log(this.$route.query.breed)
    if(this.$route.query.breed){
      this.selected_breed = this.$route.query.breed
      this.selected_breed="option == 'test.'"
    }
  } ,
  watch: {
    selected_breed: function() {
      this.images = []
      this.page = 1
      this.pagination_count = 0
      this.isHidden = false
      this.getImages();
    },
  },
  methods: {

    async getBreeds()
    {
        try{
            axios.defaults.headers.common['x-api-key'] = "b2feb625-8e5f-4e1f-8bcb-0f545c9e8826"
            
            let response = await axios.get('https://api.thecatapi.com/v1/breeds/' )
            response.data.forEach((value)=>{
              var obj = {}
              obj["label"] = value.name
              obj["value"] = value.id
              this.breeds.push(obj)
            })
        }catch(err){
            console.log(err)
            alert("Apologies but we could not load new cats for you at this time! Miau!")
        }
    },
    async getImages()
    {
        try{
            
            let query_params = {
                breed_ids: this.selected_breed,
                limit: 8,
                order: this.order,
                page: this.page-1,
            }

            let response = await axios.get('https://api.thecatapi.com/v1/images/search', { params: query_params} ) 
            
            this.pagination_count = response.headers['pagination-count'];
            response.data.forEach((value)=>{
              var obj = {}
              obj["id"] = value.id
              obj["url"] = value.url
              this.images.push(obj)
            })
            console.log("page: ", this.page)
            console.log("rsponse: ", response.data)
            console.log("images array: ", this.images)
            console.log("images length " , this.images.length)
            console.log("pagination count ", this.pagination_count)
            if(this.images.length == this.pagination_count){
              // hide load more button
              this.isHidden = true
            }

            
        }catch(err){
            console.log(err)
            alert("Apologies but we could not load new cats for you at this time! Miau!")
        }
    },
    async loadMore()
    {
        if(this.images != ""){
          this.page++
          await this.getImages()
        }  
    },
    showSinglePage (id)
    {
      this.$router.push("/"+id)
    }
  }
})
</script>
