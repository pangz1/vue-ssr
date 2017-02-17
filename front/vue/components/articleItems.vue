<template>
    <ul class="article-list">
        <li class="article-li" v-for="item in articleItems">
            <router-link :to="'/' + alias + '/' + item.contentId" class="nav-item-a" exact>
                <div class="article-li-content">
                    <h3 class="article-title">{{ item.title }}</h3>
                    <p class="article-desc" :class="{ 'ellipsis': item.articleImg }">{{ item.autoSummary }}</p>
                </div>
                <img v-if="item.articleImg" :src="item.articleImg" alt="" class="article-cover">
            </router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        computed: {
            alias() {
                return this.$store.state.alias;
            }
        },
        props: ['articleItems']
    }
</script>

<style lang="sass">
.border-half-pixel{
    position: relative;
    &::after{
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-top: 1px solid #e7e7e7;
        transform: scaleY(.5);
    }
}

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

.article{
    margin-bottom: 15px;
    &-list{
        background: #fff;
    }
    &-li{
        padding: 16px 16px 16px 14px;
        @extend .border-half-pixel;
        &-wrap{
            display: flex;
        }
        &-content{
            flex: 1;
            max-width: 100%;
        }
    }
    &-title{
        font-size: 16px;
        color: #4a4a4a;
        line-height: 21px;
        margin-bottom: 8px;
        @include ellipsis;
    }
    &-desc{
        color: #999;
        line-height: 18px;
        @include ellipsis(100%, 2);
        &.ellipsis{
            -webkit-line-clamp: 1;
        }
    }
    &-cover{
        flex: none;
        width: 100px;
        height: 75px;
        margin-left: 20px;
    }
}

.tip-nomore{
    text-align: center;
    padding: 10px 0;
    color: #999;
}

</style>