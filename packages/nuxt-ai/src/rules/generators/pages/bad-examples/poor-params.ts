// Example of poor route parameter handling without validation
export default `
<script setup>
// Wrong: Not validating params
const id = useRoute().params.id
const data = await $fetch(\`/api/users/\${id}\`)
</script>
`
