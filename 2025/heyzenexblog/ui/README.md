This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

## Publishing Story Drafts

The Story Builder's Publish action creates or updates an MDX file in
`2025/heyzenexblog/ui/contents/mystorybook` on the configured GitHub branch.
The server needs these environment variables:

- `GITHUB_TOKEN`: a fine-grained GitHub token with Contents read/write access to
  `zenhuzaini/react-projects`.
- `PUBLISH_SECRET`: a random key of at least 32 characters entered in the Publish dialog. It is not
  stored by the browser or sent to GitHub.
- `CLOUDINARY_URL`: the server-only Cloudinary URL containing the account name,
  API key, and API secret. Never use a `NEXT_PUBLIC_` prefix or commit this value.
- `GITHUB_BRANCH`: optional; defaults to `main`.
- `GITHUB_REPOSITORY`: optional; defaults to `zenhuzaini/react-projects`.

For local development, fill in the blank values in the ignored `.env.local`
template, then restart the Next.js server. Do not add real secrets to
`manifest.yml` or commit them.
The `dev` and `start` scripts use Node's system CA store (`--use-system-ca`) so
TLS works in environments whose trusted certificates are installed at the OS
level. Use a Node version that supports this option (Node 22.15 or newer).

The Story Builder's image optimization selector applies an incoming quality
transformation to new uploads: `auto:eco` prioritizes smaller files,
`auto:good` is balanced, and `auto:best` prioritizes image detail. This changes
the stored Cloudinary image; existing images are unchanged. Delivery uses
`f_auto` to choose an efficient format for the visitor's browser.

For Cloud Foundry, set the server environment and restage the app:

```bash
cf set-env heyzenex GITHUB_TOKEN "<fine-grained-token>"
cf set-env heyzenex PUBLISH_SECRET "$(openssl rand -hex 32)"
cf set-env heyzenex CLOUDINARY_URL "cloudinary://<api-key>:<api-secret>@<cloud-name>"
cf set-env heyzenex GITHUB_BRANCH main
cf set-env heyzenex GITHUB_REPOSITORY zenhuzaini/react-projects
cf restage heyzenex
```

Never commit the token or publisher key. Publishing commits directly to the
configured branch, so that branch must allow the app's GitHub token to write.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
