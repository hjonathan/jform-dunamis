<template>
    <div class="v-custom-chip">
        <slot></slot>
    </div>
</template>
<script lang="ts">
export default {
    name: 'CustomChip',
    components: {},
    mixins: [],
    props: {},
    data() {
        return {};
    },
    methods: {},
};
</script>

<style>
.v-custom-chip {
    font-weight: 600;
    color: dimgray;
    padding: 2px;
    border-radius: 3px;
}

.v-custom-chip:hover {
    background-color: rgb(235, 231, 231);
}
</style>
