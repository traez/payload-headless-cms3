//import { withPayload } from '@payloadcms/next/withPayload'

///** @type {import('next').NextConfig} */
//const nextConfig = {
  // Your Next.js config here
  
//}

//export default withPayload(nextConfig, { devBundleServerPackages: false })

import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
      }),
    )
    return config
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
