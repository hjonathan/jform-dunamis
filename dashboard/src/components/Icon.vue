<template>
    <v-icon small>{{ getIconForUISchemaType(type) }}</v-icon>
</template>

<script lang="ts">
export default {
    name: 'Icon',
    props: {
        type: {
            type: String,
            default: '',
        },
    },
    methods: {
        getIconForUISchemaType: (type: string) => {
            switch (type) {
                case 'HorizontalLayout':
                    return 'mdi-arrow-left-right';
                case 'VerticalLayout':
                    return 'mdi-arrow-up-down';
                case 'Group':
                    return 'mdi-focus-field';
                case 'Categorization':
                    return 'mdi-tab';
                case 'Label':
                    return 'mdi-format-text';
                default:
                    return 'mdi-checkbox-blank-badge-outline';
            }
        },
    },
};
</script>
