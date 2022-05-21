export default defineNuxtRouteMiddleware(async (to, _from) => {
    const user = useSupabaseUser()
    const client = useSupabaseClient();

    if (!user.value) {
      return navigateTo('/auth/login')
    }

    if (to.meta.role) {
      const { data } = await client.from('profile').select().eq('id', user.value.id).single()
      if (data.role !== to.meta.role) return navigateTo('/')
    }
})
