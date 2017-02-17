<template>
    <main class="detail">
        <div class="detail-main detail-section">
        <h1 class="detail-title">{{ articleDetailData.title }}</h1>
        <div class="detail-info">
            <span class="pub-sitename">{{ siteName }}</span>
            <span class="pub-author" v-if="articleDetailData.author">{{ articleDetailData.author }}</span>
            <time class="pub-date" v-else>{{ articleDetailData.lastUpdateTime }}</time>
        </div>
        <div class="detail-content" v-html="articleDetailData.content"></div>
    </main>
</template>

<script>
    export default {
        computed: {
            siteName() {
                return this.$store.state.ztData.siteName;
            },
            articleDetailData() {
                return this.$store.state.articleDetail;
            }
        },
        preFetch({ state, dispatch, commit }) {
            let { alias, id } = state.route.params;
            return Promise.all([
                dispatch('FETCH_ZT', { alias }),
                dispatch('FETCH_ARTICLE_DETAIL', { id })
            ]);
        },
        beforeMount() {
            let { alias, id } = this.$store.state.route.params;
            return Promise.all([
                this.$store.dispatch('FETCH_ZT', { alias }),
                this.$store.dispatch('FETCH_ARTICLE_DETAIL', { id })
            ]);
        }
    }
</script>

<style lang="sass">
@mixin ellipsis($width: 100%, $line: 0){
    overflow: hidden;
    text-overflow: ellipsis;
    @if $line > 0 {
        display: -webkit-box;
        -webkit-line-clamp: $line;
        -webkit-box-orient: vertical;
    } @else {
        white-space: nowrap;
        max-width: $width;
    }
}
.detail{
    margin-bottom: 15px;
    &-section{
        background: #fff;
        margin-bottom: 15px;
        padding: 16px 15px 20px;
        &:last-of-type{
            margin-bottom: 0;
        }
        &-title{
            font-size: 18px;
            line-height: 20px;
            margin-bottom: 20px;
            color: #333;
            &::before{
                content: '';
                display: inline-block;
                height: 1em;
                border-left: 3px solid #49b849;
                margin-right: 5px;
                vertical-align: -3px;
            }
        }
    }
    &-img-mark{
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-image: linear-gradient(to bottom, rgba(237, 237, 237, 0) 0%, rgba(0, 0, 0, .6) 100%);
    }
    &-title{
        font-size: 22px;
        line-height: 26px;
        margin-bottom: 18px;
        color: #333;
        font-weight: 500;
    }
    &-info{
        margin-bottom: 16px;
        color: #666;
        .pub-sitename,
        .pub-author{
            margin-right: 10px;
            &::after{
                content: '';
                height: 1em;
                display: inline-block;
                padding-right: 10px;
                border-right: 1px solid #666;
                vertical-align: middle;
            }
        }
    }
    &-main{
        padding-top: 20px;
        padding-bottom: 40px;
    }
    &-content{
        font-size: 16px;
        line-height: 30px;
    }
    &-li{
        font-size: 16px;
        color: #4a4a4a;
        line-height: 36px;
        @include ellipsis;
    }
    &-a{
        color: inherit;
    }
}
</style>