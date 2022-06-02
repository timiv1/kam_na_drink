// Calculate from Degrees to Radians
function Deg2Rad(deg: any) {
    return deg * Math.PI / 180;
}

// Calculate Pythagoras equation
function PythagorasEquirectangular (lat1: any, lon1: any, lat2: any, lon2: any){
    lat1 = Deg2Rad(lat1);
    lat2 = Deg2Rad(lat2);
    lon1 = Deg2Rad(lon1);
    lon2 = Deg2Rad(lon2);
    var R = 6371; // km
    var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    var y = (lat2 - lat1);
    var d = Math.sqrt(x * x + y * y) * R;
    return d;
}

export default {
    PythagorasEquirectangular
}