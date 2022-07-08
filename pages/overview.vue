<template>
    <b-container fluid>
        <AppBar/>
        <b-alert class="alert" v-model="showDismissibleAlert" variant="success"
        dismissible
        >
        <p>{{copyLink}} wurde in die Zwischenablage kopiert</p>
        </b-alert>

        <b-row class="mb-2 text-center">
            <b-col cols="7">
                <b-container style="height: 100vh;">
                    <div style="height:40px;"></div>
                    <h1>Alle Projekte</h1>
                    <b-img style="cursor: pointer;" @click="imageLink=(i)" v-for="i in 4" :key="i" class="my-1 mx-1" width="200" :src="require(('~/assets/Dummy'+i+'.jpg'))">Hello</b-img>                    
                </b-container>
            </b-col>
            <b-col cols="5">
                <b-container style="background-color: lightgrey; height: 100vh;">
                    <div style="height:40px;"></div>
                    <h1>Auswahl</h1>
                    <b-row class="mb-2 pt-1 justify-content-center">
                        <b-img class="mt-16" contain width="300" :src="require(('~/assets/Dummy'+imageLink+'.jpg'))"></b-img>
                    </b-row>
                    <b-row class="mb-2 justify-content-center">
                        <b-button @click="copyToClipBoard('http://localhost:3000/overview')">Copy Link</b-button>
                    </b-row>
                    <b-row class="mb-2 justify-content-center">
                        <b-button to="edit" v-if="imageLink != ''">Bearbeiten</b-button>
                    </b-row>
                    <b-row class="mb-2 justify-content-center">
                        <b-button>
                            <a style="color:white" :href="require('~/assets/Dummy'+imageLink+'.jpg')" download>Herunterladen</a>
                        </b-button>
                    </b-row>
                    <b-row class="mb-2 justify-content-center">
                        <b-button>Alle herunterladen</b-button>
                    </b-row>
                </b-container>
            </b-col>
        </b-row>
    </b-container>

</template>

<script lang="ts">
    export default({
        data () {
            return {
                showDismissibleAlert: false,
                copyLink: "",
                imageLink: "1",
                dismissCountDown: 10,
                dissmissSecs: 3
            }
        },

        methods: {
            copyToClipBoard(textToCopy: string) {
                 //@ts-ignore
                console.log(this.showDismissibleAlert)
                navigator.clipboard.writeText(textToCopy); 

                //@ts-ignore
                this.copyLink = textToCopy 
                //@ts-ignore
                this.showDismissibleAlert = true
                //@ts-ignore
                
                setTimeout(function () {
                    //@ts-ignore
                    this.showDismissibleAlert=false
                    //@ts-ignore
                    console.log(this.showDismissibleAlert)
                }, 2000);
                //@ts-ignore
                
            }


        }
    })

</script>

<style scoped>


</style>