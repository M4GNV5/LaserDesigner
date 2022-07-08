<template>
    <b-container fluid>
        <AppBar/>
        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
            {{copyLink}} wurde in die Zwischenablage kopiert
        </b-alert>

        <b-row class="mb-2 text-center">
            <b-col cols="7">
                <b-container style="height: 100vh;">
                    <b-img style="cursor: pointer;" @click="imageLink=(i)" v-for="i in 4" :key="i" class="my-1 mx-1" width="200" :src="require(('~/assets/Dummy'+i+'.jpg'))">Hello</b-img>                    
                </b-container>
            </b-col>
            <b-col cols="5">
                <b-container style="background-color: lightgrey; height: 100vh;">
                    <b-row class="mb-2 mt-1 justify-content-center">
                        <b-img contain width="300" :src="require(('~/assets/Dummy'+imageLink+'.jpg'))"></b-img>
                    </b-row>
                    <b-row class="mb-2 justify-content-center">
                        <b-button @click="copyToClipBoard('http://localhost:3000/overview'), showDismissibleAlert=true">Copy Link</b-button>
                    </b-row>
                    <b-row class="mb-2 justify-content-center">
                        <b-button v-if="imageLink != ''">Bearbeiten</b-button>
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
                dismissSecs: 10,
                dismissCountDown: 0,
                showDismissibleAlert: false,
                showAlert: false,
                message: "This is a message",
                copyLink: "",
                imageLink: "1",
            }
        },
        methods: {
            copyToClipBoard(textToCopy: string) {
                navigator.clipboard.writeText(textToCopy); 
                //@ts-ignore
                this.copyLink = textToCopy 
            },

        }
    })

</script>

<style scoped>

</style>