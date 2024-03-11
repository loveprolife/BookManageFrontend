import renjiaoA from './point_tree/renjiaoA.json';

function getRenjiaoA(req, res) {
    return res.json(renjiaoA);
}
  
  
export default {
    'GET /api/point_tree/renjiao_A': getRenjiaoA
};
  