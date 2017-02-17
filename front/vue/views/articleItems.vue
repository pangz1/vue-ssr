<template>
    <article-items :article-items="articleItems"></article-items>
</template>

<script>
    import articleItems from '../components/articleItems';

    export default {
        computed: {
            articleItems() {
                return this.$store.state.articleItems;
            }
        },
        components: {
            articleItems
        },
        preFetch ({ state, dispatch, commit }) {
            let alias = state.route.params.alias;
            return Promise.all([
                dispatch('FETCH_ZT', { alias }),
                dispatch('FETCH_ARTICLE_ITEMS')
            ])
        },
        beforeMount () {
            let alias = this.$store.state.route.params.alias;
            return Promise.all([
                this.$store.dispatch('FETCH_ZT', { alias }),
                this.$store.dispatch('FETCH_ARTICLE_ITEMS')
            ])
        }
        
    }
</script>