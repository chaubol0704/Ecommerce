<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";
export default {
    components: {
        ContactForm,
    },
    data() {
        return {
            contact: null,
            message: "",
        };
    },
    methods: {
        async addContact(data) {
            
            try {
                console.log(data)
                await ContactService.create(data);
                this.message = "Liên hệ được thêm thành công.";
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.contact = {
            "address": "",
            "email": "",
            "name": "",
            "phone": "",
            "favorite": false
        }
        this.message = "";
    },
};
</script>

<template>
    <div class="page">
        <h4>Thêm Liên hệ</h4>
        <ContactForm :contact="contact" @submit:contact="addContact"/>
        <p>{{ message }}</p>
    </div>
</template>
