/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:[
            'utfs.io',
            'res.cloudinary.com',
            "uploadthing.com",
            "lh3.googleusercontent.com"        ]
    },experimental: {
        serverActions: true ,
      },
}

module.exports = nextConfig
