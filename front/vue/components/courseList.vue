<template>
    <ul class="class-list">
        <li class="class-li" v-for="item in courseListItems">
            <a href="javascript:;" :title="item.className" class="class-wrap">
                <img :src="item.coverUrl" alt="" class="class-cover">
                <div class="class-content">
                    <p class="class-name">{{ item.className }}</p>
                    <div class="class-price">
                        ￥{{ item.price }}<!--
                            --><span class="old-price" v-if="item.chargeHB !== item.price">￥{{ item.chargeHB }}</span>
                    </div>
                    <div class="class-desc">{{ item.period }}课时<!-- --><span class="available-date">{{ item.beginDate | formateDate }}-{{ item.endDate | formateDate }}</span></div>
                </div>
            </a>
        </li>
    </ul>
</template>


<script>
export default {
    data() {
        return {
            totalCount: this.$store.state.courseListCount,
            courseListItems: this.$store.state.courseListItems || []
        }
    }
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
.class{
    &-li{
        padding: 14px 20px 14px 15px;
        @extend .border-half-pixel;
    }
    &-wrap{
        display: flex;
    }
    &-content{
        flex: 1;
    }
    &-cover{
        min-width: 96px;
        height: 64px;
        margin-right: 14px;
        flex: 0;
    }
    &-name{
        font-size: 16px;
        color: #333;
        @include ellipsis(100%, 1);
        margin-bottom: 6px;
    }
    &-desc{
        font-size: 13px;
        color: #999;
        white-space: nowrap;
        .available-date{
            margin-left: 10px;
        }
    }
}
</style>