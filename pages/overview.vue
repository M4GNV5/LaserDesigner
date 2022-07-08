<template>
    <b-container fluid>
        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
            {{copyLink}} wurde in die Zwischenablage kopiert
        </b-alert>

        <b-row class="mb-2 text-center">
            <b-col cols="7">
                <b-container color="green">
                    <b-img style="cursor: pointer;" @click="imageLink=(i)" v-for="i in 4" :key="i" class="my-1 mx-1" width="200" :src="require(('~/assets/Dummy'+i+'.jpg'))">Hello</b-img>
                    <a href="" download="Dummy1.jpg">Download here</a>
                    
                </b-container>
            </b-col>
            <b-col cols="5">
                <b-container>
                    <b-row class="mb-2 mt-1 justify-content-center">
                        <b-img v-if="imageLink != ''" contain width="300" :src="require(('~/assets/Dummy'+imageLink+'.jpg'))"></b-img>
                    </b-row>
                    <b-row class="mb-2 justify-content-center">
                        <b-button @click="copyToClipBoard('http://localhost:3000/overview'), showDismissibleAlert=true">Copy Link</b-button>
                    </b-row>
                    <b-row class="mb-2 justify-content-center">
                        <b-button>Bearbeiten</b-button>
                    </b-row>
                    <b-row class="mb-2 justify-content-center">
                        <b-button>Herunterladen</b-button>
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
                imageLink: "",
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