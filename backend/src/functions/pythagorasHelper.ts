// Calculate from Degrees to Radians
function Deg2Rad(deg: number) {
    return deg * Math.PI / 180;
}

// Calculate Pythagoras equation
function PythagorasEquirectangular (lat1: number, lon1: number, lat2: number, lon2: number){
    lat1 = Deg2Rad(lat1);
    lat2 = Deg2Rad(lat2);
    lon1 = Deg2Rad(lon1);
    lon2 = Deg2Rad(lon2);
    const R = 6371; // km
    const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    const y = (lat2 - lat1);
    const distance = Math.sqrt(x * x + y * y) * R;
    return distance;
}

export default {
    PythagorasEquirectangular
}