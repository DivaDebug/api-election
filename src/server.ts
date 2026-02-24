import app from './app.js';
import connectMongoDB from './database/mongo.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await Promise.all([
    connectMongoDB(),
  ]);

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

try {
  await startServer();
} catch (error) {
  console.error('Unexpected error:', error);

  process.exit(1);
}
