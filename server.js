import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
app.use(cors());

app.use('/api', createProxyMiddleware({
  target: 'https://goit-task-manager.herokuapp.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
