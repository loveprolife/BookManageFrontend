import data from './heatmap/data.json';

function getHeatmap(req, res) {
    return res.json(data);
}
  
  
export default {
    'GET /api/heatmap': getHeatmap
};
  