import axios from "axios";
import bearerToken from "./bearerToken";
import extractRoute from "./extractRoute";
import { LocationData } from "@/types";
import type { RouteDistanceAndDuration } from "@/types";

const API = process.env.NEXT_PUBLIC_API;

const getAllPointsDistance = async (locations: LocationData[]) => {
  const route = extractRoute(locations);

  try {
    const response = await axios.post(`${API}/route/distance`, route, bearerToken);

    return response.data as RouteDistanceAndDuration;
  } catch (error) {
    return 0;
  }
};

export default getAllPointsDistance;
