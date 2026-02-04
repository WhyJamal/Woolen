import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: true,
      port: 5173,
      allowedHosts: [
        "www.apsofterp.uz",        
        "apsofterp.uz",        
        "localhost",
      ],   
      proxy: {
        '/api': {
          target: env.VITE_API_BASE, 
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '/api/hs')
        }
      }
    }
  }
})
