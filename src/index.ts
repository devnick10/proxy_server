import dotenv from "dotenv"
dotenv.config({ path: '.env' })
import express, { Request, Response } from "express"
import { createProxyMiddleware, Options } from "http-proxy-middleware"



const app = express()
const PORT = process.env.PORT || 3000

// Target URLs for proxy
const TARGET_URL_1 = process.env.TARGET_URL_1 || "http://google.com"
const TARGET_URL_2 = process.env.TARGET_URL_2 || "https://google.com"

// Paths for proxy
const TARGET_URL_1_PATH = process.env.TARGET_URL_1_PATH || "/"
const TARGET_URL_2_PATH = process.env.TARGET_URL_2_PATH || "/"

// Proxy configurations
const proxyConfigs = {
    [TARGET_URL_1_PATH]: {
        target: TARGET_URL_1,
        path: `/${TARGET_URL_1_PATH}`
    },
    [TARGET_URL_2_PATH]: {
        
        target:TARGET_URL_2,
        path: `/${TARGET_URL_2_PATH}`
    },
};

Object.entries(proxyConfigs).forEach(([name, config]) => {
    const proxyOptions: Options = {
        target: config.target,
        changeOrigin: true,
        pathRewrite: {
            "^/api": "",
        },

    }

    const proxy = createProxyMiddleware(proxyOptions)

    app.use(`/${name}`, proxy)
})

app.get('/health', (req: Request, res: Response) => {
    res.status(200).send('proxy is running')
})

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`)
})





















