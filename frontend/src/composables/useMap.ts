import { GoogleMap } from "@capacitor/google-maps";

export default function useMap() {
    const createMap = async (center: { lat: number, lng: number }) => {
        const mapElement = document.getElementById("map");
        if (mapElement) {
            const createMapArgs = {
                element: mapElement,
                id: "my-map",
                apiKey: process.env.VUE_APP_GOOGLE_MAPS_KEY,
                config: {
                    center: center,
                    zoom: 8, // The initial zoom level to be rendered by the map
                },
                forceCreate: true,
            };


            const theMap = await GoogleMap.create(createMapArgs);
            return theMap;
        }

    }
    const addPoints = () => { return true }
    return { createMap, addPoints }
}
