<style lang="sass">
</style>

<template>

<div class="wrapper">
    <navbar :alias="alias" :site-name="siteName"></navbar>
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
</div>

</template>

<script>

import navbar from './navbar';

export default {
    data() {
        return {
        }
    },
    computed: {
        siteName() {
            return this.$store.state.ztData.siteName;
        },
        alias() {
            return this.$store.state.alias;
        }
    },
    mounted(){
    },
    components: {
        navbar
    }
}

</script>
