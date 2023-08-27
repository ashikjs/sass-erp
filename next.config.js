/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
    env: {
        API_ENDPOINT: 'API_ENDPOINT',
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
}


module.exports = nextConfig
