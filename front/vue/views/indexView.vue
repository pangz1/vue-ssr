<template>
    <div class="content">
        <course-cover :class-data="classData[0]"></course-cover>
        <article-items :article-items="articleItems"></article-items>
    </div>
</template>

<script>
    import courseCover from '../components/courseCover.vue';
    import articleItems from '../components/articleItems';

    export default {
        computed: {
            classData() {
                return this.$store.state.courseListItems;
            },
            articleItems() {
                return this.$store.state.articleItems;
            }
        },
        components: {
            courseCover,
            articleItems
        },
        preFetch ({ state, dispatch, commit }) {
            let alias = state.route.params.alias;
            
            return Promise.all([
                dispatch('FETCH_ZT', { alias }),
                dispatch('FETCH_COURSE_ITEMS'),
                dispatch('FETCH_ARTICLE_ITEMS')
            ])
        },
        beforeMount() {
            return Promise.all([
                this.$store.dispatch('FETCH_COURSE_ITEMS'),
                this.$store.dispatch('FETCH_ARTICLE_ITEMS')
            ]);
        }
    }
</script>

