import {Router} from 'express';

const router = Router();

router.get('', (req, res) => {
  res.json({path: '/vote'});
});

export default router;
