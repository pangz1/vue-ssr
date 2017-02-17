<template>
    <section class="section class-cover" v-if="classData">
        <a href="javascript:;" class="class-cover-wrap">
            <img :src="classData.bigCoverUrl" alt="" class="class-cover-img">
            <div class="class-cover-desc">
                <h4 class="class-cover-title">{{ classData.className }}</h4>
                <p class="class-cover-subtitle">{{ classData.subTitle }}</p>
            </div>
        </a>
    </section>
</template>

<script>
    export default {
        props: ['classData']
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
    .class-cover{
        background: #fff;
        position: relative;
        @extend .border-half-pixel;
        &-wrap{
            display: block;
            width: 100%;
        }
        &-img{
            display: block;
            object-fit: cover;
            width: 100%;
            height: 210px;
        }
        &-desc{
            padding: 16px 16px 26px;
            font-size: 16px;
        }
        &-title{
            font-size: 20px;
            line-height: 28px;
            color: #333;
            margin-bottom: 8px;
            word-break: break-all;
            @include ellipsis(100%, 2);
        }
        &-subtitle{
            color: #999;
            line-height: 18px;
            @include ellipsis(100%, 2);
        }
    }

    @media only screen and (min-width: 415px) {
        .class-cover-img{
            height: auto;
        }
    }
</style>