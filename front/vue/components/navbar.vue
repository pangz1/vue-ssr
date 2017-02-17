<template>
    <nav class="nav" id="nav">
        <div class="nav-container">
            <div class="nav-item"><router-link :to="'/' + alias" class="nav-item-a" exact>首页</router-link></div>
            <div class="nav-item"><router-link :to="'/' + alias + '/list'" class="nav-item-a">列表页</router-link></div>
        </div>
    </nav>
</template>

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

.nav{
    width: 100%;
    font-size: 0;
    white-space: nowrap;
    background-color: #fff;
    overflow: hidden;
    &-container{
        transition: transform .6s;
    }
    &-item{
        font-size: 14px;
        display: inline-block;
        padding: 0 20px;
        &-a{
            display: inline-block;
            padding: 12px 5px;
            color: inherit;
            position: relative;
            color: #333;
            &.router-link-active{
                color: #44b336;
                &::after{
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    border-bottom: 1px solid #44b336;
                }
            }
        }
    }
    @extend .border-half-pixel;
}
</style>

<script>
    export default {
        props: ['alias', 'siteName']
    }
</script>