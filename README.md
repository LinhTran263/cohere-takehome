This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
First, configure Cloudinary API keys. In your directory, create an .env file that contains these values (make sure to have an account on Cloudinary):
```
CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=  //same as CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

In your Cloudinary account, upload all images for Star War movies from 1-6. You need to name each file as "episode-x" where "x" is the episode number (ie. 1 to 6 respectively).

Second, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
