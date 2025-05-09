import colors from 'tailwindcss/colors'

export function useNavLinks(): ComputedRef<{ label: string, icon: string, to: string, active?: boolean }[]> {
  const route = useRoute()

  return computed((): { label: string, icon: string, to: string, active?: boolean }[] => [
    {
      label: 'Getting Started',
      icon: 'i-lucide-book-open',
      to: '/docs/getting-started',
      active: route.path.startsWith('/docs/getting-started'),
    },
    {
      label: 'AI SDK',
      icon: 'i-lucide-cpu',
      to: '/docs/ai-sdk',
      active: route.path.startsWith('/docs/ai-sdk'),
    },
    {
      label: 'MCP Servers',
      icon: 'i-lucide-server',
      to: '/docs/mcp-server',
      active: route.path.startsWith('/docs/mcp-server'),
    },
    {
      label: 'AI Rules',
      icon: 'i-lucide-book-open',
      to: '/docs/ai-rules',
      active: route.path.startsWith('/docs/ai-rules'),
    },
  ])
}

export function useThemeColor(): globalThis.ComputedRef<string> {
  const colorMode = useColorMode()
  const appConfig = useAppConfig()

  return computed(() => colorMode.value === 'dark' ? colors[appConfig.ui?.colors?.neutral as keyof typeof colors][900] : 'white')
}
