// 杭州1000地点库 API
// GET /api/places          - 列表（可选 ?cat=scenic&district=xihu&q=西湖）
// GET /api/places?id=xxx   - 单个地点详情
// GET /api/places?stats=1  - 分类/区县统计
let _placesCache = null;

function loadPlaces() {
  if (_placesCache) return _placesCache;
  try {
    // Vercel Serverless 中 fs 只能读相对路径
    const fs = require('fs');
    const path = require('path');
    const raw = fs.readFileSync(path.join(process.cwd(), 'data', 'places.json'), 'utf8');
    _placesCache = JSON.parse(raw);
  } catch (e) {
    _placesCache = { places: [] };
  }
  return _placesCache;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

  const data = loadPlaces();
  let places = data.places || [];

  // 单个详情
  const { id, cat, district, q, stats, limit } = req.query || {};

  if (id) {
    const place = places.find(function (p) { return p.id === id; });
    if (!place) {
      res.status(404).json({ error: 'not_found', message: '地点未找到' });
      return;
    }
    // 找相关地点（同分类或同区县，最多5个）
    const related = places
      .filter(function (p) {
        return p.id !== id && (p.category === place.category || p.district_id === place.district_id);
      })
      .slice(0, 5);
    res.json({ place: place, related: related });
    return;
  }

  // 统计
  if (stats === '1' || stats === 'true') {
    const byCategory = {};
    const byDistrict = {};
    places.forEach(function (p) {
      byCategory[p.category] = (byCategory[p.category] || 0) + 1;
      byDistrict[p.district_id] = (byDistrict[p.district_id] || 0) + 1;
    });
    res.json({
      total: places.length,
      byCategory: byCategory,
      byDistrict: byDistrict
    });
    return;
  }

  // 筛选
  let filtered = places;
  if (cat) filtered = filtered.filter(function (p) { return p.category === cat; });
  if (district) filtered = filtered.filter(function (p) { return p.district_id === district; });
  if (q) {
    const kw = q.toLowerCase();
    filtered = filtered.filter(function (p) {
      return (
        p.name.toLowerCase().indexOf(kw) >= 0 ||
        (p.summary || '').toLowerCase().indexOf(kw) >= 0 ||
        (p.tags || []).some(function (t) { return t.toLowerCase().indexOf(kw) >= 0; })
      );
    });
  }

  // 限制返回数（列表只返回摘要，不含完整 content）
  const max = limit ? parseInt(limit, 10) : 100;
  const list = filtered.slice(0, max).map(function (p) {
    return {
      id: p.id,
      name: p.name,
      district_id: p.district_id,
      district_name: p.district_name,
      category: p.category,
      category_name: p.category_name,
      tags: p.tags,
      address: p.address,
      cover: p.cover,
      summary: p.summary,
      ticket: p.ticket,
      recommend_level: p.recommend_level,
      best_season: p.best_season,
      seo_title: p.seo_title,
      seo_desc: p.seo_desc
    };
  });

  res.json({ total: list.length, places: list });
};
