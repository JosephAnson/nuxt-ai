// Example of poor image handling without optimization
export default `
<template>
  <!-- ❌ Wrong: Not using Nuxt Image -->
  <div>
    <!-- Wrong: No lazy loading -->
    <img src="/images/large-image.jpg" />

    <!-- Wrong: No width/height attributes -->
    <img src="https://external-site.com/image.jpg" alt="" />

    <!-- Wrong: No optimization or responsive handling -->
    <img src="~/assets/images/photo.jpg" style="width: 100%" />
  </div>
</template>
`
