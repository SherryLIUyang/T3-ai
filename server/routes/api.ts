import { Router } from 'express';
import { supabase } from '../supabase.js';

const router = Router();

// Get all vehicles
router.get('/vehicles', async (req, res) => {
  try {
    const { data: vehicles, error } = await supabase
      .from('vehicles')
      .select('*');

    if (error) {
      throw error;
    }
    
    // Process records
    const processedVehicles = vehicles.map((v: any) => ({
      ...v,
      is_ai_recommended: Boolean(v.is_ai_recommended),
      stats: typeof v.stats === 'string' ? JSON.parse(v.stats) : v.stats // Supabase might parse json automatically depending on column type
    }));
    
    res.json(processedVehicles);
  } catch (error) {
    console.error('Error fetching vehicles from Supabase:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all routes
router.get('/routes', async (req, res) => {
  try {
    const { data: routes, error } = await supabase
      .from('routes')
      .select('*');

    if (error) {
      throw error;
    }
    
    // Process records
    const processedRoutes = routes.map((r: any) => ({
      ...r,
      is_ai_recommended: Boolean(r.is_ai_recommended),
      segments: typeof r.segments === 'string' ? JSON.parse(r.segments) : r.segments
    }));
    
    res.json(processedRoutes);
  } catch (error) {
    console.error('Error fetching routes from Supabase:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
