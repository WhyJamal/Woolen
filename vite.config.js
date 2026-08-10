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
      port: Number(env.VITE_PORT),
      fs: {
        deny: ['.git', '.env', '.env.*', 'node_modules/.bin', '.ssh', '.aws', 'docker-compose.yml', '.htpasswd', '*.tfvars', '*.pem', '*.key']
      },
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
