<template>
    <h1>退出系统.....</h1>
</template>
<script>
export default {
    mounted(){
        sessionStorage.clear();
        this.$router.push("/")
    }
}
</script>