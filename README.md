Next-clothes — Minimal Next.js demo with MongoDB Atlas

This demo app allows entering clothes (name, color, material, category) and uploading an image. Images and all data are stored in MongoDB Atlas.

Setup

1. Create a MongoDB Atlas cluster (free tier available)
   - Go to https://www.mongodb.com/cloud/atlas
   - Create an account or sign in
   - Create a new cluster
   - Get your connection string from the "Connect" button

2. Create `.env.local` in the project root with your MongoDB URI:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/wardrobia?retryWrites=true&w=majority
   ```

3. Install dependencies and run:
   ```powershell
   cd sugg/next-clothes
   npm install
   npm run dev
   ```

Open http://localhost:3000 to use the form.

Notes
- All data and base64-encoded images are stored directly in MongoDB.
- For production, consider storing images in object storage (S3, Cloudinary, etc.) and keeping only image URLs in the database.

