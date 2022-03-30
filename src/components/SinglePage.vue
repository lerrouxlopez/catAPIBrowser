<template>
  <CContainer xs class="mt-2">
    <CCard class="mb-3" style="width: 900px;">
      <CButton color="primary" @click="goBack()">Back</CButton>
      <CCardImage orientation="top" :src="cat.url" />
      <CCardBody>
        <CCardTitle><h1>{{cat_details.name}}</h1></CCardTitle>
        <CCardText><h3>Origin: {{cat_details.origin}}</h3></CCardText>
        <CCardText><h5>Temperament: {{cat_details.temperament}}</h5></CCardText>
        <CCardText>{{cat_details.description}}</CCardText>
      </CCardBody>
    </CCard>
  </CContainer>
</template>

<script>
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { 
  CButton,
  CContainer,
  CCard, 
  CCardImage,
  CCardText,
} from '@coreui/bootstrap-vue'
import axios from 'axios';

export default defineComponent({
  name: 'SinglePage',
  components: {
    CButton,
    CCard,
    CCardImage,
    CCardText,
    CContainer
  },
  data: function () {
    return {
        image_id : "",
        cat : [],
        cat_details: []
    }
  },
  created(){
    this.searchImage(this.$route.params.catchAll)
  } ,
  methods: {
    async searchImage(id){
        try{
            axios.defaults.headers.common['x-api-key'] = "b2feb625-8e5f-4e1f-8bcb-0f545c9e8826"
            
            let response = await axios.get('https://api.thecatapi.com/v1/images/'+id )
            this.cat = response.data
            this.cat_details = response.data.breeds[0]
        }catch(err){
            alert("Apologies but we could not load new cats for you at this time! Miau!")
        }
    },
    goBack(){
        this.$router.push("/?breed="+this.cat_details.id)
    }
  },
})
</script>
